'use client';

import type Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { type DragEvent as ReactDragEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';
import { type Box, boxesIntersect, type DesignElement, type Point, snapAxis } from '@/design';
import { ELEMENT_NODE_NAME, type ElementInteraction } from './element-node';
import { PAGE_BACKGROUND_NAME, PageContent } from './page-content';
import { SelectionTransformer } from './selection-transformer';
import { TextEditOverlay } from './text-edit-overlay';
import type { DesignEditorState } from './use-design-editor';
import { useSpaceHeld, useViewportSize, type Viewport } from './use-workspace-viewport';
import { type Guides, NO_GUIDES, WorkspaceOverlays } from './workspace-overlays';

const SNAP_PX = 6;

interface CanvasWorkspaceProps {
  editor: DesignEditorState;
  zoom: number;
  fontsVersion: number;
  onZoomChange: (zoom: number) => void;
  onViewportChange: (viewport: Viewport) => void;
  onDropFiles: (files: File[], point: Point) => void;
}

export const CanvasWorkspace = ({
  editor,
  zoom,
  fontsVersion,
  onZoomChange,
  onViewportChange,
  onDropFiles,
}: CanvasWorkspaceProps) => {
  const { design, page, selectedIds, selectedElements, editingId } = editor;
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const pageGroupRef = useRef<Konva.Group>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const viewport = useViewportSize(containerRef, onViewportChange);
  const [panState, setPanState] = useState({ pageId: editor.pageId, x: 0, y: 0 });
  const pan: Point = panState.pageId === editor.pageId ? panState : { x: 0, y: 0 };
  const setPan = (next: Point) => setPanState({ pageId: editor.pageId, ...next });
  const [guides, setGuides] = useState<Guides>(NO_GUIDES);
  const [marquee, setMarquee] = useState<Box | null>(null);
  const [hoverBox, setHoverBox] = useState<Box | null>(null);
  const spaceHeld = useSpaceHeld();
  const marqueeStart = useRef<Point | null>(null);
  const panStart = useRef<{ pointer: Point; pan: Point } | null>(null);
  const snapTargets = useRef<{ x: number[]; y: number[] }>({ x: [], y: [] });

  const offset = {
    x: (viewport.width - design.width * zoom) / 2 + pan.x,
    y: (viewport.height - design.height * zoom) / 2 + pan.y,
  };

  const findNode = useCallback(
    (id: string): Konva.Node | undefined =>
      stageRef.current?.findOne(
        (node: Konva.Node) => node.id() === id && node.hasName(ELEMENT_NODE_NAME),
      ),
    [],
  );

  const localBox = useCallback((node: Konva.Node): Box | null => {
    const group = pageGroupRef.current;
    return group === null ? null : node.getClientRect({ relativeTo: group, skipShadow: true });
  }, []);

  useEffect(() => {
    editor.measureRef.current = (id) => {
      const node = findNode(id);
      return node?.getClientRect({ skipTransform: true, skipShadow: true }).height;
    };
  }, [editor.measureRef, findNode]);

  useEffect(() => {
    const transformer = transformerRef.current;
    if (transformer === null) {
      return;
    }
    const nodes =
      editingId === null
        ? selectedIds.map(findNode).filter((node): node is Konva.Node => node !== undefined)
        : [];
    transformer.nodes(nodes);
    transformer.getLayer()?.batchDraw();
  });

  const pagePoint = useCallback((): Point | null => {
    const pointer = stageRef.current?.getPointerPosition();
    if (pointer === undefined || pointer === null) {
      return null;
    }
    return { x: (pointer.x - offset.x) / zoom, y: (pointer.y - offset.y) / zoom };
  }, [offset.x, offset.y, zoom]);

  const collectSnapTargets = useCallback(
    (movingIds: readonly string[]) => {
      const xs = [0, design.width / 2, design.width];
      const ys = [0, design.height / 2, design.height];
      for (const element of page.elements) {
        if (movingIds.includes(element.id) || element.hidden) {
          continue;
        }
        const node = findNode(element.id);
        const box = node === undefined ? null : localBox(node);
        if (box !== null) {
          xs.push(box.x, box.x + box.width / 2, box.x + box.width);
          ys.push(box.y, box.y + box.height / 2, box.y + box.height);
        }
      }
      snapTargets.current = { x: xs, y: ys };
    },
    [design.height, design.width, findNode, localBox, page.elements],
  );

  const interactionFor = useCallback(
    (element: DesignElement): ElementInteraction => {
      const onPress = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
        if (spaceHeld) {
          return;
        }
        event.cancelBubble = true;
        const additive = 'shiftKey' in event.evt && (event.evt.shiftKey || event.evt.metaKey);
        if (additive || !selectedIds.includes(element.id)) {
          editor.select([element.id], additive);
        }
      };
      const onEdit = () => {
        if (element.type === 'text' && !element.locked) {
          editor.select([element.id]);
          editor.setEditingId(element.id);
        }
      };
      return {
        draggable: !(element.locked || spaceHeld),
        onMouseDown: onPress,
        onTouchStart: onPress,
        onDblClick: onEdit,
        onDblTap: onEdit,
        onDragStart: () => {
          setHoverBox(null);
          collectSnapTargets(selectedIds.includes(element.id) ? selectedIds : [element.id]);
        },
        onDragMove: (event) => {
          const node = event.target;
          if (selectedIds.length > 1) {
            return;
          }
          const box = localBox(node);
          if (box === null) {
            return;
          }
          const threshold = SNAP_PX / zoom;
          const snapX = snapAxis(
            [box.x, box.x + box.width / 2, box.x + box.width],
            snapTargets.current.x,
            threshold,
          );
          const snapY = snapAxis(
            [box.y, box.y + box.height / 2, box.y + box.height],
            snapTargets.current.y,
            threshold,
          );
          node.x(node.x() + snapX.delta);
          node.y(node.y() + snapY.delta);
          setGuides({ vertical: snapX.guide, horizontal: snapY.guide });
        },
        onDragEnd: () => {
          setGuides(NO_GUIDES);
          const ids = selectedIds.includes(element.id) ? selectedIds : [element.id];
          const updates = new Map<string, DesignElement>();
          for (const id of ids) {
            const node = findNode(id);
            const current = page.elements.find((item) => item.id === id);
            if (node !== undefined && current !== undefined) {
              updates.set(id, { ...current, x: node.x(), y: node.y() });
            }
          }
          editor.updateMany(updates);
        },
      };
    },
    [collectSnapTargets, editor, findNode, localBox, page.elements, selectedIds, spaceHeld, zoom],
  );

  const onStageDown = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const target = event.target;
    const onEmpty = target === target.getStage() || target.hasName(PAGE_BACKGROUND_NAME);
    const pointer = stageRef.current?.getPointerPosition() ?? null;
    const middle = 'button' in event.evt && event.evt.button === 1;
    if ((spaceHeld || middle) && pointer !== null) {
      panStart.current = { pointer, pan };
      return;
    }
    if (!onEmpty) {
      return;
    }
    const point = pagePoint();
    marqueeStart.current = point;
    setMarquee(point === null ? null : { ...point, width: 0, height: 0 });
  };

  const onStageMove = () => {
    const pointer = stageRef.current?.getPointerPosition() ?? null;
    if (panStart.current !== null && pointer !== null) {
      const start = panStart.current;
      setPan({
        x: start.pan.x + pointer.x - start.pointer.x,
        y: start.pan.y + pointer.y - start.pointer.y,
      });
      return;
    }
    const start = marqueeStart.current;
    const point = pagePoint();
    if (start === null || point === null) {
      return;
    }
    setMarquee({
      x: Math.min(start.x, point.x),
      y: Math.min(start.y, point.y),
      width: Math.abs(point.x - start.x),
      height: Math.abs(point.y - start.y),
    });
  };

  const onStageUp = () => {
    panStart.current = null;
    const box = marquee;
    marqueeStart.current = null;
    setMarquee(null);
    if (box === null) {
      return;
    }
    if (box.width * zoom < 3 && box.height * zoom < 3) {
      editor.clearSelection();
      return;
    }
    const hits = page.elements
      .filter((element) => !(element.locked || element.hidden))
      .filter((element) => {
        const node = findNode(element.id);
        const bounds = node === undefined ? null : localBox(node);
        return bounds !== null && boxesIntersect(bounds, box);
      })
      .map((element) => element.id);
    if (hits.length > 0) {
      editor.select(hits);
    } else {
      editor.clearSelection();
    }
  };

  const onWheel = (event: KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();
    if (event.evt.ctrlKey || event.evt.metaKey) {
      const pointer = stageRef.current?.getPointerPosition();
      const next = Math.min(8, Math.max(0.05, zoom * (event.evt.deltaY > 0 ? 0.92 : 1.08)));
      if (pointer !== undefined && pointer !== null) {
        const pageX = (pointer.x - offset.x) / zoom;
        const pageY = (pointer.y - offset.y) / zoom;
        const baseX = (viewport.width - design.width * next) / 2;
        const baseY = (viewport.height - design.height * next) / 2;
        setPan({ x: pointer.x - pageX * next - baseX, y: pointer.y - pageY * next - baseY });
      }
      onZoomChange(next);
      return;
    }
    setPan({ x: pan.x - event.evt.deltaX, y: pan.y - event.evt.deltaY });
  };

  const onDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes('Files')) {
      event.preventDefault();
    }
  };

  const onDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    const files = [...event.dataTransfer.files].filter((file) => file.type.startsWith('image/'));
    if (files.length === 0) {
      return;
    }
    event.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    const point =
      rect === undefined
        ? { x: design.width / 2, y: design.height / 2 }
        : {
            x: (event.clientX - rect.left - offset.x) / zoom,
            y: (event.clientY - rect.top - offset.y) / zoom,
          };
    onDropFiles(files, point);
  };

  const editingElement = page.elements.find((element) => element.id === editingId);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the canvas is a file drop target
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: the canvas is a file drop target
    <div
      ref={containerRef}
      className="relative min-h-0 flex-1 overflow-hidden bg-muted/60"
      style={{ cursor: spaceHeld ? 'grab' : 'default' }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      data-testid="design-canvas"
    >
      {viewport.width > 0 ? (
        <Stage
          ref={stageRef}
          width={viewport.width}
          height={viewport.height}
          onMouseDown={onStageDown}
          onTouchStart={onStageDown}
          onMouseMove={onStageMove}
          onTouchMove={onStageMove}
          onMouseUp={onStageUp}
          onTouchEnd={onStageUp}
          onMouseLeave={() => setHoverBox(null)}
          onWheel={onWheel}
        >
          <Layer>
            <Rect
              x={offset.x}
              y={offset.y}
              width={design.width * zoom}
              height={design.height * zoom}
              fill="#ffffff"
              shadowColor="rgba(15,23,42,0.18)"
              shadowBlur={24}
              shadowOffsetY={6}
              listening={false}
            />
            <Group ref={pageGroupRef} x={offset.x} y={offset.y} scaleX={zoom} scaleY={zoom}>
              <Group
                onMouseOver={(event) => {
                  const group = event.target.findAncestor(`.${ELEMENT_NODE_NAME}`, true);
                  if (group !== undefined && group !== null && !selectedIds.includes(group.id())) {
                    setHoverBox(localBox(group));
                  }
                }}
                onMouseOut={() => setHoverBox(null)}
              >
                <PageContent
                  page={page}
                  width={design.width}
                  height={design.height}
                  fontsVersion={fontsVersion}
                  editingId={editingId}
                  interactionFor={interactionFor}
                />
              </Group>
              <WorkspaceOverlays
                hoverBox={hoverBox}
                guides={guides}
                marquee={marquee}
                zoom={zoom}
              />
            </Group>
            <SelectionTransformer
              transformerRef={transformerRef}
              selected={selectedElements}
              elements={page.elements}
              onCommit={editor.updateMany}
            />
          </Layer>
        </Stage>
      ) : null}
      {editingElement?.type === 'text' ? (
        <TextEditOverlay
          element={editingElement}
          zoom={zoom}
          offset={offset}
          onCommit={(text) => {
            if (text !== editingElement.text) {
              editor.replaceElement({ ...editingElement, text });
            }
            editor.setEditingId(null);
          }}
        />
      ) : null}
    </div>
  );
};

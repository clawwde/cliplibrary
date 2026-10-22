'use client';

import { Image as ImageIcon, Layers, PaintBucket, Shapes, Type, Upload } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createEllipse,
  createImage,
  createLine,
  createRect,
  createText,
  type Design,
  type DesignElement,
  designSchema,
  fitInside,
  type Point,
} from '@/design';
import { CanvasWorkspace } from './canvas-workspace';
import { EditorHeader } from './editor-header';
import { EditorSidebar, type SidebarPanel } from './editor-sidebar';
import { exportPages } from './export-design';
import { useFontsVersion } from './font-loader';
import { PagesStrip } from './pages-strip';
import { PropertiesPanel } from './panels/properties-panel';
import { type LoadedImage, readImageFile } from './read-image-file';
import { isEditableTarget, type ShortcutAction, shortcutFor } from './shortcuts';
import { BackgroundPanel } from './sidebar/background-panel';
import { ElementsPanel } from './sidebar/elements-panel';
import { LayersPanel } from './sidebar/layers-panel';
import { TextPanel } from './sidebar/text-panel';
import { UploadsPanel } from './sidebar/uploads-panel';
import { useDesignEditor } from './use-design-editor';
import type { Viewport } from './use-workspace-viewport';

const ZOOM_STEPS = [0.05, 0.1, 0.15, 0.2, 0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2, 3, 4, 6, 8];

const stepZoom = (zoom: number, direction: 'in' | 'out'): number =>
  direction === 'in'
    ? (ZOOM_STEPS.find((step) => step > zoom + 0.001) ?? zoom)
    : ([...ZOOM_STEPS].reverse().find((step) => step < zoom - 0.001) ?? zoom);

interface DesignEditorProps {
  initialDesign: Design;
  backHref: string;
  storageKey: string;
  initialPageIndex?: number;
  initialPanel?: string;
}

const readSaved = (key: string): Design | null => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return null;
    }
    const parsed = designSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

const forgetSaved = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};

export const DesignEditor = ({
  initialDesign,
  backHref,
  storageKey,
  initialPageIndex = 0,
  initialPanel,
}: DesignEditorProps) => {
  const editor = useDesignEditor(initialDesign, initialPageIndex);
  const { design } = editor;
  const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 });
  const [userZoom, setUserZoom] = useState<number | null>(null);
  const [uploads, setUploads] = useState<LoadedImage[]>([]);
  const restored = useRef(false);

  const fitZoom =
    viewport.width === 0
      ? 0.4
      : Math.max(
          0.05,
          Math.min((viewport.width - 96) / design.width, (viewport.height - 96) / design.height),
        );
  const zoom = userZoom ?? fitZoom;

  const fonts = useMemo(
    () =>
      design.pages.flatMap((page) =>
        page.elements.flatMap((element) => (element.type === 'text' ? [element.fontFamily] : [])),
      ),
    [design.pages],
  );
  const fontsVersion = useFontsVersion(fonts);

  useEffect(() => {
    if (restored.current) {
      return;
    }
    restored.current = true;
    const saved = readSaved(storageKey);
    if (saved !== null) {
      editor.load(saved, initialPageIndex);
    }
  }, [editor.load, initialPageIndex, storageKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(design));
      } catch {
        return;
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [design, storageKey]);

  const imageElement = useCallback(
    (image: LoadedImage, point?: Point, index = 0): DesignElement => {
      const size = fitInside(image.width, image.height, design.width * 0.6, design.height * 0.6);
      const centre = point ?? { x: design.width / 2, y: design.height / 2 };
      return createImage({
        name: image.name,
        src: image.src,
        width: size.width,
        height: size.height,
        x: centre.x - size.width / 2 + index * 24,
        y: centre.y - size.height / 2 + index * 24,
      });
    },
    [design.height, design.width],
  );

  const placeImage = useCallback(
    (image: LoadedImage) => editor.addMany([imageElement(image)]),
    [editor.addMany, imageElement],
  );

  const addImageFiles = useCallback(
    (files: File[], point?: Point) => {
      Promise.all(files.map(readImageFile))
        .then((loaded) => {
          const images = loaded.filter((image): image is LoadedImage => image !== null);
          setUploads((current) => [...images, ...current]);
          editor.addMany(images.map((image, index) => imageElement(image, point, index)));
        })
        .catch(() => undefined);
    },
    [editor.addMany, imageElement],
  );

  const onZoom = useCallback(
    (direction: 'in' | 'out' | 'fit') =>
      setUserZoom(direction === 'fit' ? null : stepZoom(zoom, direction)),
    [zoom],
  );

  const addElement = useCallback((element: DesignElement) => editor.addElement(element), [editor]);

  const runShortcut = useCallback(
    (action: ShortcutAction) => {
      const handlers: Record<ShortcutAction['type'], () => void> = {
        undo: editor.undo,
        redo: editor.redo,
        delete: editor.removeSelected,
        duplicate: editor.duplicateSelected,
        copy: editor.copySelected,
        cut: editor.cutSelected,
        'select-all': editor.selectAll,
        group: editor.groupSelected,
        ungroup: editor.ungroupSelected,
        escape: editor.clearSelection,
        'edit-text': () => {
          const [only] = editor.selectedElements;
          if (editor.selectedElements.length === 1 && only?.type === 'text') {
            editor.setEditingId(only.id);
          }
        },
        layer: () => action.type === 'layer' && editor.reorderSelected(action.move),
        nudge: () => action.type === 'nudge' && editor.nudgeSelected(action.dx, action.dy),
        zoom: () => action.type === 'zoom' && onZoom(action.direction),
        add: () => {
          if (action.type !== 'add') {
            return;
          }
          const factories = {
            text: () => createText(),
            rect: () => createRect(),
            ellipse: () => createEllipse(),
            line: () => createLine(),
          };
          editor.addElement(factories[action.element]());
        },
        export: () => exportPages(design, [editor.pageId], 'png', 1).catch(() => undefined),
      };
      handlers[action.type]();
    },
    [design, editor, onZoom],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || editor.editingId !== null) {
        return;
      }
      const action = shortcutFor(event);
      if (action === null) {
        return;
      }
      if (
        (action.type === 'nudge' ||
          action.type === 'delete' ||
          action.type === 'edit-text' ||
          action.type === 'layer' ||
          action.type === 'group' ||
          action.type === 'ungroup' ||
          action.type === 'duplicate' ||
          action.type === 'cut' ||
          action.type === 'copy') &&
        editor.selectedIds.length === 0
      ) {
        return;
      }
      event.preventDefault();
      runShortcut(action);
    };
    const onPaste = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      const files = [...(event.clipboardData?.files ?? [])].filter((file) =>
        file.type.startsWith('image/'),
      );
      event.preventDefault();
      if (files.length > 0) {
        addImageFiles(files);
      } else {
        editor.paste();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('paste', onPaste);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('paste', onPaste);
    };
  }, [addImageFiles, editor, runShortcut]);

  const panels: SidebarPanel[] = [
    {
      id: 'elements',
      label: 'Elements',
      Icon: Shapes,
      render: () => <ElementsPanel onAdd={addElement} />,
    },
    { id: 'text', label: 'Text', Icon: Type, render: () => <TextPanel onAdd={addElement} /> },
    {
      id: 'uploads',
      label: 'Uploads',
      Icon: Upload,
      render: () => (
        <UploadsPanel
          uploads={uploads}
          onFiles={(files) => addImageFiles(files)}
          onPlace={(image) => placeImage(image)}
        />
      ),
    },
    {
      id: 'placeholder',
      label: 'Frame',
      Icon: ImageIcon,
      render: () => (
        <button
          type="button"
          onClick={() => editor.addElement(createImage({ name: 'Image frame' }))}
          className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm hover:bg-accent"
        >
          Add an image frame
        </button>
      ),
    },
    {
      id: 'background',
      label: 'Background',
      Icon: PaintBucket,
      render: () => (
        <BackgroundPanel
          fill={editor.page.background}
          onChange={editor.setPageBackground}
          onCommit={editor.seal}
        />
      ),
    },
    { id: 'layers', label: 'Layers', Icon: Layers, render: () => <LayersPanel editor={editor} /> },
  ];

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col" data-testid="design-editor">
      <EditorHeader
        editor={editor}
        zoom={zoom}
        backHref={backHref}
        onZoom={onZoom}
        onOpen={(next) => editor.load(next)}
        onReset={() => {
          forgetSaved(storageKey);
          editor.load(
            initialDesign,
            Math.max(
              0,
              design.pages.findIndex((page) => page.id === editor.pageId),
            ),
          );
        }}
      />
      <div className="flex min-h-0 flex-1">
        <EditorSidebar
          panels={panels}
          {...(initialPanel === undefined ? {} : { initial: initialPanel })}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <CanvasWorkspace
            editor={editor}
            zoom={zoom}
            fontsVersion={fontsVersion}
            onZoomChange={setUserZoom}
            onViewportChange={setViewport}
            onDropFiles={(files, point) => addImageFiles(files, point)}
          />
          <PagesStrip editor={editor} />
        </div>
        <aside
          className="hidden w-[280px] shrink-0 overflow-y-auto border-l bg-background lg:block"
          aria-label="Properties"
        >
          <PropertiesPanel editor={editor} />
        </aside>
      </div>
    </div>
  );
};

'use client';

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { frameToPx, LABEL_WIDTH, pxToFrame } from '@/lib/timeline-geometry';
import type { Project } from '@/project';
import type { BlockDragMode } from './element-block';
import { TimelineRuler } from './timeline-ruler';
import { TrackRow } from './track-row';

interface DragState {
  elementId: string;
  mode: BlockDragMode;
  startX: number;
  base: number;
  originTrackId: string;
}

interface TimelineProps {
  project: Project;
  pxPerFrame: number;
  currentFrame: number;
  selectedId: string | null;
  activeTrackId: string | null;
  onSeek: (frame: number) => void;
  onActivateTrack: (trackId: string) => void;
  onSelectElement: (id: string) => void;
  onMoveElement: (id: string, from: number) => void;
  onResizeElement: (id: string, durationInFrames: number) => void;
  onTrimElementStart: (id: string, from: number) => void;
  onMoveElementToTrack: (id: string, trackId: string) => void;
  onMoveTrack: (trackId: string, direction: 'up' | 'down') => void;
  onRemoveTrack: (trackId: string) => void;
}

const trackIdAt = (target: EventTarget | null): string | null => {
  if (!(target instanceof HTMLElement)) {
    return null;
  }
  return target.closest('[data-track-id]')?.getAttribute('data-track-id') ?? null;
};

const baseFor = (project: Project, elementId: string, mode: BlockDragMode): number => {
  for (const track of project.tracks) {
    const element = track.elements.find((entry) => entry.id === elementId);
    if (element !== undefined) {
      return mode === 'resize' ? element.durationInFrames : element.from;
    }
  }
  return 0;
};

const originTrackFor = (project: Project, elementId: string): string => {
  for (const track of project.tracks) {
    if (track.elements.some((entry) => entry.id === elementId)) {
      return track.id;
    }
  }
  return '';
};

export const Timeline = ({
  project,
  pxPerFrame,
  currentFrame,
  selectedId,
  activeTrackId,
  onSeek,
  onActivateTrack,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onTrimElementStart,
  onMoveElementToTrack,
  onMoveTrack,
  onRemoveTrack,
}: TimelineProps) => {
  const laneWidth = frameToPx(project.durationInFrames, pxPerFrame);
  const canRemove = project.tracks.length > 1;
  const drag = useRef<DragState | null>(null);
  const hoverTrack = useRef<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dropTrackId, setDropTrackId] = useState<string | null>(null);

  const endDrag = useCallback(() => {
    const state = drag.current;
    if (state === null) {
      return;
    }
    const target = hoverTrack.current;
    if (state.mode === 'move' && target !== null && target !== state.originTrackId) {
      onMoveElementToTrack(state.elementId, target);
    }
    drag.current = null;
    hoverTrack.current = null;
    setDragging(false);
    setDropTrackId(null);
  }, [onMoveElementToTrack]);

  useEffect(() => {
    if (!dragging) {
      return;
    }
    const onUp = () => endDrag();
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  }, [dragging, endDrag]);

  const handleBlockPointerDown = (
    elementId: string,
    mode: BlockDragMode,
    event: ReactPointerEvent,
  ): void => {
    onSelectElement(elementId);
    const originTrackId = originTrackFor(project, elementId);
    drag.current = {
      elementId,
      mode,
      startX: event.clientX,
      base: baseFor(project, elementId, mode),
      originTrackId,
    };
    hoverTrack.current = originTrackId;
    setDragging(true);
    setDropTrackId(originTrackId);
  };

  const handlePointerMove = (event: ReactPointerEvent): void => {
    const state = drag.current;
    if (state === null) {
      return;
    }
    const delta = pxToFrame(event.clientX - state.startX, pxPerFrame);
    if (state.mode === 'resize') {
      onResizeElement(state.elementId, state.base + delta);
      return;
    }
    if (state.mode === 'trim') {
      onTrimElementStart(state.elementId, state.base + delta);
      return;
    }
    onMoveElement(state.elementId, state.base + delta);
    const over = trackIdAt(event.target);
    if (over !== null) {
      hoverTrack.current = over;
      setDropTrackId(over);
    }
  };

  return (
    <div className="h-full overflow-auto bg-sidebar">
      <div style={{ width: laneWidth + LABEL_WIDTH, minWidth: '100%' }}>
        <div className="sticky top-0 z-10 flex bg-sidebar">
          <div className="w-32 shrink-0 bg-sidebar" />
          <TimelineRuler
            durationInFrames={project.durationInFrames}
            fps={project.fps}
            pxPerFrame={pxPerFrame}
            width={laneWidth}
            onSeek={onSeek}
          />
        </div>
        <div className="relative">
          <div
            className="flex flex-col divide-y divide-border/40"
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
          >
            {project.tracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                pxPerFrame={pxPerFrame}
                width={laneWidth}
                active={track.id === activeTrackId}
                dropTarget={dragging && drag.current?.mode === 'move' && track.id === dropTrackId}
                canRemove={canRemove}
                canMoveUp={index > 0}
                canMoveDown={index < project.tracks.length - 1}
                selectedId={selectedId}
                onActivate={onActivateTrack}
                onMoveTrack={onMoveTrack}
                onBlockPointerDown={handleBlockPointerDown}
                onRemoveTrack={onRemoveTrack}
              />
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 bg-red-500"
            style={{ left: LABEL_WIDTH + frameToPx(currentFrame, pxPerFrame) }}
          />
        </div>
      </div>
    </div>
  );
};

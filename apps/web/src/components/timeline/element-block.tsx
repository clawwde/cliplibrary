'use client';

import type { Element } from '@cliplibrary/project';
import { type PointerEvent as ReactPointerEvent, useRef } from 'react';
import { frameToPx, pxToFrame } from '@/lib/timeline-geometry';
import { cn } from '@/lib/utils';

type DragMode = 'move' | 'resize';

interface DragState {
  startX: number;
  base: number;
  mode: DragMode;
}

const LABELS: Record<Element['type'], string> = {
  text: 'Text',
  image: 'Image',
  video: 'Video',
  shape: 'Shape',
  composition: 'Clip',
};

const blockLabel = (element: Element): string => {
  if (element.type === 'text') {
    return element.content.slice(0, 24) || 'Text';
  }
  if (element.type === 'composition') {
    return element.clipId;
  }
  return LABELS[element.type];
};

interface ElementBlockProps {
  element: Element;
  pxPerFrame: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, from: number) => void;
  onResize: (id: string, durationInFrames: number) => void;
}

export const ElementBlock = ({
  element,
  pxPerFrame,
  selected,
  onSelect,
  onMove,
  onResize,
}: ElementBlockProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef<DragState | null>(null);

  const begin = (mode: DragMode) => (event: ReactPointerEvent) => {
    event.stopPropagation();
    onSelect(element.id);
    drag.current = {
      startX: event.clientX,
      base: mode === 'move' ? element.from : element.durationInFrames,
      mode,
    };
    ref.current?.setPointerCapture?.(event.pointerId);
  };

  const handleMove = (event: ReactPointerEvent) => {
    const state = drag.current;
    if (state === null) {
      return;
    }
    const delta = pxToFrame(event.clientX - state.startX, pxPerFrame);
    if (state.mode === 'move') {
      onMove(element.id, state.base + delta);
    } else {
      onResize(element.id, state.base + delta);
    }
  };

  const handleUp = (event: ReactPointerEvent) => {
    drag.current = null;
    ref.current?.releasePointerCapture?.(event.pointerId);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${LABELS[element.type]} element`}
      aria-pressed={selected}
      onPointerDown={begin('move')}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      className={cn(
        'absolute top-1 bottom-1 flex items-center overflow-hidden rounded-md px-2 text-left text-xs',
        'touch-none select-none',
        selected
          ? 'bg-primary text-primary-foreground ring-2 ring-ring'
          : 'bg-foreground/85 text-background hover:bg-foreground',
      )}
      style={{
        left: frameToPx(element.from, pxPerFrame),
        width: Math.max(8, frameToPx(element.durationInFrames, pxPerFrame)),
      }}
    >
      <span className="pointer-events-none truncate">{blockLabel(element)}</span>
      <span
        aria-hidden
        onPointerDown={begin('resize')}
        className="absolute inset-y-0 right-0 w-2 cursor-ew-resize bg-black/20"
      />
    </button>
  );
};

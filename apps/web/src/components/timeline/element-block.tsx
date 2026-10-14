'use client';

import type { Element } from '@cliplibrary/project';
import { Film, Image as ImageIcon, Square, Type, Video as VideoIcon } from 'lucide-react';
import type { ComponentType, PointerEvent as ReactPointerEvent } from 'react';
import { frameToPx } from '@/lib/timeline-geometry';
import { cn } from '@/lib/utils';

export type BlockDragMode = 'move' | 'resize' | 'trim';

const LABELS: Record<Element['type'], string> = {
  text: 'Text',
  image: 'Image',
  video: 'Video',
  shape: 'Shape',
  composition: 'Clip',
};

const ICONS: Record<Element['type'], ComponentType<{ className?: string }>> = {
  text: Type,
  image: ImageIcon,
  video: VideoIcon,
  shape: Square,
  composition: Film,
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
  onPointerDownBlock: (elementId: string, mode: BlockDragMode, event: ReactPointerEvent) => void;
}

export const ElementBlock = ({
  element,
  pxPerFrame,
  selected,
  onPointerDownBlock,
}: ElementBlockProps) => {
  const Icon = ICONS[element.type];
  const begin = (mode: BlockDragMode) => (event: ReactPointerEvent) => {
    if (mode !== 'move') {
      event.stopPropagation();
    }
    onPointerDownBlock(element.id, mode, event);
  };

  return (
    <button
      type="button"
      aria-label={`${LABELS[element.type]} element`}
      aria-pressed={selected}
      data-element-id={element.id}
      onPointerDown={begin('move')}
      className={cn(
        'absolute top-1 bottom-1 flex touch-none select-none items-center gap-1.5 overflow-hidden rounded-md pr-3 pl-2 text-left text-xs',
        selected
          ? 'bg-primary text-primary-foreground ring-2 ring-ring'
          : 'bg-foreground/85 text-background hover:bg-foreground',
      )}
      style={{
        left: frameToPx(element.from, pxPerFrame),
        width: Math.max(12, frameToPx(element.durationInFrames, pxPerFrame)),
      }}
    >
      <Icon className="pointer-events-none size-3 shrink-0 opacity-80" />
      <span className="pointer-events-none truncate">{blockLabel(element)}</span>
      <span
        aria-hidden
        data-handle="trim"
        onPointerDown={begin('trim')}
        className="absolute inset-y-0 left-0 w-2 cursor-ew-resize bg-black/25"
      />
      <span
        aria-hidden
        data-handle="resize"
        onPointerDown={begin('resize')}
        className="absolute inset-y-0 right-0 w-2 cursor-ew-resize bg-black/25"
      />
    </button>
  );
};

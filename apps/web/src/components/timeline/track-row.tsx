'use client';

import type { Track } from '@cliplibrary/project';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { TRACK_HEIGHT } from '@/lib/timeline-geometry';
import { cn } from '@/lib/utils';
import { type BlockDragMode, ElementBlock } from './element-block';

interface TrackRowProps {
  track: Track;
  pxPerFrame: number;
  width: number;
  active: boolean;
  dropTarget: boolean;
  canRemove: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  selectedId: string | null;
  onActivate: (trackId: string) => void;
  onMoveTrack: (trackId: string, direction: 'up' | 'down') => void;
  onBlockPointerDown: (elementId: string, mode: BlockDragMode, event: ReactPointerEvent) => void;
  onRemoveTrack: (trackId: string) => void;
}

export const TrackRow = ({
  track,
  pxPerFrame,
  width,
  active,
  dropTarget,
  canRemove,
  canMoveUp,
  canMoveDown,
  selectedId,
  onActivate,
  onMoveTrack,
  onBlockPointerDown,
  onRemoveTrack,
}: TrackRowProps) => (
  <div className="flex items-stretch">
    <div
      className={cn(
        'flex w-32 shrink-0 items-center gap-0.5 px-2 text-xs',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground',
      )}
    >
      {active ? <span aria-hidden className="h-6 w-0.5 rounded bg-primary" /> : null}
      <button
        type="button"
        onClick={() => onActivate(track.id)}
        className="min-w-0 flex-1 truncate text-left"
        title="Set as active track"
      >
        {track.name}
      </button>
      <button
        type="button"
        aria-label={`Move ${track.name} up`}
        disabled={!canMoveUp}
        onClick={() => onMoveTrack(track.id, 'up')}
        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20"
      >
        <ChevronUp className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label={`Move ${track.name} down`}
        disabled={!canMoveDown}
        onClick={() => onMoveTrack(track.id, 'down')}
        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20"
      >
        <ChevronDown className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label={`Remove ${track.name}`}
        disabled={!canRemove}
        onClick={() => onRemoveTrack(track.id)}
        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20"
      >
        <X className="size-3.5" />
      </button>
    </div>
    <div
      data-track-id={track.id}
      className={cn(
        'relative block',
        active ? 'bg-muted/40' : 'bg-transparent',
        dropTarget ? 'ring-2 ring-primary ring-inset' : '',
      )}
      style={{ width, height: TRACK_HEIGHT }}
    >
      {track.elements.map((element) => (
        <ElementBlock
          key={element.id}
          element={element}
          pxPerFrame={pxPerFrame}
          selected={element.id === selectedId}
          onPointerDownBlock={onBlockPointerDown}
        />
      ))}
    </div>
  </div>
);

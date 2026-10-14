'use client';

import type { Track } from '@cliplibrary/project';
import { X } from 'lucide-react';
import { TRACK_HEIGHT } from '@/lib/timeline-geometry';
import { cn } from '@/lib/utils';
import { ElementBlock } from './element-block';

interface TrackRowProps {
  track: Track;
  pxPerFrame: number;
  width: number;
  active: boolean;
  canRemove: boolean;
  selectedId: string | null;
  onActivate: (trackId: string) => void;
  onSelectElement: (id: string) => void;
  onMoveElement: (id: string, from: number) => void;
  onResizeElement: (id: string, durationInFrames: number) => void;
  onRemoveTrack: (trackId: string) => void;
}

export const TrackRow = ({
  track,
  pxPerFrame,
  width,
  active,
  canRemove,
  selectedId,
  onActivate,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onRemoveTrack,
}: TrackRowProps) => (
  <div className="flex items-stretch">
    <div
      className={cn(
        'flex w-32 shrink-0 items-center justify-between gap-1 px-2 text-xs',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground',
      )}
    >
      <button
        type="button"
        onClick={() => onActivate(track.id)}
        className="truncate text-left"
        title="Set as active track"
      >
        {track.name}
      </button>
      <button
        type="button"
        aria-label={`Remove ${track.name}`}
        disabled={!canRemove}
        onClick={() => onRemoveTrack(track.id)}
        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
      >
        <X className="size-3.5" />
      </button>
    </div>
    <div
      className={cn('relative block', active ? 'bg-muted/40' : 'bg-transparent')}
      style={{ width, height: TRACK_HEIGHT }}
    >
      {track.elements.map((element) => (
        <ElementBlock
          key={element.id}
          element={element}
          pxPerFrame={pxPerFrame}
          selected={element.id === selectedId}
          onSelect={onSelectElement}
          onMove={onMoveElement}
          onResize={onResizeElement}
        />
      ))}
    </div>
  </div>
);

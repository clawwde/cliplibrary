'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import {
  buildTicks,
  formatSeconds,
  frameToPx,
  pxToFrame,
  RULER_HEIGHT,
} from '@/lib/timeline-geometry';

interface TimelineRulerProps {
  durationInFrames: number;
  fps: number;
  pxPerFrame: number;
  width: number;
  onSeek: (frame: number) => void;
}

export const TimelineRuler = ({
  durationInFrames,
  fps,
  pxPerFrame,
  width,
  onSeek,
}: TimelineRulerProps) => {
  const ticks = buildTicks(durationInFrames, fps, pxPerFrame);

  const handleSeek = (event: ReactPointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const frame = pxToFrame(event.clientX - rect.left, pxPerFrame);
    onSeek(Math.max(0, Math.min(durationInFrames, frame)));
  };

  return (
    <button
      type="button"
      aria-label="Seek timeline"
      onPointerDown={handleSeek}
      className="relative block bg-muted/30"
      style={{ width, height: RULER_HEIGHT }}
    >
      {ticks.map((tick) => (
        <span
          key={tick.frame}
          className="absolute top-0 bottom-0 border-border/60 border-l"
          style={{ left: frameToPx(tick.frame, pxPerFrame) }}
        >
          <span className="ml-1 text-[10px] text-muted-foreground tabular-nums">
            {formatSeconds(tick.seconds)}
          </span>
        </span>
      ))}
    </button>
  );
};

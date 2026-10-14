'use client';

import type { Project } from '@cliplibrary/project';
import { frameToPx } from '@/lib/timeline-geometry';
import { TimelineRuler } from './timeline-ruler';
import { TrackRow } from './track-row';

const LABEL_WIDTH = 128;

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
  onRemoveTrack: (trackId: string) => void;
}

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
  onRemoveTrack,
}: TimelineProps) => {
  const laneWidth = frameToPx(project.durationInFrames, pxPerFrame);
  const canRemove = project.tracks.length > 1;

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
          <div className="flex flex-col divide-y divide-border/40">
            {project.tracks.map((track) => (
              <TrackRow
                key={track.id}
                track={track}
                pxPerFrame={pxPerFrame}
                width={laneWidth}
                active={track.id === activeTrackId}
                canRemove={canRemove}
                selectedId={selectedId}
                onActivate={onActivateTrack}
                onSelectElement={onSelectElement}
                onMoveElement={onMoveElement}
                onResizeElement={onResizeElement}
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

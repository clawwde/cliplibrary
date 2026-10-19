'use client';

import { Player, type PlayerRef } from '@remotion/player';
import { Maximize, Monitor, Smartphone, Square } from 'lucide-react';
import { type ComponentType, type RefObject, useEffect } from 'react';
import { ProjectComposition } from '@/compositions';
import { usePersistedState } from '@/lib/use-persisted-state';
import { cn } from '@/lib/utils';
import type { Project } from '@/project';

const DEVICES = [
  { key: 'mobile', label: 'Mobile', icon: Smartphone, maxWidth: 420 },
  { key: 'square', label: 'Square', icon: Square, maxWidth: 640 },
  { key: 'desktop', label: 'Desktop', icon: Monitor, maxWidth: 980 },
  { key: 'full', label: 'Full', icon: Maximize, maxWidth: null },
] as const;

type DeviceKey = (typeof DEVICES)[number]['key'];

const frameWidth = (maxWidth: number | null, aspect: number): string =>
  `min(100%, ${maxWidth === null ? '' : `${maxWidth}px, `}${aspect * 100}cqh)`;

const Composition = ProjectComposition as ComponentType<Record<string, unknown>>;

interface ClipPreviewProps {
  project: Project;
  playerRef: RefObject<PlayerRef | null>;
  onFrameChange: (frame: number) => void;
  onPlayingChange: (playing: boolean) => void;
}

export const ClipPreview = ({
  project,
  playerRef,
  onFrameChange,
  onPlayingChange,
}: ClipPreviewProps) => {
  const [device, setDevice] = usePersistedState<DeviceKey>('cliplibrary-device', 'desktop');
  const active = DEVICES.find((entry) => entry.key === device) ?? DEVICES[2];

  useEffect(() => {
    const player = playerRef.current;
    if (player === null) {
      return;
    }
    const handleFrame = (event: { detail: { frame: number } }) => onFrameChange(event.detail.frame);
    const handlePlay = () => onPlayingChange(true);
    const handlePause = () => onPlayingChange(false);
    player.addEventListener('frameupdate', handleFrame);
    player.addEventListener('play', handlePlay);
    player.addEventListener('pause', handlePause);
    return () => {
      player.removeEventListener('frameupdate', handleFrame);
      player.removeEventListener('play', handlePlay);
      player.removeEventListener('pause', handlePause);
    };
  }, [playerRef, onFrameChange, onPlayingChange]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center p-3">
        <div className="inline-flex gap-1 rounded-lg bg-muted p-1">
          {DEVICES.map((entry) => {
            const Icon = entry.icon;
            return (
              <button
                key={entry.key}
                type="button"
                onClick={() => setDevice(entry.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-muted-foreground text-xs transition-colors',
                  entry.key === device && 'bg-background text-foreground shadow-sm',
                )}
              >
                <Icon className="size-3.5" />
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>
      <div
        className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-6"
        style={{ containerType: 'size' }}
      >
        <div
          className="overflow-hidden rounded-xl bg-black shadow-xl"
          style={{ width: frameWidth(active.maxWidth, project.width / project.height) }}
        >
          <Player
            ref={playerRef}
            component={Composition}
            inputProps={project as unknown as Record<string, unknown>}
            durationInFrames={project.durationInFrames}
            fps={project.fps}
            compositionWidth={project.width}
            compositionHeight={project.height}
            acknowledgeRemotionLicense
            controls
            loop
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

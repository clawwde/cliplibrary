'use client';

import { ProjectComposition } from '@cliplibrary/compositions';
import type { Project } from '@cliplibrary/project';
import { Player, type PlayerRef } from '@remotion/player';
import { type ComponentType, type RefObject, useEffect } from 'react';

interface ProjectPreviewProps {
  project: Project;
  playerRef: RefObject<PlayerRef | null>;
  onFrameChange: (frame: number) => void;
  onPlayingChange: (playing: boolean) => void;
}

const Composition = ProjectComposition as ComponentType<Record<string, unknown>>;

export const ProjectPreview = ({
  project,
  playerRef,
  onFrameChange,
  onPlayingChange,
}: ProjectPreviewProps) => {
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
    <div className="flex min-h-0 flex-1 items-center justify-center p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-xl">
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
  );
};

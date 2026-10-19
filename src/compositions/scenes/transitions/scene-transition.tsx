import type { CSSProperties } from 'react';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type SceneTransitionProps,
  sceneTransitionDefaults,
  sceneTransitionMeta,
  sceneTransitionSchema,
} from '@/schemas';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const coverStyle = (
  kind: SceneTransitionProps['kind'],
  cover: number,
  open: number,
): CSSProperties => {
  switch (kind) {
    case 'iris':
      return open > 0
        ? {
            maskImage: `radial-gradient(circle at 50% 50%, transparent ${open * 101}%, black ${open * 101 + 0.5}%)`,
          }
        : { clipPath: `circle(${cover * 101}% at 50% 50%)` };
    case 'wipe-left':
      return { transform: `translateX(${(1 - cover) * 100 - open * 100}%)` };
    case 'wipe-up':
      return { transform: `translateY(${(1 - cover) * 100 - open * 100}%)` };
    case 'split':
      return {
        clipPath: `inset(${(1 - cover) * 50 + open * 50}% 0 ${(1 - cover) * 50 + open * 50}% 0)`,
      };
    default:
      return {};
  }
};

export const SceneTransition = ({ kind, color, easing }: SceneTransitionProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const half = durationInFrames / 2;
  const curve = resolveEasing(easing);
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: curve } as const;
  const cover = interpolate(frame, [0, half], [0, 1], clamp);
  const open = interpolate(frame, [half, durationInFrames], [0, 1], clamp);
  return <AbsoluteFill style={{ background: color, ...coverStyle(kind, cover, open) }} />;
};

export const sceneTransitionScene: SceneModule = {
  id: 'scene-transition',
  component: SceneTransition,
  render: (key) => (
    <Composition
      key={key}
      id="scene-transition"
      component={SceneTransition}
      schema={sceneTransitionSchema}
      defaultProps={sceneTransitionDefaults}
      durationInFrames={sceneTransitionMeta.durationInFrames}
      fps={sceneTransitionMeta.fps}
      width={sceneTransitionMeta.width}
      height={sceneTransitionMeta.height}
    />
  ),
};

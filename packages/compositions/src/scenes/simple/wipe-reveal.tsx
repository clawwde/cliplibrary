import {
  type WipeRevealProps,
  wipeRevealDefaults,
  wipeRevealMeta,
  wipeRevealSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Syne';
import type { CSSProperties } from 'react';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

type Direction = WipeRevealProps['direction'];

const clipFor = (direction: Direction, p: number): string => {
  const hidden = (1 - p) * 100;
  if (direction === 'left') {
    return `inset(0% ${hidden}% 0% 0%)`;
  }
  if (direction === 'right') {
    return `inset(0% 0% 0% ${hidden}%)`;
  }
  if (direction === 'up') {
    return `inset(0% 0% ${hidden}% 0%)`;
  }
  return `inset(${hidden}% 0% 0% 0%)`;
};

const barFor = (direction: Direction, p: number): CSSProperties => {
  const horizontal = direction === 'left' || direction === 'right';
  const edge = direction === 'left' || direction === 'up' ? p * 100 : (1 - p) * 100;
  if (horizontal) {
    return { top: 0, bottom: 0, left: `${edge}%`, width: 14, transform: 'translateX(-50%)' };
  }
  return { left: 0, right: 0, top: `${edge}%`, height: 14, transform: 'translateY(-50%)' };
};

export const WipeReveal = ({
  text,
  background,
  color,
  bar,
  direction,
  speed,
  easing,
}: WipeRevealProps) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  const barOpacity = interpolate(p, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  return (
    <AbsoluteFill
      style={{ background, fontFamily, justifyContent: 'center', alignItems: 'center' }}
    >
      <div
        style={{
          color,
          fontSize: 190,
          fontWeight: 800,
          letterSpacing: -4,
          clipPath: clipFor(direction, p),
        }}
      >
        {text}
      </div>
      <div
        style={{
          position: 'absolute',
          background: bar,
          opacity: barOpacity,
          ...barFor(direction, p),
        }}
      />
    </AbsoluteFill>
  );
};

export const wipeRevealScene: SceneModule = {
  id: 'wipe-reveal',
  component: WipeReveal,
  render: (key) => (
    <Composition
      key={key}
      id="wipe-reveal"
      component={WipeReveal}
      schema={wipeRevealSchema}
      defaultProps={wipeRevealDefaults}
      durationInFrames={wipeRevealMeta.durationInFrames}
      fps={wipeRevealMeta.fps}
      width={wipeRevealMeta.width}
      height={wipeRevealMeta.height}
    />
  ),
};

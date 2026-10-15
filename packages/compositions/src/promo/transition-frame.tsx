import type { PromoMotion, PromoTransition } from '@cliplibrary/schemas';
import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { smooth, tween } from './timing';

const styleFor = (
  kind: PromoTransition,
  hidden: number,
  incoming: boolean,
  halfSide: number,
): CSSProperties => {
  if (kind === 'none' || hidden <= 0) {
    return {};
  }
  const direction = incoming ? 1 : -1;
  switch (kind) {
    case 'fade':
      return { opacity: 1 - hidden };
    case 'blur':
      return {
        opacity: 1 - hidden,
        filter: `blur(${hidden * 28}px)`,
        transform: `scale(${1 + (hidden * 28 * 3 + 2) / halfSide})`,
      };
    case 'rise':
      return { transform: `translateY(${hidden * 100 * direction}%)` };
    case 'iris':
      return { clipPath: `circle(${(1 - hidden) * 101}% at 50% 50%)` };
    case 'push-left':
      return { transform: `translateX(${hidden * 100 * direction}%)` };
    case 'push-up':
      return { transform: `translateY(${hidden * 100 * direction}%)` };
    case 'zoom':
      return {
        opacity: 1 - hidden,
        transform: `scale(${incoming ? 1 + hidden * 0.25 : 1 - hidden * 0.12})`,
      };
    default:
      return {};
  }
};

export const TransitionFrame = ({
  motion,
  children,
}: {
  motion: PromoMotion;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const halfSide = Math.min(width, height) / 2;
  const entering =
    motion.enterFrames > 0 ? tween(frame, [0, motion.enterFrames], [1, 0], smooth) : 0;
  const exiting =
    motion.exitFrames > 0
      ? tween(frame, [durationInFrames - motion.exitFrames, durationInFrames], [0, 1], smooth)
      : 0;
  const inStyle = styleFor(motion.enter, entering, true, halfSide);
  const outStyle = styleFor(motion.exit, exiting, false, halfSide);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={inStyle}>
        <AbsoluteFill style={outStyle}>{children}</AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

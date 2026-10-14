import {
  type SlideInProps,
  slideInDefaults,
  slideInMeta,
  slideInSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['700'], subsets: ['latin'] });

const offsetFor = (direction: SlideInProps['direction'], distance: number, hidden: number) => {
  const travel = distance * hidden;
  if (direction === 'left') {
    return `translateX(${-travel}px)`;
  }
  if (direction === 'right') {
    return `translateX(${travel}px)`;
  }
  if (direction === 'top') {
    return `translateY(${-travel}px)`;
  }
  return `translateY(${travel}px)`;
};

export const SlideIn = ({
  text,
  background,
  color,
  direction,
  distance,
  speed,
  easing,
}: SlideInProps) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <AbsoluteFill
      style={{ background, fontFamily, justifyContent: 'center', alignItems: 'center' }}
    >
      <div
        style={{
          color,
          fontSize: 150,
          fontWeight: 700,
          opacity: progress,
          transform: offsetFor(direction, distance, 1 - progress),
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const slideInScene: SceneModule = {
  id: 'slide-in',
  component: SlideIn,
  render: (key) => (
    <Composition
      key={key}
      id="slide-in"
      component={SlideIn}
      schema={slideInSchema}
      defaultProps={slideInDefaults}
      durationInFrames={slideInMeta.durationInFrames}
      fps={slideInMeta.fps}
      width={slideInMeta.width}
      height={slideInMeta.height}
    />
  ),
};

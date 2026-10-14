import {
  type BounceInProps,
  bounceInDefaults,
  bounceInMeta,
  bounceInSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Poppins';
import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

export const BounceIn = ({
  text,
  background,
  color,
  dropHeight,
  damping,
  easing,
}: BounceInProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame, fps, config: { damping, stiffness: 140, mass: 1.1 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], {
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
          fontSize: 190,
          fontWeight: 800,
          letterSpacing: -4,
          opacity,
          transform: `translateY(${(1 - drop) * -dropHeight}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const bounceInScene: SceneModule = {
  id: 'bounce-in',
  component: BounceIn,
  render: (key) => (
    <Composition
      key={key}
      id="bounce-in"
      component={BounceIn}
      schema={bounceInSchema}
      defaultProps={bounceInDefaults}
      durationInFrames={bounceInMeta.durationInFrames}
      fps={bounceInMeta.fps}
      width={bounceInMeta.width}
      height={bounceInMeta.height}
    />
  ),
};

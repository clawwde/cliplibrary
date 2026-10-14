import {
  type RiseSlideProps,
  riseSlideDefaults,
  riseSlideMeta,
  riseSlideSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500', '700'], subsets: ['latin'] });

export const RiseSlide = ({
  title,
  subtitle,
  background,
  color,
  accent,
  distance,
  speed,
  easing,
}: RiseSlideProps) => {
  const frame = useCurrentFrame();
  const curve = resolveEasing(easing);
  const title_t = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: curve,
  });
  const sub_t = interpolate(frame, [10, speed + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: curve,
  });
  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          color,
          fontSize: 150,
          fontWeight: 700,
          opacity: title_t,
          transform: `translateY(${(1 - title_t) * distance}px)`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: accent,
          fontSize: 52,
          fontWeight: 500,
          letterSpacing: 2,
          opacity: sub_t,
          transform: `translateY(${(1 - sub_t) * distance}px)`,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

export const riseSlideScene: SceneModule = {
  id: 'rise-slide',
  component: RiseSlide,
  render: (key) => (
    <Composition
      key={key}
      id="rise-slide"
      component={RiseSlide}
      schema={riseSlideSchema}
      defaultProps={riseSlideDefaults}
      durationInFrames={riseSlideMeta.durationInFrames}
      fps={riseSlideMeta.fps}
      width={riseSlideMeta.width}
      height={riseSlideMeta.height}
    />
  ),
};

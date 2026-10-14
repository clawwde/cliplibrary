import {
  type CountUpProps,
  countUpDefaults,
  countUpMeta,
  countUpSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500', '700'], subsets: ['latin'] });

export const CountUp = ({
  label,
  prefix,
  suffix,
  target,
  speed,
  background,
  color,
  accent,
  easing,
}: CountUpProps) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [0, speed], [0, target], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
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
          color: accent,
          fontSize: 44,
          fontWeight: 500,
          letterSpacing: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ color, fontSize: 260, fontWeight: 700, lineHeight: 1 }}>
        {prefix}
        {Math.round(value).toLocaleString()}
        {suffix}
      </div>
    </AbsoluteFill>
  );
};

export const countUpScene: SceneModule = {
  id: 'count-up',
  component: CountUp,
  render: (key) => (
    <Composition
      key={key}
      id="count-up"
      component={CountUp}
      schema={countUpSchema}
      defaultProps={countUpDefaults}
      durationInFrames={countUpMeta.durationInFrames}
      fps={countUpMeta.fps}
      width={countUpMeta.width}
      height={countUpMeta.height}
    />
  ),
};

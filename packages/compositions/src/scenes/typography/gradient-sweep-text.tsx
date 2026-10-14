import {
  type GradientSweepTextProps,
  gradientSweepTextDefaults,
  gradientSweepTextMeta,
  gradientSweepTextSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Outfit';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

export const GradientSweepText = ({
  text,
  background,
  colorA,
  colorB,
  angle,
  speed,
  easing,
}: GradientSweepTextProps) => {
  const frame = useCurrentFrame();
  const sweep = ((frame % speed) / speed) * 100;
  const reveal = interpolate(frame, [0, 24], [0, 1], {
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
        padding: 160,
      }}
    >
      <div
        style={{
          fontSize: 200,
          fontWeight: 800,
          letterSpacing: -6,
          textAlign: 'center',
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 40}px)`,
          backgroundImage: `linear-gradient(${angle}deg, ${colorA}, ${colorB}, ${colorA})`,
          backgroundSize: '200% 100%',
          backgroundPosition: `${sweep}% 0`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const gradientSweepTextScene: SceneModule = {
  id: 'gradient-sweep-text',
  component: GradientSweepText,
  render: (key) => (
    <Composition
      key={key}
      id="gradient-sweep-text"
      component={GradientSweepText}
      schema={gradientSweepTextSchema}
      defaultProps={gradientSweepTextDefaults}
      durationInFrames={gradientSweepTextMeta.durationInFrames}
      fps={gradientSweepTextMeta.fps}
      width={gradientSweepTextMeta.width}
      height={gradientSweepTextMeta.height}
    />
  ),
};

import { type FadeInProps, fadeInDefaults, fadeInMeta, fadeInSchema } from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Inter';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import { lerp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

export const FadeIn = ({ text, background, color, speed, scaleFrom, easing }: FadeInProps) => {
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
          fontSize: 160,
          fontWeight: 800,
          letterSpacing: -3,
          opacity: progress,
          transform: `scale(${lerp(scaleFrom, 1, progress)})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const fadeInScene: SceneModule = {
  id: 'fade-in',
  component: FadeIn,
  render: (key) => (
    <Composition
      key={key}
      id="fade-in"
      component={FadeIn}
      schema={fadeInSchema}
      defaultProps={fadeInDefaults}
      durationInFrames={fadeInMeta.durationInFrames}
      fps={fadeInMeta.fps}
      width={fadeInMeta.width}
      height={fadeInMeta.height}
    />
  ),
};

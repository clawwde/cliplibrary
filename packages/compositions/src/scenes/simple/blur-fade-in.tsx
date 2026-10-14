import {
  type BlurFadeInProps,
  blurFadeInDefaults,
  blurFadeInMeta,
  blurFadeInSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Inter';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

export const BlurFadeIn = ({ text, background, color, blur, speed, easing }: BlurFadeInProps) => {
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
          fontWeight: 800,
          letterSpacing: -2,
          opacity: progress,
          filter: `blur(${(1 - progress) * blur}px)`,
          transform: `scale(${0.96 + progress * 0.04})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const blurFadeInScene: SceneModule = {
  id: 'blur-fade-in',
  component: BlurFadeIn,
  render: (key) => (
    <Composition
      key={key}
      id="blur-fade-in"
      component={BlurFadeIn}
      schema={blurFadeInSchema}
      defaultProps={blurFadeInDefaults}
      durationInFrames={blurFadeInMeta.durationInFrames}
      fps={blurFadeInMeta.fps}
      width={blurFadeInMeta.width}
      height={blurFadeInMeta.height}
    />
  ),
};

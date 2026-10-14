import {
  type ScalePopProps,
  scalePopDefaults,
  scalePopMeta,
  scalePopSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Archivo';
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

const { fontFamily } = loadFont('normal', { weights: ['900'], subsets: ['latin'] });

export const ScalePop = ({
  text,
  background,
  color,
  accent,
  damping,
  fade,
  easing,
}: ScalePopProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping, stiffness: 160, mass: 1 } });
  const opacity = interpolate(frame, [0, fade], [0, 1], {
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
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: accent,
          filter: 'blur(140px)',
          opacity: opacity * 0.5,
          transform: `scale(${0.6 + pop * 0.6})`,
        }}
      />
      <div
        style={{
          color,
          fontSize: 220,
          fontWeight: 900,
          letterSpacing: -6,
          opacity,
          transform: `scale(${pop})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const scalePopScene: SceneModule = {
  id: 'scale-pop',
  component: ScalePop,
  render: (key) => (
    <Composition
      key={key}
      id="scale-pop"
      component={ScalePop}
      schema={scalePopSchema}
      defaultProps={scalePopDefaults}
      durationInFrames={scalePopMeta.durationInFrames}
      fps={scalePopMeta.fps}
      width={scalePopMeta.width}
      height={scalePopMeta.height}
    />
  ),
};

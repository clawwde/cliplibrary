import {
  type KineticTypeProps,
  kineticTypeDefaults,
  kineticTypeMeta,
  kineticTypeSchema,
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
import { clamp01 } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['900'], subsets: ['latin'] });

const Word = ({
  word,
  start,
  damping,
  color,
  easing,
}: {
  word: string;
  start: number;
  damping: number;
  color: string;
  easing: KineticTypeProps['easing'];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const raw = spring({ frame: frame - start, fps, config: { damping, stiffness: 180, mass: 0.8 } });
  const rise = interpolate(frame, [start, start + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <span
      style={{
        display: 'inline-block',
        color,
        opacity: rise,
        transform: `translateY(${(1 - rise) * 90}px) scale(${clamp01(raw) * 0.4 + raw * 0.6})`,
        transformOrigin: 'bottom center',
      }}
    >
      {word}
    </span>
  );
};

export const KineticType = ({
  body,
  background,
  color,
  accent,
  stagger,
  damping,
  easing,
}: KineticTypeProps) => {
  const words = body.split(/\s+/).filter((word) => word.length > 0);
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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 36px',
          fontSize: 170,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: -4,
          textTransform: 'uppercase',
        }}
      >
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            start={index * stagger}
            damping={damping}
            color={index % 2 === 0 ? color : accent}
            easing={easing}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const kineticTypeScene: SceneModule = {
  id: 'kinetic-type',
  component: KineticType,
  render: (key) => (
    <Composition
      key={key}
      id="kinetic-type"
      component={KineticType}
      schema={kineticTypeSchema}
      defaultProps={kineticTypeDefaults}
      durationInFrames={kineticTypeMeta.durationInFrames}
      fps={kineticTypeMeta.fps}
      width={kineticTypeMeta.width}
      height={kineticTypeMeta.height}
    />
  ),
};

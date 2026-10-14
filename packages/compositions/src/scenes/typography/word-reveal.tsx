import {
  type WordRevealProps,
  wordRevealDefaults,
  wordRevealMeta,
  wordRevealSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Manrope';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

const Word = ({
  word,
  start,
  speed,
  color,
  accent,
  easing,
}: {
  word: string;
  start: number;
  speed: number;
  color: string;
  accent: string;
  easing: WordRevealProps['easing'];
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <span
      style={{
        display: 'inline-block',
        color: p < 0.5 ? accent : color,
        opacity: p,
        transform: `translateY(${(1 - p) * 60}px)`,
      }}
    >
      {word}
    </span>
  );
};

export const WordReveal = ({
  body,
  background,
  color,
  accent,
  stagger,
  speed,
  easing,
}: WordRevealProps) => {
  const words = body.split(/\s+/).filter((word) => word.length > 0);
  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 180,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 32px',
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: -2,
        }}
      >
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            start={index * stagger}
            speed={speed}
            color={color}
            accent={accent}
            easing={easing}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const wordRevealScene: SceneModule = {
  id: 'word-reveal',
  component: WordReveal,
  render: (key) => (
    <Composition
      key={key}
      id="word-reveal"
      component={WordReveal}
      schema={wordRevealSchema}
      defaultProps={wordRevealDefaults}
      durationInFrames={wordRevealMeta.durationInFrames}
      fps={wordRevealMeta.fps}
      width={wordRevealMeta.width}
      height={wordRevealMeta.height}
    />
  ),
};

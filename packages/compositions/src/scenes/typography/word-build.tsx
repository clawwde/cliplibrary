import {
  type WordBuildProps,
  wordBuildDefaults,
  wordBuildMeta,
  wordBuildSchema,
} from '@cliplibrary/schemas';
import type { CSSProperties } from 'react';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { withAlpha } from '../../promo/glow';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { land, settle, smooth, tween } from '../../promo/timing';
import { highlightSet, linesOf, normalize } from '../../promo/words';
import type { SceneModule } from '../../scene-module';

const OVERLAP = 8;
const WORD_STAGGER = 3;

type Entry = WordBuildProps['entry'];

const bigWordStyle = (
  entry: Entry,
  progress: number,
  landed: number,
  size: number,
): CSSProperties => {
  switch (entry) {
    case 'zoom':
      return { transform: `scale(${(0.62 + 0.9 * progress).toFixed(5)})` };
    case 'slide':
      return { transform: `translateX(${((0.5 - progress) * 1100).toFixed(2)}px)` };
    case 'tilt':
      return {
        transform: `perspective(${size * 4}px) rotateY(${46 - 78 * progress}deg) rotateX(${8 - 14 * progress}deg) scale(${0.9 + 0.14 * progress})`,
      };
    case 'pop':
      return { transform: `scale(${0.8 + 0.2 * landed})` };
    default:
      return {};
  }
};

export const WordBuild = ({
  text,
  highlight,
  entry,
  bigSize,
  bigWeight,
  size,
  weight,
  delay,
  wordFrames,
  echoes,
  exitByWord,
  placement,
  look,
  motion,
}: WordBuildProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const lines = linesOf(text);
  const words = lines.flat();
  const accented = highlightSet(highlight);
  const sentenceStart = delay + words.length * wordFrames;
  const exitStart = durationInFrames - motion.exitFrames - words.length * WORD_STAGGER - 12;
  const colorOf = (word: string) => (accented.has(normalize(word)) ? look.accent : look.ink);
  const bigWords = words.map((word, index) => {
    const start = delay + index * wordFrames;
    const end = start + wordFrames + OVERLAP;
    if (frame < start || frame > end) {
      return null;
    }
    const progress = (frame - start) / (end - start);
    const landed = land(frame, [start, start + 10], [0, 1], 1 / (bigSize * 0.4));
    const isLast = index === words.length - 1;
    const opacity =
      tween(frame, [start, start + OVERLAP], [0, 1], (t) => t) *
      (1 - tween(frame, [end - OVERLAP - (isLast ? 2 : 0), end], [0, 1], (t) => t));
    const converge = land(
      frame,
      [start, start + wordFrames],
      [1, 0],
      1 / (bigSize * 0.18 * Math.max(1, echoes)),
    );
    return (
      <AbsoluteFill
        key={`${index}:${word}`}
        style={{ justifyContent: 'center', alignItems: 'center', opacity }}
      >
        <div
          style={{
            position: 'relative',
            willChange: 'transform',
            ...bigWordStyle(entry, progress, landed, bigSize),
          }}
        >
          {entry === 'echo'
            ? Array.from({ length: echoes }, (_, echo) => echo + 1).map((echo) => (
                <div
                  key={echo}
                  style={{
                    ...displayType(bigSize, bigWeight),
                    position: 'absolute',
                    inset: 0,
                    color: 'transparent',
                    WebkitTextStroke: `${Math.max(1, bigSize / 220)}px ${withAlpha(look.ink, 0.55 / echo)}`,
                    transform: `translateX(${(echo * bigSize * 0.16 * converge).toFixed(2)}px)`,
                  }}
                >
                  {word}
                </div>
              ))
            : null}
          <div
            style={{
              ...displayType(bigSize, bigWeight),
              position: 'relative',
              color: colorOf(word),
            }}
          >
            {word}
          </div>
        </div>
      </AbsoluteFill>
    );
  });
  let wordIndex = 0;
  const sentence = lines.map((line, lineIndex) => (
    <div
      key={`${lineIndex}:${line.join(' ')}`}
      style={{ ...displayType(size, weight), lineHeight: 1.08 }}
    >
      {line.map((word, index) => {
        const order = wordIndex++;
        const start = sentenceStart - 2 + order * WORD_STAGGER;
        const rise = land(frame, [start, start + 18], [size * 0.5, 0]);
        const shown = tween(frame, [start, start + 12], [0, 1], settle);
        const leave = exitByWord
          ? tween(
              frame,
              [exitStart + order * WORD_STAGGER, exitStart + order * WORD_STAGGER + 10],
              [0, 1],
              smooth,
            )
          : 0;
        return (
          <span
            key={`${index}:${word}`}
            style={{
              display: 'inline-block',
              color: colorOf(word),
              opacity: shown * (1 - leave),
              transform: `translateY(${rise.toFixed(2)}px)`,
              willChange: 'transform',
            }}
          >
            {word}
            {index < line.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </div>
  ));
  return (
    <KineticLayer look={look} motion={motion} placement={placement} stage={bigWords}>
      {sentence}
    </KineticLayer>
  );
};

export const wordBuildScene: SceneModule = {
  id: 'word-build',
  component: WordBuild,
  render: (key) => (
    <Composition
      key={key}
      id="word-build"
      component={WordBuild}
      schema={wordBuildSchema}
      defaultProps={wordBuildDefaults}
      durationInFrames={wordBuildMeta.durationInFrames}
      fps={wordBuildMeta.fps}
      width={wordBuildMeta.width}
      height={wordBuildMeta.height}
    />
  ),
};

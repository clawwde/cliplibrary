import {
  type WordPunchProps,
  wordPunchDefaults,
  wordPunchMeta,
  wordPunchSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { land, launch, tween } from '../../promo/timing';
import { highlightSet, normalize, wordsOf } from '../../promo/words';
import type { SceneModule } from '../../scene-module';

export const WordPunch = ({
  text,
  highlight,
  size,
  weight,
  delay,
  wordFrames,
  swapFrames,
  punch,
  placement,
  look,
  motion,
}: WordPunchProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const words = wordsOf(text);
  const accented = highlightSet(highlight);
  return (
    <KineticLayer look={look} motion={motion} placement={placement}>
      <div style={{ position: 'relative', height: size, width: '100%' }}>
        {words.map((word, index) => {
          const start = delay + index * wordFrames;
          const leaveAt = start + wordFrames;
          const isLast = index === words.length - 1;
          if (frame < start || (!isLast && frame > leaveAt + swapFrames)) {
            return null;
          }
          const arrive = tween(frame, [start, start + swapFrames], [0, 1], (t) => t);
          const scale = land(frame, [start, start + swapFrames + 8], [1 + punch, 1], 1 / size);
          const leave = isLast
            ? 0
            : tween(frame, [leaveAt, leaveAt + swapFrames], [0, 1], (t) => t);
          const rise = land(frame, [start, start + swapFrames + 4], [size * 0.32, 0]);
          const lift = isLast
            ? 0
            : launch(frame, [leaveAt, leaveAt + swapFrames], [0, -size * 0.32]);
          return (
            <div
              key={`${index}:${word}`}
              style={{
                ...displayType(size, weight),
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent:
                  placement.horizontal === 'center'
                    ? 'center'
                    : placement.horizontal === 'right'
                      ? 'flex-end'
                      : 'flex-start',
                alignItems: 'center',
                color: accented.has(normalize(word)) ? look.accent : look.ink,
                opacity: arrive * (1 - leave),
                transform: `translateY(${(rise + lift).toFixed(2)}px) scale(${(scale * (1 - leave * 0.06)).toFixed(5)})`,
                willChange: 'transform',
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </KineticLayer>
  );
};

export const wordPunchScene: SceneModule = {
  id: 'word-punch',
  component: WordPunch,
  render: (key) => (
    <Composition
      key={key}
      id="word-punch"
      component={WordPunch}
      schema={wordPunchSchema}
      defaultProps={wordPunchDefaults}
      durationInFrames={wordPunchMeta.durationInFrames}
      fps={wordPunchMeta.fps}
      width={wordPunchMeta.width}
      height={wordPunchMeta.height}
    />
  ),
};

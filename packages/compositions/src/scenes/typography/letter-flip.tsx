import {
  type LetterFlipProps,
  letterFlipDefaults,
  letterFlipMeta,
  letterFlipSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { land, settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

export const LetterFlip = ({
  text,
  size,
  weight,
  tracking,
  startAngle,
  slide,
  delay,
  stagger,
  flipFrames,
  highlight,
  placement,
  look,
  motion,
}: LetterFlipProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const letters = Array.from(text);
  const reach = size * (0.3 * startAngle * (Math.PI / 180) + slide);
  return (
    <KineticLayer look={look} motion={motion} placement={placement}>
      <div style={{ ...displayType(size, weight, tracking), color: look.ink, display: 'flex' }}>
        {letters.map((letter, index) => {
          const start = delay + index * stagger;
          const turn = land(frame, [start, start + flipFrames], [1, 0], 1 / Math.max(1, reach));
          return (
            <span
              key={`${index}:${letter}`}
              style={{
                display: 'inline-block',
                color: index + 1 === highlight ? look.accent : undefined,
                opacity: tween(frame, [start, start + flipFrames * 0.4], [0, 1], settle),
                transform: `perspective(${size * 3}px) translateX(${(-slide * size * turn).toFixed(2)}px) rotateY(${(-startAngle * turn).toFixed(3)}deg)`,
                transformOrigin: '50% 50%',
                willChange: 'transform',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </KineticLayer>
  );
};

export const letterFlipScene: SceneModule = {
  id: 'letter-flip',
  component: LetterFlip,
  render: (key) => (
    <Composition
      key={key}
      id="letter-flip"
      component={LetterFlip}
      schema={letterFlipSchema}
      defaultProps={letterFlipDefaults}
      durationInFrames={letterFlipMeta.durationInFrames}
      fps={letterFlipMeta.fps}
      width={letterFlipMeta.width}
      height={letterFlipMeta.height}
    />
  ),
};

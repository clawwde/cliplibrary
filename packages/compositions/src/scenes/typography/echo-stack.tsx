import {
  type EchoStackProps,
  echoStackDefaults,
  echoStackMeta,
  echoStackSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { land, launch, settle, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

export const EchoStack = ({
  text,
  rows,
  accentRow,
  size,
  weight,
  lineHeight,
  delay,
  rowStagger,
  exitAt,
  placement,
  look,
  motion,
}: EchoStackProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const pitch = size * lineHeight;
  return (
    <KineticLayer look={look} motion={motion} placement={placement}>
      {Array.from({ length: rows }, (_, row) => {
        const start = delay + row * rowStagger;
        const leave = exitAt + row * rowStagger;
        const rise = land(frame, [start, start + 20], [size * 0.45, 0]);
        const drop = launch(frame, [leave, leave + 16], [0, pitch * 0.8]);
        const opacity =
          tween(frame, [start, start + 12], [0, 1], settle) *
          (1 - tween(frame, [leave + 2, leave + 14], [0, 1], smooth));
        return (
          <div
            key={row}
            style={{
              ...displayType(size, weight, -0.01),
              height: pitch,
              lineHeight: `${pitch}px`,
              color: row + 1 === accentRow ? look.accent : look.ink,
              opacity,
              transform: `translateY(${(rise + drop).toFixed(2)}px)`,
              willChange: 'transform',
            }}
          >
            {text}
          </div>
        );
      })}
    </KineticLayer>
  );
};

export const echoStackScene: SceneModule = {
  id: 'echo-stack',
  component: EchoStack,
  render: (key) => (
    <Composition
      key={key}
      id="echo-stack"
      component={EchoStack}
      schema={echoStackSchema}
      defaultProps={echoStackDefaults}
      durationInFrames={echoStackMeta.durationInFrames}
      fps={echoStackMeta.fps}
      width={echoStackMeta.width}
      height={echoStackMeta.height}
    />
  ),
};

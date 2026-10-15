import {
  type ScribbleCaptionProps,
  scribbleCaptionDefaults,
  scribbleCaptionMeta,
  scribbleCaptionSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { bodyFont } from '../../promo/fonts';
import { KineticLayer } from '../../promo/kinetic';
import { Scribble } from '../../promo/scribble';
import { land, settle, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const OFFSET_Y: Record<ScribbleCaptionProps['scribblePlace'], number> = {
  through: 0,
  under: 1.1,
  around: 0,
};

export const ScribbleCaption = ({
  text,
  size,
  weight,
  tracking,
  spread,
  shape,
  scribblePlace,
  scribbleWidth,
  strokeWidth,
  keepScribble,
  delay,
  drawFrames,
  placement,
  look,
  motion,
}: ScribbleCaptionProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const letters = Array.from(text);
  const middle = (letters.length - 1) / 2;
  const reach = Math.max(1, middle * tracking * spread * size);
  const textStart = delay + Math.round(drawFrames * 0.35);
  const open = land(frame, [textStart, textStart + 36], [1, 0], 1 / reach);
  const shown = tween(frame, [textStart, textStart + 16], [0, 1], settle);
  const head = tween(frame, [delay, delay + drawFrames], [0, 1], smooth);
  const tail = keepScribble
    ? 0
    : tween(frame, [delay + drawFrames * 0.6, delay + drawFrames * 1.7], [0, 1], smooth);
  const scribble = (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translateY(${OFFSET_Y[scribblePlace] * size}px) scale(${scribblePlace === 'around' ? 1.25 : 1})`,
        pointerEvents: 'none',
      }}
    >
      <Scribble
        shape={shape}
        head={head}
        tail={tail}
        width={scribbleWidth}
        strokeWidth={strokeWidth}
        color={look.ink}
      />
    </div>
  );
  return (
    <KineticLayer look={look} motion={motion} placement={placement}>
      <div style={{ position: 'relative' }}>
        {scribble}
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: size,
            fontWeight: weight,
            letterSpacing: `${tracking}em`,
            lineHeight: 1.2,
            whiteSpace: 'pre',
            color: look.ink,
            opacity: shown,
            marginRight: `-${tracking}em`,
          }}
        >
          {letters.map((letter, index) => (
            <span
              key={`${index}:${letter}`}
              style={{
                display: 'inline-block',
                transform: `translateX(${(-(index - middle) * tracking * spread * size * open).toFixed(3)}px)`,
                willChange: 'transform',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </KineticLayer>
  );
};

export const scribbleCaptionScene: SceneModule = {
  id: 'scribble-caption',
  component: ScribbleCaption,
  render: (key) => (
    <Composition
      key={key}
      id="scribble-caption"
      component={ScribbleCaption}
      schema={scribbleCaptionSchema}
      defaultProps={scribbleCaptionDefaults}
      durationInFrames={scribbleCaptionMeta.durationInFrames}
      fps={scribbleCaptionMeta.fps}
      width={scribbleCaptionMeta.width}
      height={scribbleCaptionMeta.height}
    />
  ),
};

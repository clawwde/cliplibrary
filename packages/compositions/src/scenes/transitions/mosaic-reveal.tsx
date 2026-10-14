import {
  type MosaicRevealProps,
  mosaicRevealDefaults,
  mosaicRevealMeta,
  mosaicRevealSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Syne';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['800'], subsets: ['latin'] });

const Tile = ({
  delay,
  speed,
  from,
  to,
  easing,
}: {
  delay: number;
  speed: number;
  from: string;
  to: string;
  easing: MosaicRevealProps['easing'];
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <div style={{ perspective: 600 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: p < 0.5 ? from : to,
          transform: `rotateY(${p * 180}deg)`,
        }}
      />
    </div>
  );
};

export const MosaicReveal = ({
  title,
  background,
  tileFrom,
  tileTo,
  color,
  columns,
  rows,
  stagger,
  speed,
  easing,
}: MosaicRevealProps) => {
  const frame = useCurrentFrame();
  const cells = Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    return (column + row) * stagger;
  });
  const titleStart = (columns - 1 + (rows - 1)) * stagger + speed * 0.5;
  const reveal = interpolate(frame, [titleStart, titleStart + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background, fontFamily }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells.map((delay, index) => (
          <Tile
            key={index}
            delay={delay}
            speed={speed}
            from={tileFrom}
            to={tileTo}
            easing={easing}
          />
        ))}
      </div>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            color,
            fontSize: 190,
            fontWeight: 800,
            letterSpacing: -6,
            textTransform: 'lowercase',
            opacity: reveal,
            transform: `scale(${0.9 + reveal * 0.1})`,
            textShadow: '0 20px 60px rgba(0,0,0,0.45)',
          }}
        >
          {title}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const mosaicRevealScene: SceneModule = {
  id: 'mosaic-reveal',
  component: MosaicReveal,
  render: (key) => (
    <Composition
      key={key}
      id="mosaic-reveal"
      component={MosaicReveal}
      schema={mosaicRevealSchema}
      defaultProps={mosaicRevealDefaults}
      durationInFrames={mosaicRevealMeta.durationInFrames}
      fps={mosaicRevealMeta.fps}
      width={mosaicRevealMeta.width}
      height={mosaicRevealMeta.height}
    />
  ),
};

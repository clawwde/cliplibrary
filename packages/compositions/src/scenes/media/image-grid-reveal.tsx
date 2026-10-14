import {
  type ImageGridRevealProps,
  imageGridRevealDefaults,
  imageGridRevealMeta,
  imageGridRevealSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/DMSans';
import { AbsoluteFill, Composition, Img, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500', '700'], subsets: ['latin'] });

const Tile = ({
  src,
  index,
  start,
  speed,
  easing,
}: {
  src: string;
  index: number;
  start: number;
  speed: number;
  easing: ImageGridRevealProps['easing'];
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <div style={{ perspective: 1400 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 24,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          opacity: p,
          transform: `rotateY(${(1 - p) * 70}deg) scale(${0.85 + p * 0.15})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {src.length > 0 ? (
          <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 92, fontWeight: 700 }}>
            {index + 1}
          </div>
        )}
      </div>
    </div>
  );
};

export const ImageGridReveal = ({
  title,
  background,
  color,
  image1,
  image2,
  image3,
  image4,
  stagger,
  speed,
  easing,
}: ImageGridRevealProps) => {
  const frame = useCurrentFrame();
  const images = [image1, image2, image3, image4];
  const titleIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill
      style={{ background, fontFamily, padding: 110, flexDirection: 'column', gap: 44 }}
    >
      <div
        style={{
          color,
          fontSize: 80,
          fontWeight: 700,
          letterSpacing: -2,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -24}px)`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 32,
          flex: 1,
        }}
      >
        {images.map((src, index) => (
          <Tile
            key={index}
            src={src}
            index={index}
            start={index * stagger}
            speed={speed}
            easing={easing}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const imageGridRevealScene: SceneModule = {
  id: 'image-grid-reveal',
  component: ImageGridReveal,
  render: (key) => (
    <Composition
      key={key}
      id="image-grid-reveal"
      component={ImageGridReveal}
      schema={imageGridRevealSchema}
      defaultProps={imageGridRevealDefaults}
      durationInFrames={imageGridRevealMeta.durationInFrames}
      fps={imageGridRevealMeta.fps}
      width={imageGridRevealMeta.width}
      height={imageGridRevealMeta.height}
    />
  ),
};

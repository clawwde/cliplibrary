import {
  type ImageShowcaseProps,
  imageShowcaseDefaults,
  imageShowcaseMeta,
  imageShowcaseSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/DMSans';
import { AbsoluteFill, Composition, Img, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ramp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500', '700'], subsets: ['latin'] });

const Slot = ({ src, index }: { src: string; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 12 - index * 8, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        flex: 1,
        aspectRatio: '3 / 4',
        borderRadius: 24,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        opacity: Math.min(1, enter),
        transform: `translateY(${(1 - enter) * 80}px) scale(${0.92 + Math.min(1, enter) * 0.08})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {src.length > 0 ? (
        <Img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          {index + 1}
        </div>
      )}
    </div>
  );
};

export const ImageShowcase = ({
  title,
  background,
  image1,
  image2,
  image3,
  image4,
}: ImageShowcaseProps) => {
  const frame = useCurrentFrame();
  const images = [image1, image2, image3, image4];
  return (
    <AbsoluteFill
      style={{ background, fontFamily, padding: 120, flexDirection: 'column', gap: 48 }}
    >
      <div
        style={{
          color: '#f8fafc',
          fontSize: 88,
          fontWeight: 700,
          opacity: ramp(frame, 0, 18),
          transform: `translateY(${(1 - ramp(frame, 0, 18)) * -30}px)`,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', gap: 32, flex: 1 }}>
        {images.map((src, index) => (
          <Slot key={index} src={src} index={index} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const imageShowcaseScene: SceneModule = {
  id: 'image-showcase',
  component: ImageShowcase,
  render: (key) => (
    <Composition
      key={key}
      id="image-showcase"
      component={ImageShowcase}
      schema={imageShowcaseSchema}
      defaultProps={imageShowcaseDefaults}
      durationInFrames={imageShowcaseMeta.durationInFrames}
      fps={imageShowcaseMeta.fps}
      width={imageShowcaseMeta.width}
      height={imageShowcaseMeta.height}
    />
  ),
};

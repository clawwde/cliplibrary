import {
  type KenBurnsProps,
  kenBurnsDefaults,
  kenBurnsMeta,
  kenBurnsSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Fraunces';
import {
  AbsoluteFill,
  Composition,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { resolveEasing } from '../../kit/easing';
import { clamp01, lerp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['400', '600'], subsets: ['latin'] });

type Pan = KenBurnsProps['pan'];

const panFor = (pan: Pan, t: number): string => {
  const amp = 120 * t;
  if (pan === 'right') {
    return `translate(${-amp}px, 0px)`;
  }
  if (pan === 'left') {
    return `translate(${amp}px, 0px)`;
  }
  if (pan === 'up') {
    return `translate(0px, ${amp}px)`;
  }
  return `translate(0px, ${-amp}px)`;
};

const Frame = ({
  image,
  overlay,
  pan,
  zoom,
}: Pick<KenBurnsProps, 'image' | 'overlay' | 'pan' | 'zoom'>) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = clamp01(frame / Math.max(1, durationInFrames - 1));
  const scale = lerp(1.04, zoom, t);
  const transform = `${panFor(pan, t)} scale(${scale})`;
  return (
    <AbsoluteFill>
      {image.length > 0 ? (
        <Img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', transform }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            transform,
            background: `linear-gradient(135deg, ${overlay}, #1f2937 60%, #334155)`,
          }}
        />
      )}
      <AbsoluteFill
        style={{ background: `linear-gradient(0deg, ${overlay}ee 0%, transparent 55%)` }}
      />
    </AbsoluteFill>
  );
};

export const KenBurns = ({
  title,
  subtitle,
  image,
  background,
  overlay,
  color,
  pan,
  zoom,
  speed,
  easing,
}: KenBurnsProps) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  return (
    <AbsoluteFill style={{ background, fontFamily, overflow: 'hidden' }}>
      <Frame image={image} overlay={overlay} pan={pan} zoom={zoom} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: 120, gap: 16 }}>
        <div
          style={{
            color,
            fontSize: 110,
            fontWeight: 600,
            opacity: reveal,
            transform: `translateY(${(1 - reveal) * 40}px)`,
          }}
        >
          {title}
        </div>
        <div style={{ color, opacity: reveal * 0.8, fontSize: 42, fontWeight: 400 }}>
          {subtitle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const kenBurnsScene: SceneModule = {
  id: 'ken-burns',
  component: KenBurns,
  render: (key) => (
    <Composition
      key={key}
      id="ken-burns"
      component={KenBurns}
      schema={kenBurnsSchema}
      defaultProps={kenBurnsDefaults}
      durationInFrames={kenBurnsMeta.durationInFrames}
      fps={kenBurnsMeta.fps}
      width={kenBurnsMeta.width}
      height={kenBurnsMeta.height}
    />
  ),
};

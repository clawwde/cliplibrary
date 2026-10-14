import {
  type FlipCardProps,
  flipCardDefaults,
  flipCardMeta,
  flipCardSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Sora';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['600', '800'], subsets: ['latin'] });

export const FlipCard = ({
  title,
  subtitle,
  background,
  card,
  color,
  accent,
  axis,
  speed,
  easing,
}: FlipCardProps) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  const angle = (1 - p) * 92;
  const rotate = axis === 'y' ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)`;
  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1600,
      }}
    >
      <div
        style={{
          width: 960,
          height: 560,
          borderRadius: 36,
          background: card,
          border: `2px solid ${accent}`,
          boxShadow: `0 60px 120px rgba(0,0,0,0.45)`,
          transform: `${rotate} scale(${0.9 + p * 0.1})`,
          opacity: interpolate(p, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div style={{ color, fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>{title}</div>
        <div style={{ color: accent, fontSize: 36, fontWeight: 600, letterSpacing: 2 }}>
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const flipCardScene: SceneModule = {
  id: 'flip-card',
  component: FlipCard,
  render: (key) => (
    <Composition
      key={key}
      id="flip-card"
      component={FlipCard}
      schema={flipCardSchema}
      defaultProps={flipCardDefaults}
      durationInFrames={flipCardMeta.durationInFrames}
      fps={flipCardMeta.fps}
      width={flipCardMeta.width}
      height={flipCardMeta.height}
    />
  ),
};

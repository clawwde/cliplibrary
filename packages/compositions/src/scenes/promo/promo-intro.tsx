import {
  type PromoIntroProps,
  promoIntroDefaults,
  promoIntroMeta,
  promoIntroSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { bodyFont, displayFont } from '../../promo/fonts';
import { settle, smooth, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { FadeIn } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const RING = 2 * Math.PI * 38;

const Mark = ({ color, frame, size }: { color: string; frame: number; size: number }) => {
  const draw = tween(frame, [4, 40], [0, 1], smooth);
  const dot = tween(frame, [26, 46], [0, 1], settle);
  const angle = -Math.PI / 4 + (1 - dot) * Math.PI * 1.2;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={RING}
        strokeDashoffset={RING * (1 - draw)}
        transform="rotate(-90 50 50)"
      />
      <circle
        cx={50 + Math.cos(angle) * 38}
        cy={50 + Math.sin(angle) * 38}
        r={9 * dot}
        fill={color}
      />
    </svg>
  );
};

export const PromoIntro = ({
  eyebrow,
  brandName,
  tagline,
  showMark,
  markColor,
  wordmarkSize,
  pushIn,
  look,
  motion,
}: PromoIntroProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const scale = 1 + tween(raw, [0, durationInFrames], [0, pushIn], (t) => t);
  const letters = brandName.split('');
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      <AbsoluteFill
        style={{ alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})` }}
      >
        <FadeIn start={0} delay={2} style={{ marginBottom: 34 }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: look.muted,
            }}
          >
            {eyebrow}
          </div>
        </FadeIn>
        <div style={{ display: 'flex', alignItems: 'center', gap: wordmarkSize * 0.16 }}>
          {showMark ? <Mark color={markColor} frame={frame} size={wordmarkSize * 0.78} /> : null}
          <div
            style={{
              display: 'flex',
              fontFamily: displayFont,
              fontWeight: 600,
              fontSize: wordmarkSize,
              letterSpacing: '-0.055em',
              lineHeight: 1,
              color: look.ink,
            }}
          >
            {letters.map((letter, index) => {
              const reveal = tween(frame, [14 + index * 3, 40 + index * 3], [0, 1], settle);
              return (
                <span
                  key={`${index}:${letter}`}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 0.35 * wordmarkSize}px)`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
        <FadeIn start={44} style={{ marginTop: 34 }}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 34,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: look.muted,
            }}
          >
            {tagline}
          </div>
        </FadeIn>
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoIntroScene: SceneModule = {
  id: 'promo-intro',
  component: PromoIntro,
  render: (key) => (
    <Composition
      key={key}
      id={promoIntroMeta.id}
      component={PromoIntro}
      schema={promoIntroSchema}
      defaultProps={promoIntroDefaults}
      durationInFrames={promoIntroMeta.durationInFrames}
      fps={promoIntroMeta.fps}
      width={promoIntroMeta.width}
      height={promoIntroMeta.height}
    />
  ),
};

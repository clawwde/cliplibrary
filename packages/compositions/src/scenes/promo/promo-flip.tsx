import {
  type PromoFlipProps,
  promoFlipDefaults,
  promoFlipMeta,
  promoFlipSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { bodyFont } from '../../promo/fonts';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, TAU, track, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { Eyebrow, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const Copy = ({
  eyebrow,
  headline,
  highlight,
  start,
  end,
  look,
}: {
  eyebrow: string;
  headline: string;
  highlight: string;
  start: number;
  end?: number | undefined;
  look: PromoFlipProps['look'];
}) => (
  <div style={{ position: 'absolute', left: 150, top: 0, bottom: 0, width: 620 }}>
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 30,
      }}
    >
      <FadeIn start={start} end={end}>
        <Eyebrow text={eyebrow} color={look.muted} accent={look.accent} />
      </FadeIn>
      <Headline
        text={headline}
        highlight={highlight}
        size={92}
        color={look.ink}
        accent={look.accent}
        start={start + 4}
        end={end}
      />
    </div>
  </div>
);

export const PromoFlip = ({
  firstEyebrow,
  firstHeadline,
  secondEyebrow,
  secondHeadline,
  highlight,
  details,
  phone,
  phoneScale,
  turnAt,
  look,
  stage,
  motion,
}: PromoFlipProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const turn = Math.round(durationInFrames * turnAt);
  const rise = tween(frame, [0, 50], [0, 1], settle);
  const rotateY =
    tween(frame, [0, 50], [Math.PI + 2.4, Math.PI - 0.3], settle) +
    track(frame, [
      [50, 0],
      [turn - 18, 0.6],
      [turn + 30, Math.PI + 0.05],
      [durationInFrames, Math.PI + 0.52],
    ]);
  const y = (1 - rise) * -7.5 + Math.sin(frame / 30) * motion.float;
  const rotateX = 0.05 + (1 - rise) * 0.6;
  const scale = phoneScale * (0.85 + rise * 0.15) * tween(frame, [50, durationInFrames], [1, 1.05]);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      <Stage stage={stage}>
        <group position={[0, y, 0]} rotation={[rotateX, rotateY - TAU, 0.03]} scale={scale}>
          <PhoneModel phone={phone} reflections={stage.reflections} />
        </group>
      </Stage>
      <Copy
        eyebrow={firstEyebrow}
        headline={firstHeadline}
        highlight={highlight}
        start={16}
        end={turn - 22}
        look={look}
      />
      <Copy
        eyebrow={secondEyebrow}
        headline={secondHeadline}
        highlight={highlight}
        start={turn + 6}
        look={look}
      />
      <AbsoluteFill
        style={{ justifyContent: 'center', alignItems: 'flex-end', padding: '0 150px' }}
      >
        <div style={{ width: 380 }}>
          {details.map((detail, index) => (
            <FadeIn key={`${index}:${detail}`} start={30} delay={index * 6}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 22,
                  padding: '24px 0',
                  borderTop: index === 0 ? `1px solid ${look.ink}22` : undefined,
                  borderBottom: `1px solid ${look.ink}22`,
                  fontFamily: bodyFont,
                }}
              >
                <span style={{ fontSize: 16, color: look.muted, letterSpacing: '0.1em' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 28, color: look.ink, letterSpacing: '-0.015em' }}>
                  {detail}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoFlipScene: SceneModule = {
  id: 'promo-flip',
  component: PromoFlip,
  render: (key) => (
    <Composition
      key={key}
      id="promo-flip"
      component={PromoFlip}
      schema={promoFlipSchema}
      defaultProps={promoFlipDefaults}
      durationInFrames={promoFlipMeta.durationInFrames}
      fps={promoFlipMeta.fps}
      width={promoFlipMeta.width}
      height={promoFlipMeta.height}
    />
  ),
};

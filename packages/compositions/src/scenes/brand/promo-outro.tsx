import {
  type PromoOutroProps,
  promoOutroDefaults,
  promoOutroMeta,
  promoOutroSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { BrandMark } from '../../promo/brand-mark';
import { bodyFont, displayFont } from '../../promo/fonts';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { BodyCopy, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const StoreButton = ({
  caption,
  label,
  filled,
  ink,
  paper,
}: {
  caption: string;
  label: string;
  filled: boolean;
  ink: string;
  paper: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: 220,
      padding: '16px 34px',
      borderRadius: 999,
      background: filled ? ink : 'transparent',
      border: `1.5px solid ${filled ? ink : `${ink}40`}`,
      color: filled ? paper : ink,
      lineHeight: 1.1,
      textAlign: 'center',
    }}
  >
    <span style={{ fontFamily: bodyFont, fontSize: 15, opacity: 0.65 }}>{caption}</span>
    <span
      style={{ fontFamily: displayFont, fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }}
    >
      {label}
    </span>
  </div>
);

export const PromoOutro = ({
  brandName,
  showMark,
  markColor,
  headline,
  highlight,
  subline,
  primaryCaption,
  primaryLabel,
  secondaryCaption,
  secondaryLabel,
  url,
  showPhones,
  phones,
  phoneScale,
  look,
  stage,
  motion,
}: PromoOutroProps) => {
  const raw = useCurrentFrame();
  const frame = raw * motion.speed;
  const arrive = tween(frame, [4, 66], [0, 1], settle);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      {showPhones ? (
        <Stage stage={stage}>
          {phones.map((entry, index) => {
            const side = index === 0 ? -1 : 1;
            return (
              <group
                key={`${index}:${entry.screen}`}
                position={[
                  side * (5.3 + (1 - arrive) * 3.5),
                  (index === 0 ? -0.35 : 0.25) + Math.sin(frame / 26 + index) * motion.float,
                  -0.3,
                ]}
                rotation={[0.06, -side * (0.6 + (1 - arrive) * 0.7), side * -0.08]}
                scale={phoneScale}
              >
                <PhoneModel phone={entry} reflections={stage.reflections} />
              </group>
            );
          })}
        </Stage>
      ) : null}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 34 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {showMark ? <BrandMark color={markColor} frame={frame} size={64} start={10} /> : null}
          <FadeIn start={16}>
            <span
              style={{
                fontFamily: displayFont,
                fontSize: 54,
                fontWeight: 600,
                letterSpacing: '-0.05em',
                color: look.ink,
              }}
            >
              {brandName}
            </span>
          </FadeIn>
        </div>
        <Headline
          text={headline}
          highlight={highlight}
          size={104}
          color={look.ink}
          accent={look.accent}
          align="center"
          start={22}
        />
        <FadeIn start={38}>
          <BodyCopy text={subline} color={look.muted} width={900} align="center" size={32} />
        </FadeIn>
        <FadeIn start={48} style={{ display: 'flex', gap: 18, marginTop: 8 }}>
          <StoreButton
            caption={primaryCaption}
            label={primaryLabel}
            filled
            ink={look.ink}
            paper={look.background}
          />
          <StoreButton
            caption={secondaryCaption}
            label={secondaryLabel}
            filled={false}
            ink={look.ink}
            paper={look.background}
          />
        </FadeIn>
        <FadeIn start={60}>
          <div
            style={{
              fontFamily: bodyFont,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: look.muted,
            }}
          >
            {url}
          </div>
        </FadeIn>
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoOutroScene: SceneModule = {
  id: 'promo-outro',
  component: PromoOutro,
  render: (key) => (
    <Composition
      key={key}
      id="promo-outro"
      component={PromoOutro}
      schema={promoOutroSchema}
      defaultProps={promoOutroDefaults}
      durationInFrames={promoOutroMeta.durationInFrames}
      fps={promoOutroMeta.fps}
      width={promoOutroMeta.width}
      height={promoOutroMeta.height}
    />
  ),
};

import {
  type HeadlineRevealProps,
  headlineRevealDefaults,
  headlineRevealMeta,
  headlineRevealSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { displayFont, kineticFont } from '../../promo/fonts';
import { PromoLayer, placementFrame } from '../../promo/promo-layer';
import { tween } from '../../promo/timing';
import { BodyCopy, Eyebrow, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

export const HeadlineReveal = ({
  eyebrow,
  headline,
  highlight,
  body,
  size,
  weight,
  leadWeight,
  typeface,
  revealFrames,
  placement,
  veil,
  delay,
  look,
  motion,
}: HeadlineRevealProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const align = placement.horizontal;
  const veilOpacity = veil ? tween(frame, [delay, delay + 30], [0, 1]) : 0;
  return (
    <PromoLayer look={look} motion={motion}>
      {veil ? (
        <AbsoluteFill
          style={{
            opacity: veilOpacity,
            background: `radial-gradient(54% 48% at 50% 54%, ${look.background}f2 0%, ${look.background}d0 50%, ${look.background}00 100%)`,
          }}
        />
      ) : null}
      <div style={placementFrame(placement)}>
        <div
          style={{
            width: placement.width,
            display: 'flex',
            flexDirection: 'column',
            alignItems:
              align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
            gap: size * 0.3,
          }}
        >
          {eyebrow.length > 0 ? (
            <FadeIn start={delay}>
              <Eyebrow text={eyebrow} color={look.muted} accent={look.accent} />
            </FadeIn>
          ) : null}
          <Headline
            text={headline}
            highlight={highlight}
            size={size}
            weight={weight}
            leadWeight={leadWeight}
            duration={revealFrames}
            family={typeface === 'onest' ? kineticFont : displayFont}
            tracking={typeface === 'onest' ? -0.02 : -0.045}
            color={look.ink}
            accent={look.accent}
            align={align}
            start={delay + 6}
          />
          {body.length > 0 ? (
            <FadeIn start={delay + 30}>
              <BodyCopy
                text={body}
                color={look.muted}
                size={Math.max(20, size * 0.29)}
                width={Math.min(placement.width, align === 'center' ? 1000 : 640)}
                align={align}
              />
            </FadeIn>
          ) : null}
        </div>
      </div>
    </PromoLayer>
  );
};

export const headlineRevealScene: SceneModule = {
  id: 'headline-reveal',
  component: HeadlineReveal,
  render: (key) => (
    <Composition
      key={key}
      id="headline-reveal"
      component={HeadlineReveal}
      schema={headlineRevealSchema}
      defaultProps={headlineRevealDefaults}
      durationInFrames={headlineRevealMeta.durationInFrames}
      fps={headlineRevealMeta.fps}
      width={headlineRevealMeta.width}
      height={headlineRevealMeta.height}
    />
  ),
};

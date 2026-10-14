import {
  type FeatureCalloutsProps,
  featureCalloutsDefaults,
  featureCalloutsMeta,
  featureCalloutsSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { beatStart, SWAP_FRAMES } from '../../promo/beats';
import { bodyFont } from '../../promo/fonts';
import { PromoLayer } from '../../promo/promo-layer';
import { BodyCopy, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

export const FeatureCallouts = ({
  label,
  features,
  startSide,
  size,
  inset,
  look,
  motion,
}: FeatureCalloutsProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const count = features.length;
  const beatLength = durationInFrames / count;
  const first = startSide === 'left' ? 1 : -1;
  return (
    <PromoLayer look={look} motion={motion}>
      {features.map((feature, beat) => {
        const start = beat === 0 ? 6 : beatStart(beat, beatLength) + SWAP_FRAMES / 2 - 2;
        const end = beat < count - 1 ? beatStart(beat + 1, beatLength) - 6 : undefined;
        const onLeft = (beat % 2 === 0 ? first : -first) === 1;
        if (frame < start - 2 || (end !== undefined && frame > end + 30)) {
          return null;
        }
        return (
          <div
            key={`${beat}:${feature.title}`}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: onLeft ? inset : undefined,
              right: onLeft ? undefined : inset,
              width: 660,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: size * 0.27,
            }}
          >
            <FadeIn start={start} end={end}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 19,
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: look.muted,
                }}
              >
                <span style={{ color: look.accent }}>{String(beat + 1).padStart(2, '0')}</span>
                {`  /  ${label}`}
              </div>
            </FadeIn>
            <Headline
              text={feature.title}
              size={size}
              color={look.ink}
              accent={look.accent}
              start={start + 4}
              end={end}
            />
            <FadeIn start={start + 14} end={end}>
              <BodyCopy text={feature.body} color={look.muted} width={540} />
            </FadeIn>
          </div>
        );
      })}
    </PromoLayer>
  );
};

export const featureCalloutsScene: SceneModule = {
  id: 'feature-callouts',
  component: FeatureCallouts,
  render: (key) => (
    <Composition
      key={key}
      id="feature-callouts"
      component={FeatureCallouts}
      schema={featureCalloutsSchema}
      defaultProps={featureCalloutsDefaults}
      durationInFrames={featureCalloutsMeta.durationInFrames}
      fps={featureCalloutsMeta.fps}
      width={featureCalloutsMeta.width}
      height={featureCalloutsMeta.height}
    />
  ),
};

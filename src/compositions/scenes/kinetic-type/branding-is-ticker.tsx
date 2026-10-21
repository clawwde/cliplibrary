import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type BrandingIsTickerProps,
  brandingIsTickerDefaults,
  brandingIsTickerMeta,
  brandingIsTickerSchema,
} from '@/schemas';
import { BrandLabel, BrandMark } from '../../branding-ticker/brand-mark';
import { ContactCard } from '../../branding-ticker/contact-card';
import { tickerFont } from '../../branding-ticker/fonts';
import { tickerWords, WordTicker } from '../../branding-ticker/word-ticker';
import { PromoLayer } from '../../promo/promo-layer';
import { smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const irisRadius = (x: number, y: number, width: number, height: number): number =>
  Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) * 1.01;

const BrandingIsTicker = ({
  copy,
  type,
  underline,
  ticker,
  brand,
  card,
  look,
  motion,
}: BrandingIsTickerProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { width, height } = useVideoConfig();
  const cardStart = tickerWords(copy.words).length * ticker.stepFrames + card.delay;
  const cardFrame = frame - cardStart;
  const showCard = card.show && cardFrame >= 0;
  const irisDone = cardFrame >= card.irisFrames;
  const radius = tween(
    cardFrame,
    [0, Math.max(1, card.irisFrames)],
    [0, irisRadius(brand.x, brand.y, width, height)],
    smooth,
  );
  const markDraw = tween(frame, [0, Math.max(1, brand.drawFrames)], [0, 1], smooth);
  return (
    <PromoLayer look={look} motion={motion}>
      {showCard && irisDone ? null : (
        <AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              left: brand.x - brand.size / 2,
              top: brand.y - brand.size / 2,
              width: brand.size,
            }}
          >
            <BrandMark size={brand.size} disc={brand.mark} wave={brand.cutout} draw={markDraw} />
            <div style={{ marginTop: brand.size * 0.16 }}>
              <BrandLabel
                kicker={brand.kicker}
                name={brand.name}
                size={brand.labelSize}
                color={brand.label}
                font={tickerFont}
              />
            </div>
          </div>
          <WordTicker
            lead={copy.lead}
            words={copy.words}
            separator={copy.separator}
            type={type}
            underline={underline}
            timing={ticker}
            frame={frame}
          />
        </AbsoluteFill>
      )}
      {showCard ? (
        <AbsoluteFill
          style={
            irisDone
              ? undefined
              : { clipPath: `circle(${radius.toFixed(2)}px at ${brand.x}px ${brand.y}px)` }
          }
        >
          <ContactCard card={card} kicker={brand.kicker} name={brand.name} frame={cardFrame} />
        </AbsoluteFill>
      ) : null}
    </PromoLayer>
  );
};

export const brandingIsTickerScene: SceneModule = {
  id: 'branding-is-ticker',
  component: BrandingIsTicker,
  render: (key) => (
    <Composition
      key={key}
      id="branding-is-ticker"
      component={BrandingIsTicker}
      schema={brandingIsTickerSchema}
      defaultProps={brandingIsTickerDefaults}
      durationInFrames={brandingIsTickerMeta.durationInFrames}
      fps={brandingIsTickerMeta.fps}
      width={brandingIsTickerMeta.width}
      height={brandingIsTickerMeta.height}
    />
  ),
};

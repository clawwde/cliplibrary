import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
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
import type { SceneModule } from '../../scene-module';

const BrandingIsTicker = ({
  copy,
  type,
  ticker,
  brand,
  card,
  look,
  motion,
}: BrandingIsTickerProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const cardStart = tickerWords(copy.words).length * ticker.stepFrames + card.delay;
  const showCard = card.show && frame >= cardStart;
  return (
    <PromoLayer look={look} motion={motion}>
      {showCard ? (
        <ContactCard
          card={card}
          kicker={brand.kicker}
          name={brand.name}
          frame={frame - cardStart}
        />
      ) : (
        <AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              left: brand.x - brand.size / 2,
              top: brand.y - brand.size / 2,
              width: brand.size,
            }}
          >
            <BrandMark size={brand.size} disc={brand.mark} wave={brand.cutout} />
            <div style={{ marginLeft: brand.size * 0.03, marginTop: brand.size * 0.03 }}>
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
            timing={ticker}
            frame={frame}
          />
        </AbsoluteFill>
      )}
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

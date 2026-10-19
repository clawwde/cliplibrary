import { AbsoluteFill, Composition, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type ProductCard,
  type ProductCardsProps,
  productCardsDefaults,
  productCardsMeta,
  productCardsSchema,
} from '@/schemas';
import { PickerLayer } from '../../pickers/picker-layer';
import { ProductGlyph } from '../../pickers/product-cards-icons';
import { pixelProgress, stepState, wrapIndex } from '../../pickers/steps';
import { pickerFonts } from '../../promo/fonts';
import { pixelTween, settle, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const smoothstep = (value: number): number => {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
};

const mix = (color: string, amount: number): string =>
  `color-mix(in oklab, ${color} ${(amount * 100).toFixed(1)}%, transparent)`;

const Tile = ({ product, tile }: { product: ProductCard; tile: ProductCardsProps['tile'] }) => (
  <div
    style={{
      width: tile.size,
      height: tile.size,
      flexShrink: 0,
      borderRadius: tile.radius,
      background: tile.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 6px 16px rgba(80, 20, 60, 0.12)',
    }}
  >
    {product.image === '' ? (
      <ProductGlyph
        icon={product.icon}
        ink={tile.ink}
        tint={product.tint}
        size={Math.round(tile.size * 0.74)}
      />
    ) : (
      <Img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    )}
  </div>
);

const ProductCards = ({
  cards,
  font,
  type,
  card,
  tile,
  layout,
  entrance,
  timing,
  aura,
  look,
  motion,
}: ProductCardsProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { width, height } = useVideoConfig();
  const pitch = Math.round(layout.pitch);
  const state = stepState(frame, timing);
  const progress = pixelProgress(state, timing, pitch) / pitch;
  const family = pickerFonts[font];
  const centerX = Math.round(width / 2 + layout.x - card.width / 2);
  const centerY = Math.round(height / 2 + layout.y - card.height / 2);
  const first = Math.floor(progress) - 2;
  const slots = Array.from({ length: 6 }, (_, offset) => first + offset);
  const padding = Math.max(0, (card.height - tile.size) / 2);
  return (
    <PickerLayer look={look} aura={aura} motion={motion}>
      <AbsoluteFill>
        {slots.map((slot) => {
          const outside = slot < 0 || slot >= cards.length;
          const product = cards[wrapIndex(slot, cards.length)];
          if (product === undefined || (outside && !layout.loop)) {
            return null;
          }
          const offset = slot - progress;
          const distance = Math.abs(offset);
          const near = smoothstep(Math.min(1, distance));
          const order = Math.abs(slot - timing.start);
          const start = order * entrance.stagger;
          const appear = tween(frame, [start, start + entrance.frames * 0.8], [0, 1], settle);
          const rise = pixelTween(
            frame,
            [start, start + entrance.frames],
            [entrance.rise, 0],
            settle,
          );
          const fade = 1 - tween(distance, [1.3, 2.1], [0, 1], smooth);
          const opacity = appear * fade * (1 - (1 - layout.sideOpacity) * near);
          if (opacity <= 0.001) {
            return null;
          }
          const scale =
            1 - (1 - layout.sideScale) * near - 0.12 * Math.max(0, Math.min(1, distance - 1));
          const y = Math.round(centerY + offset * pitch + rise);
          return (
            <div
              key={slot}
              style={{
                position: 'absolute',
                left: centerX,
                top: y,
                width: card.width,
                height: card.height,
                opacity,
                zIndex: 100 - Math.round(distance * 10),
                transform: `scale(${scale.toFixed(4)})`,
                display: 'flex',
                alignItems: 'center',
                gap: padding * 1.3,
                padding: `0 ${padding}px`,
                boxSizing: 'border-box',
                borderRadius: card.radius,
                background: `linear-gradient(180deg, ${mix(card.fill, card.fillOpacity * 1.5)}, ${mix(card.fill, card.fillOpacity)})`,
                border: `3px solid ${mix(card.border, 0.72)}`,
                backdropFilter: card.blur > 0 ? `blur(${card.blur}px)` : undefined,
                boxShadow: `0 0 14px ${mix(card.border, 0.45)}, inset 0 0 26px ${mix(card.border, 0.32)}, 0 26px 54px rgba(120, 30, 90, ${(card.shadow * 0.35).toFixed(3)})`,
              }}
            >
              <Tile product={product} tile={tile} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: type.description * 0.35,
                  color: type.ink,
                  fontFamily: family,
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}
              >
                <div
                  style={{ fontSize: type.title, fontWeight: type.titleWeight, lineHeight: 1.05 }}
                >
                  {product.title}
                </div>
                <div
                  style={{
                    fontSize: type.description,
                    fontWeight: 300,
                    lineHeight: 1.2,
                    opacity: 0.88,
                  }}
                >
                  {product.description}
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </PickerLayer>
  );
};

export const productCardsScene: SceneModule = {
  id: 'product-cards',
  component: ProductCards,
  render: (key) => (
    <Composition
      key={key}
      id="product-cards"
      component={ProductCards}
      schema={productCardsSchema}
      defaultProps={productCardsDefaults}
      durationInFrames={productCardsMeta.durationInFrames}
      fps={productCardsMeta.fps}
      width={productCardsMeta.width}
      height={productCardsMeta.height}
    />
  ),
};

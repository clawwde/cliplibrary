import {
  type DetailListProps,
  detailListDefaults,
  detailListMeta,
  detailListSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import { bodyFont } from '../../promo/fonts';
import { PromoLayer, placementFrame } from '../../promo/promo-layer';
import { FadeIn } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

export const DetailList = ({
  items,
  numbered,
  size,
  placement,
  delay,
  stagger,
  look,
  motion,
}: DetailListProps) => (
  <PromoLayer look={look} motion={motion}>
    <div style={placementFrame(placement)}>
      <div style={{ width: placement.width }}>
        {items.map((item, index) => (
          <FadeIn key={`${index}:${item}`} start={delay} delay={index * stagger}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: size * 0.8,
                padding: `${size * 0.86}px 0`,
                borderTop: index === 0 ? `1px solid ${look.ink}22` : undefined,
                borderBottom: `1px solid ${look.ink}22`,
                fontFamily: bodyFont,
              }}
            >
              {numbered ? (
                <span
                  style={{
                    display: 'inline-block',
                    minWidth: size * 0.95,
                    fontSize: size * 0.57,
                    fontVariantNumeric: 'tabular-nums',
                    color: look.muted,
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              ) : null}
              <span style={{ fontSize: size, color: look.ink, letterSpacing: '-0.015em' }}>
                {item}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </PromoLayer>
);

export const detailListScene: SceneModule = {
  id: 'detail-list',
  component: DetailList,
  render: (key) => (
    <Composition
      key={key}
      id="detail-list"
      component={DetailList}
      schema={detailListSchema}
      defaultProps={detailListDefaults}
      durationInFrames={detailListMeta.durationInFrames}
      fps={detailListMeta.fps}
      width={detailListMeta.width}
      height={detailListMeta.height}
    />
  ),
};

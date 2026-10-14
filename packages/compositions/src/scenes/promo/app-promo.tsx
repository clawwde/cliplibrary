import {
  APP_PROMO_SEQUENCE,
  type AppPromoProps,
  appPromoDefaults,
  appPromoMeta,
  appPromoSchema,
  type ClipId,
} from '@cliplibrary/schemas';
import type { FC } from 'react';
import { AbsoluteFill, Composition, Sequence } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { PromoDuo } from './promo-duo';
import { PromoFeatures } from './promo-features';
import { PromoFlip } from './promo-flip';
import { PromoHero } from './promo-hero';
import { PromoIntro } from './promo-intro';
import { PromoOutro } from './promo-outro';
import { PromoScroll } from './promo-scroll';
import { PromoTrio } from './promo-trio';
import { PromoWall } from './promo-wall';

type AnyScene = FC<Record<string, unknown>>;

const SCENE_COMPONENTS: Partial<Record<ClipId, AnyScene>> = {
  'promo-intro': PromoIntro as unknown as AnyScene,
  'promo-hero': PromoHero as unknown as AnyScene,
  'promo-flip': PromoFlip as unknown as AnyScene,
  'promo-trio': PromoTrio as unknown as AnyScene,
  'promo-features': PromoFeatures as unknown as AnyScene,
  'promo-scroll': PromoScroll as unknown as AnyScene,
  'promo-wall': PromoWall as unknown as AnyScene,
  'promo-duo': PromoDuo as unknown as AnyScene,
  'promo-outro': PromoOutro as unknown as AnyScene,
};

const BRANDED: ReadonlySet<ClipId> = new Set(['promo-intro', 'promo-outro']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const withFinish = (value: unknown, finish: string): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => withFinish(item, finish));
  }
  if (!isRecord(value)) {
    return value;
  }
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    next[key] = key === 'finish' && typeof child === 'string' ? finish : withFinish(child, finish);
  }
  return next;
};

const brandScene = (
  clipId: ClipId,
  props: Record<string, unknown>,
  brand: AppPromoProps,
): Record<string, unknown> => {
  const { look: sceneLook } = props;
  const look = isRecord(sceneLook) ? { ...sceneLook, accent: brand.accent } : sceneLook;
  const branded: Record<string, unknown> = BRANDED.has(clipId)
    ? { ...props, look, brandName: brand.brandName, markColor: brand.accent }
    : { ...props, look };
  return brand.useFinishEverywhere
    ? (withFinish(branded, brand.finish) as Record<string, unknown>)
    : branded;
};

export const AppPromo = (brand: AppPromoProps) => (
  <AbsoluteFill style={{ background: '#0a0a0a' }}>
    {[1, 0].flatMap((lane) =>
      APP_PROMO_SEQUENCE.filter((entry) => entry.lane === lane).map((entry) => {
        const Scene = SCENE_COMPONENTS[entry.clipId];
        if (Scene === undefined) {
          return null;
        }
        return (
          <Sequence
            key={`${entry.clipId}:${entry.from}`}
            from={entry.from}
            durationInFrames={entry.durationInFrames}
            name={entry.clipId}
          >
            <Scene {...brandScene(entry.clipId, entry.props, brand)} />
          </Sequence>
        );
      }),
    )}
  </AbsoluteFill>
);

export const appPromoScene: SceneModule = {
  id: 'app-promo',
  component: AppPromo,
  render: (key) => (
    <Composition
      key={key}
      id="app-promo"
      component={AppPromo}
      schema={appPromoSchema}
      defaultProps={appPromoDefaults}
      durationInFrames={appPromoMeta.durationInFrames}
      fps={appPromoMeta.fps}
      width={appPromoMeta.width}
      height={appPromoMeta.height}
    />
  ),
};

import {
  APP_PROMO_SEQUENCE,
  type AppPromoProps,
  appPromoDefaults,
  appPromoMeta,
  appPromoSchema,
  type ClipId,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { isRecord, SequencePlayer, withFinish } from './sequence-player';

const BRANDED: ReadonlySet<ClipId> = new Set(['brand-reveal', 'cta-end-card']);

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
  <SequencePlayer
    sequence={APP_PROMO_SEQUENCE}
    transform={(clipId, props) => brandScene(clipId, props, brand)}
  />
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

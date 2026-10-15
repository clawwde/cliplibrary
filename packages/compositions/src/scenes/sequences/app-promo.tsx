import {
  APP_PROMO_SEQUENCE,
  type AppPromoProps,
  appPromoDefaults,
  appPromoMeta,
  appPromoSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { SequenceLayers } from './sequence-layers';

export const AppPromo = (brand: AppPromoProps) => (
  <SequenceLayers sequence={APP_PROMO_SEQUENCE} brand={brand} />
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

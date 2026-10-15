import {
  APP_PROMO_SHORT_SEQUENCE,
  type AppPromoShortProps,
  appPromoShortDefaults,
  appPromoShortMeta,
  appPromoShortSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { SequencePlayer } from './sequence-player';

export const AppPromoShort = (brand: AppPromoShortProps) => (
  <SequencePlayer sequence={APP_PROMO_SHORT_SEQUENCE} brand={brand} />
);

export const appPromoShortScene: SceneModule = {
  id: 'app-promo-short',
  component: AppPromoShort,
  render: (key) => (
    <Composition
      key={key}
      id="app-promo-short"
      component={AppPromoShort}
      schema={appPromoShortSchema}
      defaultProps={appPromoShortDefaults}
      durationInFrames={appPromoShortMeta.durationInFrames}
      fps={appPromoShortMeta.fps}
      width={appPromoShortMeta.width}
      height={appPromoShortMeta.height}
    />
  ),
};

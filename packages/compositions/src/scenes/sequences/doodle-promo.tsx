import {
  DOODLE_PROMO_SEQUENCE,
  type DoodlePromoProps,
  doodlePromoDefaults,
  doodlePromoMeta,
  doodlePromoSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { SequenceLayers } from './sequence-layers';

export const DoodlePromo = (brand: DoodlePromoProps) => (
  <SequenceLayers sequence={DOODLE_PROMO_SEQUENCE} brand={brand} />
);

export const doodlePromoScene: SceneModule = {
  id: 'doodle-promo',
  component: DoodlePromo,
  render: (key) => (
    <Composition
      key={key}
      id="doodle-promo"
      component={DoodlePromo}
      schema={doodlePromoSchema}
      defaultProps={doodlePromoDefaults}
      durationInFrames={doodlePromoMeta.durationInFrames}
      fps={doodlePromoMeta.fps}
      width={doodlePromoMeta.width}
      height={doodlePromoMeta.height}
    />
  ),
};

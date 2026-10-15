import type { ClipId } from '../../clip-props';
import type { ClipModule } from '../../registry';
import type { ClipSequence } from '../../sequence';
import { APP_PROMO_SEQUENCE, appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import {
  DOODLE_PROMO_SEQUENCE,
  doodlePromoDefaults,
  doodlePromoMeta,
  doodlePromoSchema,
} from './doodle-promo';
import {
  KINETIC_PROMO_SEQUENCE,
  kineticPromoDefaults,
  kineticPromoMeta,
  kineticPromoSchema,
} from './kinetic-promo';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
  {
    id: 'doodle-promo',
    schema: doodlePromoSchema,
    defaults: doodlePromoDefaults,
    meta: doodlePromoMeta,
  },
  {
    id: 'kinetic-promo',
    schema: kineticPromoSchema,
    defaults: kineticPromoDefaults,
    meta: kineticPromoMeta,
  },
];

export const CLIP_SEQUENCES: Partial<Record<ClipId, ClipSequence>> = {
  'app-promo': APP_PROMO_SEQUENCE,
  'doodle-promo': DOODLE_PROMO_SEQUENCE,
  'kinetic-promo': KINETIC_PROMO_SEQUENCE,
};

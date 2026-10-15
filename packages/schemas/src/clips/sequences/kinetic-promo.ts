import { z } from 'zod';
import { zColor } from '../../control';
import { defaultMotion, kineticLook, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { type ClipSequence, sequenceLength } from '../../sequence';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { filmDustDefaults } from '../overlays/film-dust';
import { entry, KINETIC_ACCENT, KINETIC_PROMO_TRACKS } from './kinetic/entry';
import { PLAN_ENTRIES, PROMO_END } from './kinetic/plan';

export { KINETIC_PROMO_TRACKS };

export const KINETIC_PROMO_SEQUENCE: ClipSequence = {
  tracks: KINETIC_PROMO_TRACKS,
  entries: [
    entry('studio-backdrop', 'Backdrop', [0, PROMO_END], studioBackdropDefaults, {
      look: kineticLook(KINETIC_ACCENT),
      sweep: 0,
      motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
    }),
    entry('film-dust', 'Overlays', [0, PROMO_END], filmDustDefaults, {
      motion: defaultMotion({ exit: 'fade', exitFrames: 12 }),
    }),
    ...PLAN_ENTRIES,
  ],
};

const sequenceEnd = sequenceLength(KINETIC_PROMO_SEQUENCE);

export const kineticPromoSchema = z.object({
  accent: zColor(),
});

export type KineticPromoProps = z.infer<typeof kineticPromoSchema>;

export const kineticPromoDefaults: KineticPromoProps = {
  accent: KINETIC_ACCENT,
};

export const kineticPromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'kinetic-promo',
  title: 'Kinetic Promo',
  description:
    'A black and white kinetic type film: sixteen snappy word beats, a four-way grid that replays them, and a glowing close.',
  category: 'sequences',
  tags: ['kinetic', 'headline', 'text'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/sequences/kinetic-promo.tsx',
  durationInFrames: sequenceEnd,
  posterFrame: 230,
};

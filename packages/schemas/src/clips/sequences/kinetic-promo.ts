import { z } from 'zod';
import { zColor } from '../../control';
import {
  defaultMotion,
  kineticLook,
  PHONE_FINISHES,
  type PhoneFinish,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { type ClipSequence, sequenceLength } from '../../sequence';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { filmDustDefaults } from '../overlays/film-dust';
import { entry, KINETIC_ACCENT, KINETIC_PROMO_TRACKS } from './kinetic/entry';
import { OPENING_ENTRIES } from './kinetic/opening';
import { CLOSING_ENTRIES, RECAP_ENTRIES } from './kinetic/recap';

export { KINETIC_PROMO_TRACKS };

const PROMO_END = 2580;

export const KINETIC_PROMO_SEQUENCE: ClipSequence = {
  tracks: KINETIC_PROMO_TRACKS,
  entries: [
    entry('studio-backdrop', 'Backdrop', [0, PROMO_END], studioBackdropDefaults, {
      look: kineticLook(KINETIC_ACCENT),
      sweep: 6,
      motion: defaultMotion({ exit: 'fade', exitFrames: 24 }),
    }),
    entry('film-dust', 'Overlays', [0, PROMO_END], filmDustDefaults, {
      motion: defaultMotion({ exit: 'fade', exitFrames: 24 }),
    }),
    ...OPENING_ENTRIES,
    ...RECAP_ENTRIES,
    ...CLOSING_ENTRIES,
  ],
};

const sequenceEnd = sequenceLength(KINETIC_PROMO_SEQUENCE);

export const kineticPromoSchema = z.object({
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type KineticPromoProps = z.infer<typeof kineticPromoSchema>;

export const kineticPromoDefaults: KineticPromoProps = {
  accent: KINETIC_ACCENT,
  finish: 'black' satisfies PhoneFinish,
  useFinishEverywhere: true,
};

export const kineticPromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'kinetic-promo',
  title: 'Kinetic Promo',
  description:
    'A black and white kinetic type film: rhythmic word beats, a four-way split recap with phones, and a glowing close.',
  category: 'sequences',
  tags: ['kinetic', 'headline', 'phone'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/sequences/kinetic-promo.tsx',
  durationInFrames: sequenceEnd,
  posterFrame: 260,
};

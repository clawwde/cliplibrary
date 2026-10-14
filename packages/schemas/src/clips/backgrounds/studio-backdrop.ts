import { z } from 'zod';
import { zSlider } from '../../control';
import { defaultMotion, lightLook, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const studioBackdropSchema = z.object({
  focusX: zSlider({ min: 0, max: 100 }),
  focusY: zSlider({ min: 0, max: 100 }),
  sweep: zSlider({ min: 0, max: 40 }),
  look: lookSchema,
  motion: motionSchema,
});

export type StudioBackdropProps = z.infer<typeof studioBackdropSchema>;

export const studioBackdropDefaults: StudioBackdropProps = {
  focusX: 50,
  focusY: 46,
  sweep: 8,
  look: lightLook(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const studioBackdropMeta: ClipMeta = {
  ...promoMeta,
  id: 'studio-backdrop',
  title: 'Studio Backdrop',
  description: 'A soft seamless studio gradient with a slowly sweeping spotlight and fine grain.',
  category: 'backgrounds',
  tags: ['gradient', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/backgrounds/studio-backdrop.tsx',
  durationInFrames: 150,
  posterFrame: 75,
};

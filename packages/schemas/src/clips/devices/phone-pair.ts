import { z } from 'zod';
import { zSlider } from '../../control';
import {
  darkLook,
  defaultMotion,
  defaultStage,
  lookSchema,
  motionSchema,
  phone,
  phoneSchema,
  position,
  positionSchema,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const phonePairSchema = z.object({
  phones: z.array(phoneSchema).length(2),
  position: positionSchema,
  scale: zSlider({ min: 0.4, max: 2.2, step: 0.01 }),
  gap: zSlider({ min: 0.4, max: 6.5, step: 0.05 }),
  angle: zSlider({ min: 0, max: 0.9, step: 0.01 }),
  stagger: zSlider({ min: -0.6, max: 0.6, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PhonePairProps = z.infer<typeof phonePairSchema>;

export const phonePairDefaults: PhonePairProps = {
  phones: [phone('music', 'black'), phone('map', 'blue')],
  position: position(0, 0, 0),
  scale: 1.18,
  gap: 1.1,
  angle: 0.34,
  stagger: 0.3,
  look: darkLook(),
  stage: defaultStage({ cameraDistance: 13, keyLight: 1.4, shadow: 0.45 }),
  motion: defaultMotion({ enter: 'fade', enterFrames: 24, exit: 'fade', exitFrames: 16 }),
};

export const phonePairMeta: ClipMeta = {
  ...promoMeta,
  id: 'phone-pair',
  title: 'Phone Pair',
  description: 'Two phones slide in from opposite sides and settle facing each other.',
  category: 'devices',
  tags: ['3d', 'phone'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/devices/phone-pair.tsx',
  durationInFrames: 135,
  posterFrame: 100,
};

import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  lightLook,
  lookSchema,
  motionSchema,
  placement,
  placementSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const detailListSchema = z.object({
  items: z.array(z.string()).min(1).max(6),
  numbered: z.boolean(),
  size: zSlider({ min: 16, max: 64 }),
  placement: placementSchema,
  delay: zSlider({ min: 0, max: 90 }),
  stagger: zSlider({ min: 0, max: 20 }),
  look: lookSchema,
  motion: motionSchema,
});

export type DetailListProps = z.infer<typeof detailListSchema>;

export const detailListDefaults: DetailListProps = {
  items: ['Clean typography', 'Light and dark', 'Pixel perfect'],
  numbered: true,
  size: 28,
  placement: placement('right', 'center', { width: 380, insetX: 150 }),
  delay: 14,
  stagger: 6,
  look: lightLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const detailListMeta: ClipMeta = {
  ...promoMeta,
  id: 'detail-list',
  title: 'Detail List',
  description: 'A short numbered list fades in line by line between hairline dividers.',
  category: 'typography',
  tags: ['list', 'text', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/typography/detail-list.tsx',
  durationInFrames: 150,
  posterFrame: 90,
};

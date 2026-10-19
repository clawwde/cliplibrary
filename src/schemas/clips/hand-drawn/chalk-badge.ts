import { z } from 'zod';
import {
  badgeTimingSchema,
  CONNECTOR_SET,
  chalkboardLook,
  chalkSchema,
  connectorBadge,
  connectorBadgeSchema,
  connectorChalk,
} from '../../connector-common';
import { zColor, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const chalkBadgeSchema = z.object({
  badge: connectorBadgeSchema,
  x: zSlider({ min: 0, max: 100, step: 0.5 }),
  y: zSlider({ min: 0, max: 100, step: 0.5 }),
  scale: zSlider({ min: 0.3, max: 2.5, step: 0.01 }),
  delay: zSlider({ min: 0, max: 120 }),
  timing: badgeTimingSchema,
  caption: z.string(),
  captionSize: zSlider({ min: 12, max: 60 }),
  captionColor: zColor(),
  captionFrames: zSlider({ min: 0.25, max: 4, step: 0.05 }),
  chalk: chalkSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type ChalkBadgeProps = z.infer<typeof chalkBadgeSchema>;

export const chalkBadgeDefaults: ChalkBadgeProps = {
  badge: CONNECTOR_SET[0] ?? connectorBadge('script-swash', 'and'),
  x: 50,
  y: 50,
  scale: 1.2,
  delay: 4,
  timing: { drawFrames: 30, eraseAt: 62, eraseFrames: 22 },
  caption: 'EDIT ANY WORD  /  ANY COLOR',
  captionSize: 24,
  captionColor: '#f7f3ea',
  captionFrames: 0.6,
  chalk: connectorChalk(),
  look: chalkboardLook(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0, float: 0 }),
};

export const chalkBadgeMeta: ClipMeta = {
  ...promoMeta,
  id: 'chalk-badge',
  title: 'Chalk Badge',
  description:
    'One hand-drawn connector badge sketches itself onto a chalkboard grid, holds, then wipes away stroke by stroke.',
  category: 'hand-drawn',
  tags: ['badge', 'chalkboard', 'doodle', 'draw', 'handwriting'],
  theme: 'dark',
  source: 'src/compositions/scenes/hand-drawn/chalk-badge.tsx',
  durationInFrames: 90,
  posterFrame: 44,
};

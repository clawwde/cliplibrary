import { z } from 'zod';
import {
  CONNECTOR_SET,
  chalkboardLook,
  chalkSchema,
  connectorBadgeSchema,
  connectorChalk,
} from '../../connector-common';
import { zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { chunkyLineSchema, chunkyTypeStackDefaults } from '../kinetic-type/chunky-type-stack';

export const chalkBadgesReelSchema = z.object({
  title: z.object({
    show: z.boolean(),
    left: z.string(),
    right: z.string(),
    frames: zSlider({ min: 60, max: 300 }),
  }),
  grid: z.object({
    show: z.boolean(),
    frames: zSlider({ min: 90, max: 400 }),
  }),
  badges: z.array(connectorBadgeSchema).min(1).max(12),
  soloFrames: zSlider({ min: 40, max: 180 }),
  soloScale: zSlider({ min: 0.4, max: 2.2, step: 0.01 }),
  caption: z.string(),
  outro: z.object({
    show: z.boolean(),
    lines: z.array(chunkyLineSchema).min(1).max(8),
    endTag: z.string(),
    frames: zSlider({ min: 120, max: 400 }),
  }),
  overlap: zSlider({ min: 0, max: 30 }),
  chalk: chalkSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type ChalkBadgesReelProps = z.infer<typeof chalkBadgesReelSchema>;

export const chalkBadgesReelDefaults: ChalkBadgesReelProps = {
  title: { show: true, left: 'Linkers', right: 'Joiners', frames: 112 },
  grid: { show: true, frames: 200 },
  badges: CONNECTOR_SET,
  soloFrames: 68,
  soloScale: 1.2,
  caption: 'EDIT ANY WORD  /  ANY COLOR',
  outro: {
    show: true,
    lines: chunkyTypeStackDefaults.lines,
    endTag: chunkyTypeStackDefaults.endTag,
    frames: 222,
  },
  overlap: 6,
  chalk: connectorChalk(),
  look: chalkboardLook(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0, float: 0 }),
};

export const chalkBadgesReelMeta: ClipMeta = {
  ...promoMeta,
  id: 'chalk-badges-reel',
  title: 'Chalk Badges Reel',
  description:
    'A chalkboard showcase: a script title, a full grid of connector badges, each badge solo, then a chunky type outro.',
  category: 'hand-drawn',
  tags: ['badge', 'chalkboard', 'grid', 'handwriting', 'kinetic'],
  theme: 'dark',
  source: 'src/compositions/scenes/hand-drawn/chalk-badges-reel.tsx',
  durationInFrames: 1326,
  posterFrame: 210,
};

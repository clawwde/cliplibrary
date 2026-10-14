import { z } from 'zod';
import { zColor } from '../../control';
import type { ClipMeta } from '../../registry';

export const SPLIT_FLAP_COLUMNS = 12;

export const splitFlapSchema = z.object({
  header: z.string(),
  headerColor: zColor(),
  rows: z
    .array(z.object({ text: z.string().max(SPLIT_FLAP_COLUMNS), color: zColor() }))
    .min(1)
    .max(4),
});

export type SplitFlapProps = z.infer<typeof splitFlapSchema>;

export const splitFlapDefaults: SplitFlapProps = {
  header: 'DEPARTURES',
  headerColor: '#ffb300',
  rows: [
    { text: 'MOTION THAT', color: '#f4f1ea' },
    { text: 'MOVES PEOPLE', color: '#f4f1ea' },
    { text: 'BOARDING NOW', color: '#ffb300' },
  ],
};

export const splitFlapMeta: ClipMeta = {
  id: 'split-flap',
  title: 'Split Flap',
  description:
    'An airport-style split-flap board where every cell flips through letters, staggered by row and column, until the message settles.',
  category: 'typography',
  tags: ['text', 'kinetic', 'retro'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/split-flap.tsx',
  durationInFrames: 150,
  posterFrame: 140,
  fps: 30,
  width: 1920,
  height: 1080,
};

import { z } from 'zod';
import { zColor, zMultiline } from '../../control';
import type { ClipMeta } from '../../registry';

export const slicedHeadlineSchema = z.object({
  lead: z.string(),
  accentWord: z.string(),
  secondLine: z.string(),
  band: zMultiline(),
  badge: zMultiline(),
  background: zColor(),
  text: zColor(),
  accent: zColor(),
});

export type SlicedHeadlineProps = z.infer<typeof slicedHeadlineSchema>;

export const slicedHeadlineDefaults: SlicedHeadlineProps = {
  lead: 'Made ',
  accentWord: 'slowly.',
  secondLine: 'Shipped fast.',
  band: 'CRAFT  ◆  MOTION  ◆  DETAIL  ◆  TASTE  ◆  ',
  badge: 'MADE WITH CARE • MADE WITH CARE • ',
  background: '#10281f',
  text: '#f1e9d6',
  accent: '#ff6b2c',
};

export const slicedHeadlineMeta: ClipMeta = {
  id: 'sliced-headline',
  title: 'Sliced Headline',
  description:
    'A serif headline arrives as horizontal slices flying in from both sides and snapping into alignment, with a hand-drawn underline and scrolling bands.',
  category: 'text',
  source: 'packages/compositions/src/scenes/text/sliced-headline.tsx',
  durationInFrames: 180,
  posterFrame: 150,
  fps: 30,
  width: 1920,
  height: 1080,
};

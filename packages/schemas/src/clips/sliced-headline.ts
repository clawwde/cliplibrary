import { z } from 'zod';
import { zColor, zMultiline } from '../control';

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

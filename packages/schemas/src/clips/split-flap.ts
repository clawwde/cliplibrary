import { z } from 'zod';
import { zColor } from '../control';

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

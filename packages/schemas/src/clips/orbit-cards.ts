import { z } from 'zod';
import { zColor } from '../control';

export const orbitCardsSchema = z.object({
  headline: z.string(),
  background: zColor(),
  cards: z.array(z.object({ title: z.string(), value: z.string(), color: zColor() })).length(8),
});

export type OrbitCardsProps = z.infer<typeof orbitCardsSchema>;

export const orbitCardsDefaults: OrbitCardsProps = {
  headline: 'Every number, in orbit.',
  background: '#07080c',
  cards: [
    { title: 'Revenue', value: '$128k', color: '#7c5cff' },
    { title: 'Signups', value: '4,210', color: '#2dd4bf' },
    { title: 'Latency', value: '42ms', color: '#fbbf24' },
    { title: 'Retention', value: '91%', color: '#fb7185' },
    { title: 'Uptime', value: '99.99', color: '#38bdf8' },
    { title: 'Tickets', value: '17', color: '#a3e635' },
    { title: 'NPS', value: '+64', color: '#f472b6' },
    { title: 'Deploys', value: '312', color: '#fb923c' },
  ],
};

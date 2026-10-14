import { z } from 'zod';
import { zColor } from '../control';

export const productDemoSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  heading: z.string(),
  callToAction: z.string(),
  url: z.string(),
  accent: zColor(),
  dark: zColor(),
});

export type ProductDemoProps = z.infer<typeof productDemoSchema>;

export const productDemoDefaults: ProductDemoProps = {
  name: 'Pulse',
  tagline: 'Know your numbers the second they move.',
  heading: 'This week',
  callToAction: 'Try Pulse free',
  url: 'pulse.example.com',
  accent: '#4f46e5',
  dark: '#1e1b4b',
};

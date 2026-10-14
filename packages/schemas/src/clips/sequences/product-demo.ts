import { z } from 'zod';
import { zColor } from '../../control';
import type { ClipMeta } from '../../registry';

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

export const productDemoMeta: ClipMeta = {
  id: 'product-demo',
  title: 'Product Demo',
  description:
    'A mock analytics dashboard: counting stat cards, growing bars, a cursor click and a toast, then a call to action.',
  category: 'sequences',
  tags: ['dashboard', 'numbers', 'chart', 'cards'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/sequences/product-demo.tsx',
  durationInFrames: 360,
  posterFrame: 200,
  fps: 30,
  width: 1920,
  height: 1080,
};

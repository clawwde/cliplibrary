import { z } from 'zod';
import { zColor, zImage, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const imageGridRevealSchema = z.object({
  title: z.string(),
  background: zColor(),
  color: zColor(),
  image1: zImage(),
  image2: zImage(),
  image3: zImage(),
  image4: zImage(),
  stagger: zSlider({ min: 0, max: 20, step: 1 }),
  speed: zSlider({ min: 10, max: 80, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type ImageGridRevealProps = z.infer<typeof imageGridRevealSchema>;

export const imageGridRevealDefaults: ImageGridRevealProps = {
  title: 'The lineup',
  background: '#0d1117',
  color: '#f8fafc',
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  stagger: 7,
  speed: 28,
  easing: 'easeOut',
};

export const imageGridRevealMeta: ClipMeta = {
  id: 'image-grid-reveal',
  title: 'Image Grid Reveal',
  description:
    'Four tiles flip and scale into a two by two grid in a staggered wave, with the stagger, entrance speed and curve adjustable; empty tiles render a neutral placeholder.',
  category: 'media',
  tags: ['image', 'grid', 'reveal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/media/image-grid-reveal.tsx',
  durationInFrames: 150,
  posterFrame: 130,
  fps: 30,
  width: 1920,
  height: 1080,
};

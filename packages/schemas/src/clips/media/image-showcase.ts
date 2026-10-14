import { z } from 'zod';
import { zColor, zImage } from '../../control';
import type { ClipMeta } from '../../registry';

export const imageShowcaseSchema = z.object({
  title: z.string(),
  background: zColor(),
  image1: zImage(),
  image2: zImage(),
  image3: zImage(),
  image4: zImage(),
});

export type ImageShowcaseProps = z.infer<typeof imageShowcaseSchema>;

export const imageShowcaseDefaults: ImageShowcaseProps = {
  title: 'Gallery',
  background: '#0e1116',
  image1: '',
  image2: '',
  image3: '',
  image4: '',
};

export const imageShowcaseMeta: ClipMeta = {
  id: 'image-showcase',
  title: 'Image Showcase',
  description:
    'Up to four images fly in and settle into a gallery grid; empty slots render a neutral placeholder so the clip reads cleanly before any media is supplied.',
  category: 'media',
  tags: ['image', 'gallery', 'grid'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/media/image-showcase.tsx',
  durationInFrames: 150,
  posterFrame: 130,
  fps: 30,
  width: 1920,
  height: 1080,
};

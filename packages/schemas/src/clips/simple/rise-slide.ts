import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const riseSlideSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  background: zColor(),
  color: zColor(),
  accent: zColor(),
  distance: zSlider({ min: 20, max: 400, step: 10 }),
  speed: zSlider({ min: 10, max: 90, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type RiseSlideProps = z.infer<typeof riseSlideSchema>;

export const riseSlideDefaults: RiseSlideProps = {
  title: 'Rise and slide',
  subtitle: 'motion with intent',
  background: '#111827',
  color: '#f9fafb',
  accent: '#38bdf8',
  distance: 180,
  speed: 36,
  easing: 'easeInOut',
};

export const riseSlideMeta: ClipMeta = {
  id: 'rise-slide',
  title: 'Rise Slide',
  description:
    'A title and subtitle slide up into place while fading in, with a travel distance, duration and easing curve you can tune live.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/rise-slide.tsx',
  durationInFrames: 90,
  posterFrame: 75,
  fps: 30,
  width: 1920,
  height: 1080,
};

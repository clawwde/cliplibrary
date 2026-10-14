import { z } from 'zod';
import { zColor, zMultiline, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const wordRevealSchema = z.object({
  body: zMultiline(),
  background: zColor(),
  color: zColor(),
  accent: zColor(),
  stagger: zSlider({ min: 1, max: 20, step: 1 }),
  speed: zSlider({ min: 6, max: 40, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type WordRevealProps = z.infer<typeof wordRevealSchema>;

export const wordRevealDefaults: WordRevealProps = {
  body: 'every word arrives right on cue',
  background: '#0a0f1e',
  color: '#f8fafc',
  accent: '#a78bfa',
  stagger: 5,
  speed: 16,
  easing: 'easeOut',
};

export const wordRevealMeta: ClipMeta = {
  id: 'word-reveal',
  title: 'Word Reveal',
  description:
    'Each word rises and fades into place one after another, with the stagger between words and the per-word speed and curve adjustable.',
  category: 'text',
  source: 'packages/compositions/src/scenes/text/word-reveal.tsx',
  durationInFrames: 150,
  posterFrame: 130,
  fps: 30,
  width: 1920,
  height: 1080,
};

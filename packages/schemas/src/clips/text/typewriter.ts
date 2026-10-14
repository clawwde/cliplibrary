import { z } from 'zod';
import { zColor, zMultiline, zSlider } from '../../control';
import type { ClipMeta } from '../../registry';

export const typewriterSchema = z.object({
  body: zMultiline(),
  background: zColor(),
  color: zColor(),
  cursor: zColor(),
  charsPerSecond: zSlider({ min: 4, max: 60, step: 1 }),
});

export type TypewriterProps = z.infer<typeof typewriterSchema>;

export const typewriterDefaults: TypewriterProps = {
  body: 'typed out, one key at a time.',
  background: '#0a0a0a',
  color: '#e5e5e5',
  cursor: '#22c55e',
  charsPerSecond: 18,
};

export const typewriterMeta: ClipMeta = {
  id: 'typewriter',
  title: 'Typewriter',
  description:
    'A line of text types itself out character by character behind a blinking cursor, at a words-per-minute pace you control.',
  category: 'text',
  source: 'packages/compositions/src/scenes/text/typewriter.tsx',
  durationInFrames: 150,
  posterFrame: 130,
  fps: 30,
  width: 1920,
  height: 1080,
};

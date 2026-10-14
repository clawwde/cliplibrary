import type { z } from 'zod';
import type { ClipId } from './clip-props';

export type ClipMeta = {
  id: ClipId;
  title: string;
  description: string;
  category: string;
  source: string;
  durationInFrames: number;
  posterFrame: number;
  fps: number;
  width: number;
  height: number;
};

export type ClipModule = {
  id: ClipId;
  schema: z.ZodType;
  defaults: unknown;
  meta: ClipMeta;
};

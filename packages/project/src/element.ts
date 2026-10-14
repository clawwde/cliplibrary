import { z } from 'zod';
import { animationSchema } from './animation';
import { transformSchema } from './transform';

export const SHAPE_KINDS = ['rect', 'ellipse'] as const;

export type ShapeKind = (typeof SHAPE_KINDS)[number];

const baseElementShape = {
  id: z.string().min(1),
  from: z.number().int().min(0),
  durationInFrames: z.number().int().min(1),
  transform: transformSchema,
  animation: animationSchema.optional(),
};

export const textElementSchema = z.object({
  ...baseElementShape,
  type: z.literal('text'),
  content: z.string(),
  fontSize: z.number().positive(),
  color: z.string(),
  fontFamily: z.string(),
});

export const imageElementSchema = z.object({
  ...baseElementShape,
  type: z.literal('image'),
  src: z.string(),
});

export const videoElementSchema = z.object({
  ...baseElementShape,
  type: z.literal('video'),
  src: z.string(),
});

export const shapeElementSchema = z.object({
  ...baseElementShape,
  type: z.literal('shape'),
  kind: z.enum(SHAPE_KINDS),
  color: z.string(),
});

export const compositionElementSchema = z.object({
  ...baseElementShape,
  type: z.literal('composition'),
  clipId: z.string().min(1),
  props: z.record(z.string(), z.unknown()),
});

export const elementSchema = z.discriminatedUnion('type', [
  textElementSchema,
  imageElementSchema,
  videoElementSchema,
  shapeElementSchema,
  compositionElementSchema,
]);

export type TextElement = z.infer<typeof textElementSchema>;
export type ImageElement = z.infer<typeof imageElementSchema>;
export type VideoElement = z.infer<typeof videoElementSchema>;
export type ShapeElement = z.infer<typeof shapeElementSchema>;
export type CompositionElement = z.infer<typeof compositionElementSchema>;
export type Element = z.infer<typeof elementSchema>;
export type ElementType = Element['type'];

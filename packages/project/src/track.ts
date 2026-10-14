import { z } from 'zod';
import { elementSchema } from './element';

export const trackSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  elements: z.array(elementSchema),
});

export type Track = z.infer<typeof trackSchema>;

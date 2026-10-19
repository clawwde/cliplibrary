import { z } from 'zod';
import { zColor } from '../../control';
import { EASING_IDS } from '../../easing';
import { promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const SCENE_TRANSITION_KINDS = ['iris', 'wipe-left', 'wipe-up', 'split'] as const;

export const sceneTransitionSchema = z.object({
  kind: z.enum(SCENE_TRANSITION_KINDS),
  color: zColor(),
  easing: z.enum(EASING_IDS),
});

export type SceneTransitionProps = z.infer<typeof sceneTransitionSchema>;

export const sceneTransitionDefaults: SceneTransitionProps = {
  kind: 'iris',
  color: '#2f5bff',
  easing: 'easeInOut',
};

export const sceneTransitionMeta: ClipMeta = {
  ...promoMeta,
  id: 'scene-transition',
  title: 'Scene Transition',
  description:
    'A solid colour covers the frame and opens again, to bridge two clips on the timeline.',
  category: 'transitions',
  tags: ['wipe', 'cover', 'minimal'],
  theme: 'dark',
  source: 'src/compositions/scenes/transitions/scene-transition.tsx',
  durationInFrames: 40,
  posterFrame: 20,
};

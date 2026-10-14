import { z } from 'zod';
import type { ClipId } from '../../clip-props';
import { zColor } from '../../control';
import type { ClipMeta } from '../../registry';
import { PHONE_FINISHES, type PhoneFinish, promoMeta } from './common';
import { promoDuoDefaults, promoDuoMeta } from './promo-duo';
import { promoFeaturesDefaults, promoFeaturesMeta } from './promo-features';
import { promoFlipDefaults, promoFlipMeta } from './promo-flip';
import { promoHeroDefaults, promoHeroMeta } from './promo-hero';
import { promoIntroDefaults, promoIntroMeta } from './promo-intro';
import { promoOutroDefaults, promoOutroMeta } from './promo-outro';
import { promoScrollDefaults, promoScrollMeta } from './promo-scroll';
import { promoTrioDefaults, promoTrioMeta } from './promo-trio';
import { promoWallDefaults, promoWallMeta } from './promo-wall';

export const SEQUENCE_LANES = ['Scenes A', 'Scenes B'] as const;

export interface SequenceEntry {
  clipId: ClipId;
  lane: 0 | 1;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
}

interface SceneSource {
  clipId: ClipId;
  meta: ClipMeta;
  defaults: { motion: { enterFrames: number; exitFrames: number } };
}

const SCENES: SceneSource[] = [
  { clipId: 'promo-intro', meta: promoIntroMeta, defaults: promoIntroDefaults },
  { clipId: 'promo-hero', meta: promoHeroMeta, defaults: promoHeroDefaults },
  { clipId: 'promo-flip', meta: promoFlipMeta, defaults: promoFlipDefaults },
  { clipId: 'promo-trio', meta: promoTrioMeta, defaults: promoTrioDefaults },
  { clipId: 'promo-features', meta: promoFeaturesMeta, defaults: promoFeaturesDefaults },
  { clipId: 'promo-scroll', meta: promoScrollMeta, defaults: promoScrollDefaults },
  { clipId: 'promo-wall', meta: promoWallMeta, defaults: promoWallDefaults },
  { clipId: 'promo-duo', meta: promoDuoMeta, defaults: promoDuoDefaults },
  { clipId: 'promo-outro', meta: promoOutroMeta, defaults: promoOutroDefaults },
];

const overlapBefore = (index: number): number => {
  const current = SCENES[index];
  const previous = SCENES[index - 1];
  if (current === undefined || previous === undefined) {
    return 0;
  }
  return index % 2 === 0
    ? current.defaults.motion.enterFrames
    : previous.defaults.motion.exitFrames;
};

const buildEntries = (): SequenceEntry[] => {
  const entries: SequenceEntry[] = [];
  let cursor = 0;
  SCENES.forEach((scene, index) => {
    const from = Math.max(0, cursor - overlapBefore(index));
    entries.push({
      clipId: scene.clipId,
      lane: index % 2 === 0 ? 0 : 1,
      from,
      durationInFrames: scene.meta.durationInFrames,
      props: scene.defaults as unknown as Record<string, unknown>,
    });
    cursor = from + scene.meta.durationInFrames;
  });
  return entries;
};

export const APP_PROMO_SEQUENCE: readonly SequenceEntry[] = buildEntries();

const sequenceEnd = APP_PROMO_SEQUENCE.reduce(
  (end, entry) => Math.max(end, entry.from + entry.durationInFrames),
  0,
);

export const appPromoSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type AppPromoProps = z.infer<typeof appPromoSchema>;

export const appPromoDefaults: AppPromoProps = {
  brandName: 'Halo',
  accent: '#2f5bff',
  finish: 'black' satisfies PhoneFinish,
  useFinishEverywhere: false,
};

export const appPromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'app-promo',
  title: 'App Promo',
  description:
    'A full minimal app launch film: nine editable 3D phone scenes laid out on two timeline lanes.',
  source: 'packages/compositions/src/scenes/promo/app-promo.tsx',
  durationInFrames: sequenceEnd,
  posterFrame: Math.round(sequenceEnd * 0.2),
};

import {
  type ClipId,
  SCOOTER_PROMO_SEQUENCE,
  type ScooterPromoProps,
  scooterPromoDefaults,
  scooterPromoMeta,
  scooterPromoSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import { type AnyScene, type SceneMap, SequencePlayer } from '../../promo/sequence-player';
import type { SceneModule } from '../../scene-module';
import { ReliefBackdrop } from '../backgrounds/relief-backdrop';
import { StudioBackdrop } from '../backgrounds/studio-backdrop';
import { AppIconReveal } from '../brand/app-icon-reveal';
import { CtaEndCard } from '../brand/cta-end-card';
import { PhoneFan } from '../devices/phone-fan';
import { PhoneFlatLay } from '../devices/phone-flat-lay';
import { PhonePair } from '../devices/phone-pair';
import { PhonePedestal } from '../devices/phone-pedestal';
import { PhoneTurnaround } from '../devices/phone-turnaround';

const SCENE_COMPONENTS: SceneMap = {
  'relief-backdrop': ReliefBackdrop as unknown as AnyScene,
  'studio-backdrop': StudioBackdrop as unknown as AnyScene,
  'app-icon-reveal': AppIconReveal as unknown as AnyScene,
  'cta-end-card': CtaEndCard as unknown as AnyScene,
  'phone-fan': PhoneFan as unknown as AnyScene,
  'phone-flat-lay': PhoneFlatLay as unknown as AnyScene,
  'phone-pair': PhonePair as unknown as AnyScene,
  'phone-pedestal': PhonePedestal as unknown as AnyScene,
  'phone-turnaround': PhoneTurnaround as unknown as AnyScene,
};

const ACCENT_PATHS: Partial<Record<ClipId, readonly [string, string]>> = {
  'phone-pedestal': ['pedestal', 'color'],
  'phone-flat-lay': ['surface', 'color'],
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const accentScene = (
  clipId: ClipId,
  props: Record<string, unknown>,
  brand: ScooterPromoProps,
): Record<string, unknown> => {
  const named: Record<string, unknown> =
    clipId === 'app-icon-reveal' ? { brandName: brand.brandName } : {};
  const next: Record<string, unknown> = { ...props, ...named };
  const path = ACCENT_PATHS[clipId];
  const group = path === undefined ? undefined : next[path[0]];
  if (path !== undefined && isRecord(group)) {
    next[path[0]] = { ...group, [path[1]]: brand.accent };
  }
  return next;
};

export const ScooterPromo = (brand: ScooterPromoProps) => (
  <SequencePlayer
    sequence={SCOOTER_PROMO_SEQUENCE}
    scenes={SCENE_COMPONENTS}
    brand={{
      accent: brand.accent,
      finish: brand.finish,
      useFinishEverywhere: brand.useFinishEverywhere,
    }}
    adapt={(clipId, props) => accentScene(clipId, props, brand)}
  />
);

export const scooterPromoScene: SceneModule = {
  id: 'scooter-promo',
  component: ScooterPromo,
  render: (key) => (
    <Composition
      key={key}
      id="scooter-promo"
      component={ScooterPromo}
      schema={scooterPromoSchema}
      defaultProps={scooterPromoDefaults}
      durationInFrames={scooterPromoMeta.durationInFrames}
      fps={scooterPromoMeta.fps}
      width={scooterPromoMeta.width}
      height={scooterPromoMeta.height}
    />
  ),
};

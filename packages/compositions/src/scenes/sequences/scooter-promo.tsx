import {
  type ClipId,
  SCOOTER_PROMO_SEQUENCE,
  type ScooterPromoProps,
  scooterPromoDefaults,
  scooterPromoMeta,
  scooterPromoSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import type { SceneModule } from '../../scene-module';
import { isRecord, SequencePlayer, withFinish } from './sequence-player';

const ACCENT_PATHS: Partial<Record<ClipId, readonly [string, string]>> = {
  'phone-pedestal': ['pedestal', 'color'],
  'phone-flat-lay': ['surface', 'color'],
};

const accentScene = (
  clipId: ClipId,
  props: Record<string, unknown>,
  brand: ScooterPromoProps,
): Record<string, unknown> => {
  const { look } = props;
  const named: Record<string, unknown> =
    clipId === 'app-icon-reveal' ? { brandName: brand.brandName } : {};
  const next: Record<string, unknown> = {
    ...props,
    ...named,
    look: isRecord(look) ? { ...look, accent: brand.accent } : look,
  };
  const path = ACCENT_PATHS[clipId];
  const group = path === undefined ? undefined : next[path[0]];
  if (path !== undefined && isRecord(group)) {
    next[path[0]] = { ...group, [path[1]]: brand.accent };
  }
  return brand.useFinishEverywhere
    ? (withFinish(next, brand.finish) as Record<string, unknown>)
    : next;
};

export const ScooterPromo = (brand: ScooterPromoProps) => (
  <SequencePlayer
    sequence={SCOOTER_PROMO_SEQUENCE}
    transform={(clipId, props) => accentScene(clipId, props, brand)}
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

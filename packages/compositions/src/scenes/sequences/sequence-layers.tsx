import type { ClipId, ClipSequence, SequenceBrand } from '@cliplibrary/schemas';
import { type AnyScene, type SceneMap, SequencePlayer } from '../../promo/sequence-player';
import { StudioBackdrop } from '../backgrounds/studio-backdrop';
import { BrandReveal } from '../brand/brand-reveal';
import { CtaEndCard } from '../brand/cta-end-card';
import { PhoneFan } from '../devices/phone-fan';
import { PhonePair } from '../devices/phone-pair';
import { PhoneScroll } from '../devices/phone-scroll';
import { PhoneSpinIn } from '../devices/phone-spin-in';
import { PhoneSwap } from '../devices/phone-swap';
import { PhoneTurnaround } from '../devices/phone-turnaround';
import { PhoneWall } from '../devices/phone-wall';
import { DoodleArrows } from '../overlays/doodle-arrows';
import { FloatingCards } from '../overlays/floating-cards';
import { DetailList } from '../typography/detail-list';
import { FeatureCallouts } from '../typography/feature-callouts';
import { HandwrittenNote } from '../typography/handwritten-note';
import { HeadlineReveal } from '../typography/headline-reveal';

const SCENE_COMPONENTS: SceneMap = {
  'studio-backdrop': StudioBackdrop as unknown as AnyScene,
  'brand-reveal': BrandReveal as unknown as AnyScene,
  'cta-end-card': CtaEndCard as unknown as AnyScene,
  'phone-fan': PhoneFan as unknown as AnyScene,
  'phone-pair': PhonePair as unknown as AnyScene,
  'phone-scroll': PhoneScroll as unknown as AnyScene,
  'phone-spin-in': PhoneSpinIn as unknown as AnyScene,
  'phone-swap': PhoneSwap as unknown as AnyScene,
  'phone-turnaround': PhoneTurnaround as unknown as AnyScene,
  'phone-wall': PhoneWall as unknown as AnyScene,
  'floating-cards': FloatingCards as unknown as AnyScene,
  'doodle-arrows': DoodleArrows as unknown as AnyScene,
  'detail-list': DetailList as unknown as AnyScene,
  'feature-callouts': FeatureCallouts as unknown as AnyScene,
  'headline-reveal': HeadlineReveal as unknown as AnyScene,
  'handwritten-note': HandwrittenNote as unknown as AnyScene,
};

const BRANDED: ReadonlySet<ClipId> = new Set(['brand-reveal', 'cta-end-card']);

const BASE_BRAND = 'Halo';

const rebrand = (value: unknown, brandName: string): unknown =>
  typeof value === 'string' ? value.replaceAll(BASE_BRAND, brandName) : value;

const named = (clipId: ClipId, props: Record<string, unknown>, brandName: string) => {
  if (clipId !== 'handwritten-note') {
    return props;
  }
  const { text, highlight } = props;
  return { ...props, text: rebrand(text, brandName), highlight: rebrand(highlight, brandName) };
};

export const SequenceLayers = ({
  sequence,
  brand,
}: {
  sequence: ClipSequence;
  brand: SequenceBrand;
}) => (
  <SequencePlayer
    sequence={sequence}
    scenes={SCENE_COMPONENTS}
    brand={brand}
    branded={BRANDED}
    adapt={(clipId, props) => named(clipId, props, brand.brandName)}
  />
);

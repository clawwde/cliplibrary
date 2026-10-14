import type { StudioBackdropProps } from './clips/backgrounds/studio-backdrop';
import type { BrandRevealProps } from './clips/brand/brand-reveal';
import type { CtaEndCardProps } from './clips/brand/cta-end-card';
import type { PhoneFanProps } from './clips/devices/phone-fan';
import type { PhonePairProps } from './clips/devices/phone-pair';
import type { PhoneScrollProps } from './clips/devices/phone-scroll';
import type { PhoneSpinInProps } from './clips/devices/phone-spin-in';
import type { PhoneSwapProps } from './clips/devices/phone-swap';
import type { PhoneTurnaroundProps } from './clips/devices/phone-turnaround';
import type { PhoneWallProps } from './clips/devices/phone-wall';
import type { FloatingCardsProps } from './clips/overlays/floating-cards';
import type { AppPromoProps } from './clips/sequences/app-promo';
import type { SceneTransitionProps } from './clips/transitions/scene-transition';
import type { DetailListProps } from './clips/typography/detail-list';
import type { FeatureCalloutsProps } from './clips/typography/feature-callouts';
import type { HeadlineRevealProps } from './clips/typography/headline-reveal';

export interface ClipPropsMap {
  'detail-list': DetailListProps;
  'feature-callouts': FeatureCalloutsProps;
  'headline-reveal': HeadlineRevealProps;
  'phone-fan': PhoneFanProps;
  'phone-pair': PhonePairProps;
  'phone-scroll': PhoneScrollProps;
  'phone-spin-in': PhoneSpinInProps;
  'phone-swap': PhoneSwapProps;
  'phone-turnaround': PhoneTurnaroundProps;
  'phone-wall': PhoneWallProps;
  'floating-cards': FloatingCardsProps;
  'brand-reveal': BrandRevealProps;
  'cta-end-card': CtaEndCardProps;
  'studio-backdrop': StudioBackdropProps;
  'scene-transition': SceneTransitionProps;
  'app-promo': AppPromoProps;
}

export type ClipId = keyof ClipPropsMap;

export type ClipProps<Id extends ClipId = ClipId> = ClipPropsMap[Id];

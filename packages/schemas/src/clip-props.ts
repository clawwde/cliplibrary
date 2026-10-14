import type { NotificationStackProps } from './clips/complex/notification-stack';
import type { CountUpProps } from './clips/data/count-up';
import type { OdometerLedgerProps } from './clips/data/odometer-ledger';
import type { OrbitCardsProps } from './clips/data/orbit-cards';
import type { ProductDemoProps } from './clips/data/product-demo';
import type { ImageShowcaseProps } from './clips/media/image-showcase';
import type { BlurFadeInProps } from './clips/simple/blur-fade-in';
import type { RiseSlideProps } from './clips/simple/rise-slide';
import type { SlicedHeadlineProps } from './clips/text/sliced-headline';
import type { SplitFlapProps } from './clips/text/split-flap';
import type { TypewriterProps } from './clips/text/typewriter';

export interface ClipPropsMap {
  'orbit-cards': OrbitCardsProps;
  'odometer-ledger': OdometerLedgerProps;
  'product-demo': ProductDemoProps;
  'count-up': CountUpProps;
  'sliced-headline': SlicedHeadlineProps;
  'split-flap': SplitFlapProps;
  typewriter: TypewriterProps;
  'blur-fade-in': BlurFadeInProps;
  'rise-slide': RiseSlideProps;
  'image-showcase': ImageShowcaseProps;
  'notification-stack': NotificationStackProps;
}

export type ClipId = keyof ClipPropsMap;

export type ClipProps<Id extends ClipId = ClipId> = ClipPropsMap[Id];

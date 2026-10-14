import type { MosaicRevealProps } from './clips/complex/mosaic-reveal';
import type { NotificationStackProps } from './clips/complex/notification-stack';
import type { BarChartGrowProps } from './clips/data/bar-chart-grow';
import type { CountUpProps } from './clips/data/count-up';
import type { DonutProgressProps } from './clips/data/donut-progress';
import type { LineDrawProps } from './clips/data/line-draw';
import type { OdometerLedgerProps } from './clips/data/odometer-ledger';
import type { OrbitCardsProps } from './clips/data/orbit-cards';
import type { ProductDemoProps } from './clips/data/product-demo';
import type { ImageGridRevealProps } from './clips/media/image-grid-reveal';
import type { ImageShowcaseProps } from './clips/media/image-showcase';
import type { KenBurnsProps } from './clips/media/ken-burns';
import type { GradientSweepTextProps } from './clips/text/gradient-sweep-text';
import type { KineticTypeProps } from './clips/text/kinetic-type';
import type { SlicedHeadlineProps } from './clips/text/sliced-headline';
import type { SplitFlapProps } from './clips/text/split-flap';
import type { TypewriterProps } from './clips/text/typewriter';
import type { WordRevealProps } from './clips/text/word-reveal';

export interface ClipPropsMap {
  'orbit-cards': OrbitCardsProps;
  'odometer-ledger': OdometerLedgerProps;
  'product-demo': ProductDemoProps;
  'count-up': CountUpProps;
  'bar-chart-grow': BarChartGrowProps;
  'line-draw': LineDrawProps;
  'donut-progress': DonutProgressProps;
  'sliced-headline': SlicedHeadlineProps;
  'split-flap': SplitFlapProps;
  typewriter: TypewriterProps;
  'word-reveal': WordRevealProps;
  'kinetic-type': KineticTypeProps;
  'gradient-sweep-text': GradientSweepTextProps;
  'image-showcase': ImageShowcaseProps;
  'ken-burns': KenBurnsProps;
  'image-grid-reveal': ImageGridRevealProps;
  'notification-stack': NotificationStackProps;
  'mosaic-reveal': MosaicRevealProps;
}

export type ClipId = keyof ClipPropsMap;

export type ClipProps<Id extends ClipId = ClipId> = ClipPropsMap[Id];

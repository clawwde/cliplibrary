import type { ClipId, ClipPropsMap } from '@cliplibrary/schemas';
import type { FC } from 'react';
import { NotificationStack } from './scenes/notification-stack';
import { OdometerLedger } from './scenes/odometer-ledger';
import { OrbitCards } from './scenes/orbit-cards';
import { ProductDemo } from './scenes/product-demo';
import { SlicedHeadline } from './scenes/sliced-headline';
import { SplitFlap } from './scenes/split-flap';

export type ClipComponent<Id extends ClipId> = FC<ClipPropsMap[Id]>;

export const CLIP_COMPONENTS: { [Id in ClipId]: ClipComponent<Id> } = {
  'orbit-cards': OrbitCards,
  'odometer-ledger': OdometerLedger,
  'sliced-headline': SlicedHeadline,
  'notification-stack': NotificationStack,
  'split-flap': SplitFlap,
  'product-demo': ProductDemo,
};

export const getClipComponent = <Id extends ClipId>(id: Id): ClipComponent<Id> =>
  CLIP_COMPONENTS[id];

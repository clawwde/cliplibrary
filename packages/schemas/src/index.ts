import type { z } from 'zod';
import type { ClipId } from './clip-id';
import {
  type NotificationStackProps,
  notificationStackDefaults,
  notificationStackSchema,
} from './clips/notification-stack';
import {
  type OdometerLedgerProps,
  odometerLedgerDefaults,
  odometerLedgerSchema,
} from './clips/odometer-ledger';
import { type OrbitCardsProps, orbitCardsDefaults, orbitCardsSchema } from './clips/orbit-cards';
import {
  type ProductDemoProps,
  productDemoDefaults,
  productDemoSchema,
} from './clips/product-demo';
import {
  type SlicedHeadlineProps,
  slicedHeadlineDefaults,
  slicedHeadlineSchema,
} from './clips/sliced-headline';
import { type SplitFlapProps, splitFlapDefaults, splitFlapSchema } from './clips/split-flap';

export * from './clip-id';
export * from './clips/notification-stack';
export * from './clips/odometer-ledger';
export * from './clips/orbit-cards';
export * from './clips/product-demo';
export * from './clips/sliced-headline';
export * from './clips/split-flap';
export * from './control';
export * from './registry';

export interface ClipPropsMap {
  'orbit-cards': OrbitCardsProps;
  'odometer-ledger': OdometerLedgerProps;
  'sliced-headline': SlicedHeadlineProps;
  'notification-stack': NotificationStackProps;
  'split-flap': SplitFlapProps;
  'product-demo': ProductDemoProps;
}

export type ClipProps<Id extends ClipId = ClipId> = ClipPropsMap[Id];

export const CLIP_SCHEMAS = {
  'orbit-cards': orbitCardsSchema,
  'odometer-ledger': odometerLedgerSchema,
  'sliced-headline': slicedHeadlineSchema,
  'notification-stack': notificationStackSchema,
  'split-flap': splitFlapSchema,
  'product-demo': productDemoSchema,
} satisfies Record<ClipId, z.ZodType>;

export const CLIP_DEFAULTS: { [Id in ClipId]: ClipPropsMap[Id] } = {
  'orbit-cards': orbitCardsDefaults,
  'odometer-ledger': odometerLedgerDefaults,
  'sliced-headline': slicedHeadlineDefaults,
  'notification-stack': notificationStackDefaults,
  'split-flap': splitFlapDefaults,
  'product-demo': productDemoDefaults,
};

export const getClipSchema = (id: ClipId): z.ZodType => CLIP_SCHEMAS[id];

export const getClipDefaults = <Id extends ClipId>(id: Id): ClipPropsMap[Id] => CLIP_DEFAULTS[id];

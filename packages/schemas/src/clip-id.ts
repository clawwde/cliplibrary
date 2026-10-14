export const CLIP_IDS = [
  'orbit-cards',
  'odometer-ledger',
  'sliced-headline',
  'notification-stack',
  'split-flap',
  'product-demo',
] as const;

export type ClipId = (typeof CLIP_IDS)[number];

export const isClipId = (value: string): value is ClipId =>
  (CLIP_IDS as readonly string[]).includes(value);

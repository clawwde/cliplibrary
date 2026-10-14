import type { ClipId } from './clip-id';

export type ClipMeta = {
  id: ClipId;
  title: string;
  description: string;
  source: string;
  durationInFrames: number;
  posterFrame: number;
  fps: number;
  width: number;
  height: number;
};

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const source = (id: ClipId): string => `packages/compositions/src/scenes/${id}.tsx`;

export const CLIP_REGISTRY = [
  {
    id: 'orbit-cards',
    title: 'Orbit Cards',
    description:
      'Eight metric cards orbit in 3D perspective, decelerate, then collapse into a dashboard grid while a headline rises in letter by letter.',
    source: source('orbit-cards'),
    durationInFrames: 210,
    posterFrame: 195,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
  {
    id: 'odometer-ledger',
    title: 'Odometer Ledger',
    description:
      'Revenue digits spin on odometer reels, a line chart draws itself with a tracking dot, stat pills slide in and a ticker tape scrolls.',
    source: source('odometer-ledger'),
    durationInFrames: 180,
    posterFrame: 150,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
  {
    id: 'sliced-headline',
    title: 'Sliced Headline',
    description:
      'A serif headline arrives as horizontal slices flying in from both sides and snapping into alignment, with a hand-drawn underline and scrolling bands.',
    source: source('sliced-headline'),
    durationInFrames: 180,
    posterFrame: 150,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
  {
    id: 'notification-stack',
    title: 'Notification Stack',
    description:
      'Glass notifications spring in and stack with depth, fan out into a list, then swipe away to reveal an inbox zero title.',
    source: source('notification-stack'),
    durationInFrames: 200,
    posterFrame: 190,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
  {
    id: 'split-flap',
    title: 'Split Flap',
    description:
      'An airport-style split-flap board where every cell flips through letters, staggered by row and column, until the message settles.',
    source: source('split-flap'),
    durationInFrames: 150,
    posterFrame: 140,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
  {
    id: 'product-demo',
    title: 'Product Demo',
    description:
      'A mock analytics dashboard: counting stat cards, growing bars, a cursor click and a toast, then a call to action.',
    source: source('product-demo'),
    durationInFrames: 360,
    posterFrame: 200,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  },
] as const satisfies readonly ClipMeta[];

const REGISTRY_BY_ID: Readonly<Record<ClipId, ClipMeta>> = Object.fromEntries(
  CLIP_REGISTRY.map((meta) => [meta.id, meta]),
) as Record<ClipId, ClipMeta>;

export const getClipMeta = (id: ClipId): ClipMeta => REGISTRY_BY_ID[id];

import { z } from 'zod';
import { zColor, zImage, zSlider } from '../../control';
import {
  auraSchema,
  blob,
  PICKER_FONTS,
  pickerLook,
  pickerMotion,
  steps,
  stepsSchema,
} from '../../picker-common';
import { FONT_WEIGHT, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const PRODUCT_ICONS = [
  'watch',
  'earbuds',
  'camera',
  'headset',
  'power-bank',
  'drone',
  'lamp',
  'mouse',
  'microphone',
  'ring',
] as const;

export type ProductIcon = (typeof PRODUCT_ICONS)[number];

export const productCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.enum(PRODUCT_ICONS),
  tint: zColor(),
  image: zImage(),
});

export type ProductCard = z.infer<typeof productCardSchema>;

export const productCardsSchema = z.object({
  cards: z.array(productCardSchema).min(1).max(12),
  font: z.enum(PICKER_FONTS),
  type: z.object({
    title: zSlider({ min: 20, max: 120 }),
    titleWeight: zSlider(FONT_WEIGHT),
    description: zSlider({ min: 10, max: 60 }),
    ink: zColor(),
  }),
  card: z.object({
    width: zSlider({ min: 400, max: 1600 }),
    height: zSlider({ min: 100, max: 400 }),
    radius: zSlider({ min: 0, max: 100 }),
    fill: zColor(),
    fillOpacity: zSlider({ min: 0, max: 1, step: 0.01 }),
    border: zColor(),
    blur: zSlider({ min: 0, max: 40 }),
    shadow: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  tile: z.object({
    size: zSlider({ min: 40, max: 300 }),
    radius: zSlider({ min: 0, max: 80 }),
    color: zColor(),
    ink: zColor(),
  }),
  layout: z.object({
    x: zSlider({ min: -800, max: 800 }),
    y: zSlider({ min: -400, max: 400 }),
    pitch: zSlider({ min: 100, max: 600 }),
    sideScale: zSlider({ min: 0.3, max: 1, step: 0.01 }),
    sideOpacity: zSlider({ min: 0, max: 1, step: 0.01 }),
    loop: z.boolean(),
  }),
  entrance: z.object({
    frames: zSlider({ min: 6, max: 60 }),
    stagger: zSlider({ min: 0, max: 20 }),
    rise: zSlider({ min: 0, max: 300 }),
  }),
  timing: stepsSchema,
  aura: auraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type ProductCardsProps = z.infer<typeof productCardsSchema>;

const product = (
  title: string,
  description: string,
  icon: ProductIcon,
  tint: string,
): ProductCard => ({ title, description, icon, tint, image: '' });

export const productCardsDefaults: ProductCardsProps = {
  cards: [
    product('Smart Watch', 'Fitness tracking and heart rate monitor.', 'watch', '#3a3d46'),
    product('Earbuds Pro', 'Wireless noise-canceling earbuds.', 'earbuds', '#f4f4f6'),
    product('4K Camera', 'Ultra-HD compact action camera.', 'camera', '#5b6070'),
    product('VR Headset', 'Next-gen virtual reality experience.', 'headset', '#eceef3'),
    product('Power Bank', 'Fast magnetic wireless charger.', 'power-bank', '#ef3b3b'),
    product('Drone Quad', 'Foldable drone with 4K recording.', 'drone', '#9aa0ab'),
    product('Desk Lamp', 'Smart dimmable LED table light.', 'lamp', '#d9dbe0'),
    product('Pro Mouse', 'Ultra-lightweight wireless mouse.', 'mouse', '#8e939e'),
    product('Microphone', 'Studio-quality USB condenser mic.', 'microphone', '#c9ccd3'),
    product('Smart Ring', 'Sleek health and sleep tracker.', 'ring', '#b9bcc4'),
  ],
  font: 'lexend',
  type: { title: 64, titleWeight: 600, description: 26, ink: '#ffffff' },
  card: {
    width: 900,
    height: 228,
    radius: 34,
    fill: '#ffffff',
    fillOpacity: 0.16,
    border: '#ffffff',
    blur: 18,
    shadow: 0.4,
  },
  tile: { size: 156, radius: 36, color: '#ffffff', ink: '#26262b' },
  layout: { x: 0, y: 0, pitch: 312, sideScale: 0.7, sideOpacity: 0.72, loop: false },
  entrance: { frames: 30, stagger: 5, rise: 120 },
  timing: steps({ delay: 32, interval: 32, moveFrames: 15 }),
  aura: {
    blobs: [
      blob('#ff3ea5', 50, -8, 70, 0.9),
      blob('#ff7cc4', 8, 30, 48, 0.55),
      blob('#c8c4ff', 50, 112, 70, 0.85),
      blob('#ffe1f1', 100, 60, 40, 0.5),
    ],
    drift: 0.8,
  },
  look: pickerLook({
    background: '#f6b3dc',
    backgroundEdge: '#ec8cc6',
    ink: '#ffffff',
    accent: '#ff3ea5',
    grain: 0.035,
    spotlight: 0.25,
  }),
  motion: pickerMotion(),
};

export const productCardsMeta: ClipMeta = {
  ...promoMeta,
  id: 'product-cards',
  title: 'Product Cards',
  description:
    'A vertical carousel of frosted glass product cards that steps one card at a time, with the centered card enlarged.',
  category: 'list-pickers',
  tags: ['list', 'cards', 'scroll', 'picker'],
  theme: 'light',
  source: 'src/compositions/scenes/list-pickers/product-cards.tsx',
  durationInFrames: 180,
  posterFrame: 100,
};

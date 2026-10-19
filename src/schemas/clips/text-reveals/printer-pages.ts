import { z } from 'zod';
import { zColor, zImage, zMultiline, zSlider } from '../../control';
import {
  defaultMotion,
  FONT_WEIGHT,
  lightLook,
  lookSchema,
  motionSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const PAGE_CONTENTS = ['text', 'image', 'image-and-text'] as const;

export type PageContent = (typeof PAGE_CONTENTS)[number];

export const PAGE_FONTS = ['condensed', 'script', 'serif', 'sans'] as const;

export type PageFont = (typeof PAGE_FONTS)[number];

export const IMAGE_FITS = ['cover', 'contain'] as const;

export const printedPageSchema = z.object({
  text: zMultiline(),
  content: z.enum(PAGE_CONTENTS),
  image: zImage(),
  font: z.enum(PAGE_FONTS),
  size: zSlider({ min: 20, max: 320 }),
  weight: zSlider(FONT_WEIGHT),
  tracking: zSlider({ min: -0.1, max: 0.4, step: 0.005 }),
  lineHeight: zSlider({ min: 0.7, max: 1.8, step: 0.01 }),
  ink: zColor(),
  textY: zSlider({ min: 0.05, max: 0.95, step: 0.005 }),
  caption: z.string(),
  captionY: zSlider({ min: 0.05, max: 0.95, step: 0.005 }),
  imageY: zSlider({ min: 0.05, max: 0.95, step: 0.005 }),
  imageWidth: zSlider({ min: 0.1, max: 1, step: 0.01 }),
  imageHeight: zSlider({ min: 0.05, max: 1, step: 0.01 }),
  imageFit: z.enum(IMAGE_FITS),
  imageRadius: zSlider({ min: 0, max: 80 }),
});

export type PrintedPage = z.infer<typeof printedPageSchema>;

export const printerPagesSchema = z.object({
  pages: z.array(printedPageSchema).min(1).max(10),
  timing: z.object({
    delay: zSlider({ min: 0, max: 90 }),
    interval: zSlider({ min: 12, max: 120 }),
    ejectFrames: zSlider({ min: 8, max: 90 }),
  }),
  paper: z.object({
    color: zColor(),
    width: zSlider({ min: 480, max: 1000 }),
    scatter: zSlider({ min: 0, max: 1, step: 0.01 }),
    shadow: zSlider({ min: 0, max: 1, step: 0.01 }),
    motionBlur: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  printer: z.object({
    body: zColor(),
    trim: zColor(),
    slot: zColor(),
    tray: zColor(),
    display: zColor(),
    light: zColor(),
  }),
  camera: z.object({
    angle: zSlider({ min: -90, max: 90, step: 0.5 }),
    zoom: zSlider({ min: 0.4, max: 1.8, step: 0.01 }),
    x: zSlider({ min: -800, max: 800 }),
    y: zSlider({ min: -500, max: 500 }),
    drift: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  look: lookSchema,
  motion: motionSchema,
});

export type PrinterPagesProps = z.infer<typeof printerPagesSchema>;

const word = (text: string, overrides: Partial<PrintedPage> = {}): PrintedPage => ({
  text,
  content: 'text',
  image: '',
  font: 'condensed',
  size: 92,
  weight: 500,
  tracking: 0,
  lineHeight: 1.05,
  ink: '#161616',
  textY: 0.42,
  caption: '',
  captionY: 0.6,
  imageY: 0.4,
  imageWidth: 0.72,
  imageHeight: 0.42,
  imageFit: 'cover',
  imageRadius: 0,
  ...overrides,
});

export const printerPagesDefaults: PrinterPagesProps = {
  pages: [
    word('guess\nwhat?', {
      font: 'script',
      size: 150,
      weight: 400,
      lineHeight: 0.92,
      ink: '#8d8d90',
      textY: 0.36,
      caption: 'LEARN MORE',
      captionY: 0.6,
    }),
    word('SOMETHING'),
    word('EXCITING'),
    word('IS'),
    word('COMING'),
  ],
  timing: { delay: 6, interval: 40, ejectFrames: 30 },
  paper: { color: '#f7f7f5', width: 760, scatter: 0.6, shadow: 0.55, motionBlur: 0.6 },
  printer: {
    body: '#dcdcd8',
    trim: '#c4c4bf',
    slot: '#55565a',
    tray: '#d2d2ce',
    display: '#2c3236',
    light: '#7ddc8a',
  },
  camera: { angle: -72, zoom: 0.9, x: 150, y: 10, drift: 0.5 },
  look: {
    ...lightLook('#2f5bff'),
    background: '#cfcfcb',
    backgroundEdge: '#b2b2ad',
    grain: 0.08,
    spotlight: 0.5,
  },
  motion: defaultMotion({ exit: 'fade', exitFrames: 14, float: 0 }),
};

export const printerPagesMeta: ClipMeta = {
  ...promoMeta,
  id: 'printer-pages',
  title: 'Printer Pages',
  description:
    'A printer feeds out sheet after sheet onto its tray, each page carrying its own word or image.',
  category: 'text-reveals',
  tags: ['paper', 'reveal', 'text', 'slide', 'stack'],
  theme: 'light',
  source: 'src/compositions/scenes/text-reveals/printer-pages.tsx',
  durationInFrames: 225,
  posterFrame: 120,
};

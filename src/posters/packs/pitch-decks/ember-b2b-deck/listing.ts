import { type DesignIconName, type Fill, linear, radial } from '@/design';
import {
  circle,
  fitWidth,
  icon,
  laptop,
  page,
  polygon,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { BODY, EMBER } from './deck-kit';
import { iconSheet } from './slides-c';

const { width: W } = LANDSCAPE;
const DESK = '#eceef2';
const HEAD = 'Outfit';
const DARK = '#0b0f19';
const INK = EMBER.ink;

const tile = (item: Template, x: number, y: number, width: number) => [
  rect(x, y, width, (width * item.height) / item.width, '#ffffff', {
    cornerRadius: 6,
    ...shadow(30, 12, 'rgba(14,21,37,0.18)'),
    name: 'Slide shadow',
  }),
  fitWidth(item, x, y, width),
];

const at = (items: readonly Template[], index: number): Template => {
  const item = items[index % items.length];
  if (item === undefined) {
    throw new Error('slides are required');
  }
  return item;
};

const formats = (x: number, y: number) => [
  circle(x + 45, y + 45, 45, EMBER.ink),
  icon('wand-sparkles', x + 20, y + 20, 50, '#ffffff', { strokeWidth: 2 }),
  rect(x + 115, y, 90, 90, linear(135, '#ff8a5c', EMBER.accent), {
    cornerRadius: 20,
    name: 'Format',
  }),
  icon('monitor', x + 137, y + 22, 46, '#ffffff', { strokeWidth: 2 }),
];

export const mosaicPage = (slides: readonly Template[]) => () =>
  page(
    DESK,
    Array.from({ length: 12 }, (_, index) =>
      tile(at(slides, index), -68 + (index % 3) * 588, -90 + Math.floor(index / 3) * 343, 560),
    ),
  );

export const heroPage = (middle: readonly Template[], side: readonly Template[]) => () =>
  page(
    DESK,
    rect(80, 100, 130, 130, linear(135, '#ff8a5c', EMBER.accent), {
      cornerRadius: 36,
      ...shadow(24, 10, 'rgba(14,21,37,0.2)'),
      name: 'Badge',
    }),
    icon('wand-sparkles', 112, 132, 66, '#ffffff', { strokeWidth: 2 }),
    text('36 Editable\nSlide Deck\nTemplates', 80, 320, 440, {
      fontFamily: HEAD,
      fontSize: 68,
      fontWeight: 800,
      fill: INK,
      lineHeight: 1.15,
    }),
    text('B2B Marketing', 80, 580, 440, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 400,
      fill: INK,
    }),
    text('File Formats', 80, 900, 440, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 800,
      fill: INK,
    }),
    formats(80, 960),
    middle.map((item, index) => tile(item, 520, 30 + index * 390, 640)),
    side.map((item, index) => tile(item, 1200, -40 + index * 240, 380)),
  );

export const gridPage = (slides: readonly Template[]) => () =>
  page(
    DESK,
    text('36 Editable Slide Deck Templates', 70, 70, 1400, {
      fontFamily: HEAD,
      fontSize: 54,
      fontWeight: 800,
      fill: INK,
    }),
    slides.map((item, index) =>
      tile(item, 50 + (index % 3) * 510, 200 + Math.floor(index / 3) * 310, 480),
    ),
    text('File Formats', 70, 860, 500, {
      fontFamily: HEAD,
      fontSize: 36,
      fontWeight: 800,
      fill: INK,
    }),
    formats(70, 925),
    text('B2B Marketing', 930, 960, 600, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 400,
      fill: INK,
      align: 'right',
    }),
  );

export const iconsPage = () =>
  page(
    DESK,
    rect(0, 330, W, 360, linear(90, '#ffffff', '#f4f5f8', '#ffffff'), { name: 'Band' }),
    fitWidth(iconSheet(10), -300, 330, 640),
    fitWidth(iconSheet(40), 1260, 330, 640),
    tile(iconSheet(0), 340, 230, 920),
    text('3 Editable Icon Slides', 0, 840, W, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 800,
      fill: INK,
      align: 'center',
    }),
    formats(695, 960),
  );

const shapes = () => [
  circle(1380, -20, 210, radial('#ffb199', '#ff5b2e', '#c2410c'), { name: 'Ring' }),
  circle(1380, -20, 90, DARK, { name: 'Ring hole' }),
  polygon(3, 40, -30, 230, 230, linear(160, '#93a4c8', '#3b4a6b'), { rotation: 18, name: 'Cone' }),
  rect(60, 1000, 200, 200, linear(150, '#ffd2bf', '#ff8a5c'), {
    cornerRadius: 46,
    rotation: -16,
    name: 'Cube',
  }),
  polygon(3, 1310, 930, 240, 240, linear(140, '#ffb199', '#ff5b2e'), {
    rotation: -14,
    name: 'Pyramid',
  }),
];

export const editablePage = (slides: readonly Template[]) => () => {
  const width = 900;
  const screenWidth = width * 0.95;
  const screenHeight = width * 0.57;
  const cell = (screenWidth - 40) / 6;
  return page(
    DARK,
    shapes(),
    text('Fully editable in your browser', 0, 190, W, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: '#ff8a5c',
      align: 'center',
    }),
    text(
      'Edit text, change fonts or colours, swap icons and photos,\nand adjust every layout to fit your agency.',
      0,
      290,
      W,
      {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 400,
        fill: '#d9dce3',
        align: 'center',
        lineHeight: 1.45,
      },
    ),
    laptop(350, 470, width, {
      screen: '#f1f5f7',
      content: [
        rect(0, 0, screenWidth, screenHeight * 0.07, linear(90, EMBER.ink, '#2a3550'), {
          name: 'Editor bar',
        }),
        Array.from({ length: 24 }, (_, index) =>
          fitWidth(
            at(slides, index),
            20 + (index % 6) * cell,
            screenHeight * 0.13 + Math.floor(index / 6) * ((screenHeight * 0.85) / 4),
            cell - 14,
          ),
        ),
      ],
    }),
  );
};

const steps: readonly { icon: DesignIconName; title: string; body: string }[] = [
  { icon: 'credit-card', title: '01 Purchase', body: 'Complete checkout and\npayment in seconds' },
  {
    icon: 'download',
    title: '02 Download',
    body: 'Save the PDF and click\nthe edit button inside',
  },
  { icon: 'pencil', title: '03 Customise', body: 'Open the deck and start\nediting instantly' },
];

export const howToPage = (fill: Fill) => () =>
  page(
    DARK,
    shapes(),
    text('Getting Started', 0, 300, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    steps.map((step, index) => {
      const cx = 330 + index * 470;
      return [
        rect(cx - 85, 470, 170, 170, fill, { cornerRadius: 44, name: 'Step tile' }),
        icon(step.icon, cx - 46, 509, 92, '#ffffff', { strokeWidth: 2 }),
        text(step.title, cx - 220, 690, 440, {
          fontFamily: HEAD,
          fontSize: 40,
          fontWeight: 800,
          fill: '#ffffff',
          align: 'center',
        }),
        text(step.body, cx - 220, 750, 440, {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 400,
          fill: '#b9bfcc',
          align: 'center',
          lineHeight: 1.45,
        }),
      ];
    }),
  );

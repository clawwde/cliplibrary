import { type Fill, linear, radial } from '@/design';
import {
  avatar,
  circle,
  icon,
  POST_SIZE,
  photo,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const HARBOR = {
  navy: '#1f2a5c',
  indigo: '#33428a',
  lilac: '#8c98e0',
  coral: '#ff6b57',
  peach: '#ffb4a2',
  cream: '#fbf6f1',
  paper: '#f3eee8',
  ink: '#141a33',
  white: '#ffffff',
  grey: '#5f6475',
  mint: '#2dd4bf',
  charcoal: '#18191d',
};

const HEAD = 'Bricolage Grotesque';
export const BODY = 'DM Sans';
export const { width: W, height: H } = POST_SIZE;

export const say = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: Fill,
  weight = 700,
  align: 'left' | 'center' | 'right' = 'left',
  family: string = HEAD,
) =>
  text(content, x, y, width, {
    fontFamily: family,
    fontSize: size,
    fontWeight: weight,
    fill,
    align,
    lineHeight: 1.08,
  });

export const brandTag = (y: number, color: string) =>
  say('lumora.studio', 0, y, W, 28, color, 500, 'center', BODY);

export const ideasFlight = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.paper, { name: 'Background' }),
  rect(80, 110, 300, 64, HARBOR.coral, { name: 'Tag', cornerRadius: 32 }),
  say('COMMUNITY', 80, 126, 300, 28, HARBOR.navy, 700, 'center', BODY),
  rect(80, 230, 920, 640, HARBOR.navy, { name: 'Hero card', cornerRadius: 48 }),
  photo('woman-portrait-2', 560, 230, 440, 640, { cornerRadius: 48 }),
  say('Ideas\nthat', 140, 320, 420, 104, HARBOR.white, 500),
  say('take\nflight', 140, 545, 420, 104, HARBOR.coral, 800),
  rect(80, 920, 920, 150, HARBOR.navy, { name: 'Members bar', cornerRadius: 75 }),
  say('Join thousands\nof members', 150, 952, 460, 36, HARBOR.white, 500, 'left', BODY),
  avatar('woman-portrait-5', 650, 995, 44, HARBOR.white),
  avatar('man-portrait-1', 730, 995, 44, HARBOR.white),
  avatar('woman-portrait-4', 810, 995, 44, HARBOR.white),
  circle(905, 995, 48, HARBOR.coral, { name: 'Join button' }),
  icon('plus', 883, 973, 44, HARBOR.navy, { strokeWidth: 3 }),
  brandTag(1210, HARBOR.grey),
]);

export const portfolio = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#ff8a75', HARBOR.coral), { name: 'Background' }),
  say('Port', 0, 140, W, 190, HARBOR.navy, 800, 'center'),
  say('folio', 400, 300, 600, 170, HARBOR.ink, 700, 'left', 'Caveat'),
  rect(230, 540, 220, 90, '#4a5aaa', { name: 'Folder tab', cornerRadius: 22 }),
  rect(230, 580, 560, 400, '#4a5aaa', { name: 'Folder back', cornerRadius: 30 }),
  rect(230, 650, 560, 330, HARBOR.lilac, {
    name: 'Folder front',
    cornerRadius: 30,
    ...shadow(30, 12, 'rgba(31,42,92,0.35)'),
  }),
  rect(640, 820, 320, 330, HARBOR.white, {
    name: 'Menu',
    cornerRadius: 18,
    ...shadow(30, 14, 'rgba(31,42,92,0.35)'),
  }),
  rect(654, 836, 292, 52, HARBOR.navy, { name: 'Menu highlight', cornerRadius: 10 }),
  ['Branding', 'Website', 'Interface', 'Illustration', 'Motion'].map((item, index) =>
    say(
      item,
      680,
      846 + index * 58,
      260,
      28,
      index === 0 ? HARBOR.white : HARBOR.ink,
      500,
      'left',
      BODY,
    ),
  ),
  poly(
    [
      [600, 760],
      [600, 840],
      [620, 822],
      [636, 856],
      [652, 849],
      [636, 816],
      [664, 816],
    ],
    HARBOR.ink,
    { name: 'Cursor', stroke: HARBOR.white, strokeWidth: 3 },
  ),
]);

export const leadTrend = template(W, H, () => [
  rect(0, 0, W, H, linear(160, HARBOR.indigo, HARBOR.navy), { name: 'Background' }),
  Array.from({ length: 6 }, (_, index) =>
    rect(820, 30 + index * 220, 220, 200, 'rgba(255,255,255,0.12)', {
      name: 'Column tile',
      cornerRadius: 10,
    }),
  ),
  rotateNodes(-18, 830, 610, [
    rect(700, 480, 260, 260, linear(135, HARBOR.peach, HARBOR.coral), {
      name: 'Tilted tile',
      cornerRadius: 22,
      ...shadow(40, 18, 'rgba(0,0,0,0.35)'),
    }),
  ]),
  say("Don't\nfollow,\nlead the", 80, 410, 700, 104, HARBOR.white, 700),
  rect(80, 770, 340, 124, HARBOR.coral, { name: 'Highlight', cornerRadius: 12 }),
  say('Trend', 80, 778, 340, 100, HARBOR.navy, 800, 'center'),
  brandTag(1230, 'rgba(255,255,255,0.75)'),
]);

export const seoMagnifier = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.paper, { name: 'Background' }),
  say('Optimise', 0, 130, W, 116, HARBOR.ink, 500, 'center'),
  rotateNodes(-2, 540, 320, [
    rect(210, 270, 660, 112, HARBOR.coral, {
      name: 'Highlight',
      cornerRadius: 10,
      ...shadow(20, 8, 'rgba(255,107,87,0.35)'),
    }),
    say('Your Content', 210, 280, 660, 82, HARBOR.navy, 800, 'center'),
  ]),
  poly(
    [
      [376, 910],
      [430, 964],
      [250, 1190],
      [196, 1136],
    ],
    linear(90, '#222533', '#5a5e72', '#222533'),
    { name: 'Handle', ...shadow(20, 10, 'rgba(0,0,0,0.3)') },
  ),
  circle(570, 760, 265, linear(135, '#f2f2f2', '#8d93a8', '#fafafa'), {
    name: 'Lens rim',
    ...shadow(40, 18, 'rgba(20,26,51,0.3)'),
  }),
  circle(570, 760, 228, radial(HARBOR.white, '#e9ecf8'), { name: 'Lens' }),
  say('With', 320, 640, 500, 116, HARBOR.ink, 800, 'center'),
  say('SEO', 320, 765, 500, 132, HARBOR.indigo, 800, 'center'),
  brandTag(1240, HARBOR.grey),
]);

export const growthStats = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.paper, { name: 'Background' }),
  say('Measurable', 80, 110, 900, 92, HARBOR.coral, 800),
  say('Growth Stats', 80, 214, 900, 82, HARBOR.ink, 500),
  rect(80, 390, 570, 300, HARBOR.navy, { name: 'Stat box', cornerRadius: 30 }),
  say('6.2M', 120, 430, 500, 130, HARBOR.white, 800),
  say('Impressions earned\nacross campaigns', 120, 590, 500, 30, '#d7dbf2', 500, 'left', BODY),
  rect(680, 390, 320, 300, HARBOR.coral, { name: 'Stat box', cornerRadius: 30 }),
  say('8x', 680, 430, 320, 130, HARBOR.navy, 800, 'center'),
  say('Return on\nad spend', 680, 590, 320, 30, HARBOR.navy, 600, 'center', BODY),
  rect(80, 720, 920, 300, HARBOR.indigo, { name: 'Stat box', cornerRadius: 30 }),
  say('184,000+', 120, 760, 840, 150, HARBOR.white, 800),
  say(
    'Customers reached through\nmarketed campaigns',
    120,
    930,
    840,
    32,
    '#d7dbf2',
    500,
    'left',
    BODY,
  ),
  brandTag(1200, HARBOR.grey),
]);

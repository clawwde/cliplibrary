import { linear } from '@/design';
import {
  card,
  fitWidth,
  group,
  icon,
  numbered,
  page,
  photo,
  pill,
  rect,
  shadow,
  text,
} from '../../../kit';
import { definePack, LANDSCAPE } from '../../../pack';
import { cover, deliverables, editable, INK, POSTS, showcase, WHITE } from './pages';
import { AMBER, HEAD } from './posts';

const { width: W } = LANDSCAPE;

const howItWorks = () =>
  page(
    INK,
    text('How it works?', 120, 80, 1200, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: WHITE,
    }),
    card(120, 250, 1360, 580, { radius: 36 }),
    numbered(
      [
        'Get instant access as soon as you check out',
        'Edit text, colours and branding in the built-in editor',
        'Export your posts and share them everywhere',
      ],
      200,
      350,
      1220,
      { fontSize: 44, numberColor: AMBER.to, gap: 130, fontFamily: HEAD, color: INK },
    ),
    text('No design skills needed: everything runs in your browser.', 200, 720, 1200, {
      fontSize: 32,
      fontWeight: 500,
      fill: '#52525b',
    }),
  );

const OFFERS = [
  'Buy one pack, choose a second one free.*',
  'Just message us after your purchase.',
  'Limited time: grab it before the offer ends',
];

const bonus = () =>
  page(
    INK,
    icon('gift', 110, 60, 140, AMBER.from, { strokeWidth: 1.6 }),
    text('Bonus', 270, 110, 500, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 900,
      fill: WHITE,
    }),
    OFFERS.map((offer, index) =>
      pill(offer, 110, 280 + index * 130, {
        fill: linear(90, AMBER.to, AMBER.from),
        color: INK,
        fontSize: 38,
        fontFamily: HEAD,
        fontWeight: 800,
      }),
    ),
    rect(0, 720, W, 480, '#141417', { name: 'Footer band' }),
    photo('man-portrait-2', 140, 760, 440, 440, { cornerRadius: 220 }),
    text('Brightline', 700, 800, 860, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 900,
      fill: WHITE,
    }),
    text('Studio', 700, 930, 860, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 900,
      fill: AMBER.from,
    }),
    text('*The second pack must be the same price or lower.', 700, 1100, 860, {
      fontSize: 26,
      fontWeight: 400,
      fill: '#a1a1aa',
    }),
  );

const brand = () =>
  page(
    INK,
    group(
      rect(120, 90, 600, 420, linear(135, AMBER.from, AMBER.to), {
        cornerRadius: 40,
        ...shadow(50, 20, 'rgba(247,103,7,0.35)'),
      }),
      icon('folder', 180, 160, 140, INK, { strokeWidth: 1.6 }),
      text('Review Kit', 360, 190, 340, {
        fontFamily: HEAD,
        fontSize: 48,
        fontWeight: 800,
        fill: INK,
      }),
      text('16.2 MB', 360, 254, 300, { fontSize: 28, fontWeight: 500, fill: '#3b2a10' }),
      rect(180, 390, 420, 46, 'rgba(0,0,0,0.2)', { cornerRadius: 23, name: 'Progress track' }),
      rect(180, 390, 330, 46, INK, { cornerRadius: 23, name: 'Progress' }),
      icon('circle-check', 540, 378, 70, INK),
    ),
    text('This is', 820, 100, 700, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 900,
      fill: WHITE,
    }),
    text('Brightline', 820, 190, 760, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: WHITE,
    }),
    text('Studio', 820, 295, 700, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: AMBER.from,
    }),
    text('More than a template', 820, 420, 760, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: WHITE,
    }),
    rect(0, 620, W, 580, '#f4f4f5', { name: 'Strip' }),
    POSTS.map((item, index) => fitWidth(item, 40 + index * 312, 730, 288)),
  );

export const amberClientReviewsPack = definePack({
  id: 'amber-client-reviews',
  title: 'Amber Client Reviews',
  description:
    'Testimonial and client review posts for AI and digital agencies in amber, orange and black.',
  category: 'social-posts',
  tags: ['review', 'instagram', 'story', 'ai', 'photo'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [cover, showcase, deliverables, editable, howItWorks, bonus, brand],
});

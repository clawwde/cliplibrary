import { linear } from '@/design';
import {
  arrow,
  card,
  circle,
  group,
  icon,
  numbered,
  page,
  phone,
  phoneScreen,
  photo,
  pill,
  place,
  rect,
  shadow,
  star,
  text,
} from '../../../kit';
import { definePack, LANDSCAPE } from '../../../pack';
import {
  COBALT,
  MINI_POSTS,
  PLUM,
  POST,
  spotlightBadge,
  takeTheSeat,
  verticalHiring,
  weAreHiring,
  welcomePost,
} from './posts';

const { width: W, height: H } = LANDSCAPE;
const INK = COBALT.ink;
const HEAD = 'Outfit';

const tile = (index: number, x: number, y: number, scale: number) => {
  const build = MINI_POSTS[index % MINI_POSTS.length] ?? weAreHiring;
  return place(x, y, scale, build(COBALT));
};

const cover = () =>
  page(
    INK,
    [0, 1, 2].map((row) =>
      [0, 1, 2, 3, 4].map((column) =>
        tile(row * 2 + column, 14 + column * 318, 14 + row * 394, 0.28),
      ),
    ),
    rect(0, 0, W, H, 'rgba(11,13,23,0.45)', { name: 'Dim' }),
    card(370, 330, 860, 520, { radius: 40 }),
    text('Ready-to-Post', 430, 380, 760, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 800,
      fill: INK,
    }),
    text('Hiring & Team', 430, 480, 760, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 800,
      fill: COBALT.brand,
    }),
    text('Small Business Recruiting', 430, 600, 760, { fontSize: 40, fontWeight: 700, fill: INK }),
    text('5 editable social posts + 5 stories', 430, 656, 760, {
      fontSize: 34,
      fontWeight: 500,
      fill: '#4b5563',
    }),
    pill('BONUS INSIDE  →  SWIPE TO SEE IT', 430, 730, {
      fill: INK,
      color: '#ffffff',
      fontSize: 28,
      letterSpacing: 1,
    }),
    group(
      rect(1080, 640, 120, 120, linear(135, '#22d3ee', '#7c3aed'), {
        cornerRadius: 28,
        ...shadow(24, 10),
      }),
      icon('wand-sparkles', 1110, 670, 60, '#ffffff'),
    ),
  );

const showcase = () =>
  page(
    INK,
    text('Team Spotlight & Hiring Posts', 0, 70, W, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text('Polished layouts, tuned for engagement', 0, 170, W, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#9ca3af',
      align: 'center',
    }),
    place(170, 300, 0.36, takeTheSeat(COBALT)),
    place(600, 260, 0.36, weAreHiring(COBALT)),
    place(1030, 300, 0.36, spotlightBadge(COBALT)),
    place(380, 780, 0.28, welcomePost(COBALT)),
    place(900, 780, 0.28, verticalHiring(COBALT)),
    text('PREMIUM', 980, 1040, 640, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: 'rgba(0,0,0,0)',
      stroke: '#ffffff',
      strokeWidth: 3,
      rotation: -18,
    }),
  );

const miniPhone = (x: number, y: number, build: typeof weAreHiring) => {
  const screen = phoneScreen(170);
  return phone(x, y, 170, {
    screen: '#ffffff',
    content: [place(0, screen.height * 0.2, screen.width / POST.width, build(COBALT))],
  });
};

const deliverables = () =>
  page(
    INK,
    text('Ready-to-post content.', 120, 70, 1200, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(120, 220, 1360, 860, { radius: 36 }),
    text('Perfect for:', 200, 290, 400, { fontSize: 40, fontWeight: 700, fill: INK }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(500 + index * 110, 314, 40, COBALT.brand),
      icon(name, 478 + index * 110, 292, 44, '#ffffff'),
    ]),
    text('What you get:', 200, 420, 600, { fontSize: 40, fontWeight: 700, fill: INK }),
    miniPhone(200, 510, weAreHiring),
    text('5', 420, 640, 200, { fontFamily: HEAD, fontSize: 110, fontWeight: 800, fill: INK }),
    text('Social media posts', 420, 780, 360, { fontSize: 32, fontWeight: 500, fill: '#374151' }),
    rect(420, 840, 340, 4, '#111827', { name: 'Divider' }),
    text('1080 × 1350 px', 420, 870, 360, { fontSize: 28, fontWeight: 500, fill: '#6b7280' }),
    miniPhone(840, 510, takeTheSeat),
    text('5', 1060, 640, 200, { fontFamily: HEAD, fontSize: 110, fontWeight: 800, fill: INK }),
    text('Stories', 1060, 780, 360, { fontSize: 32, fontWeight: 500, fill: '#374151' }),
    rect(1060, 840, 340, 4, '#111827', { name: 'Divider' }),
    text('1080 × 1920 px', 1060, 870, 360, { fontSize: 28, fontWeight: 500, fill: '#6b7280' }),
  );

const editable = () =>
  page(
    INK,
    text('Fully editable\nposts in the\nbuilt-in editor', 90, 150, 620, {
      fontFamily: HEAD,
      fontSize: 78,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.12,
    }),
    star(5, 600, 90, 60, '#ffffff', { innerRatio: 0.42 }),
    rect(90, 560, 560, 4, '#ffffff', { dashed: true, name: 'Divider' }),
    text('Restyle in minutes', 90, 620, 600, { fontSize: 52, fontWeight: 600, fill: '#ffffff' }),
    text('Every layer can be changed', 90, 700, 600, {
      fontSize: 40,
      fontWeight: 600,
      fill: COBALT.accent,
    }),
    place(760, 90, 0.36, verticalHiring(COBALT)),
    circle(1210, 330, 54, '#ffffff'),
    arrow(1180, 330, 60, COBALT.brand, 10),
    place(1300, 90, 0.27, verticalHiring(PLUM)),
    place(760, 640, 0.36, spotlightBadge(COBALT)),
    circle(1210, 880, 54, '#ffffff'),
    arrow(1180, 880, 60, COBALT.brand, 10),
    place(1300, 700, 0.27, spotlightBadge(PLUM)),
  );

const howItWorks = () =>
  page(
    INK,
    text('How it works', 120, 90, 1200, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(120, 260, 1100, 760, { radius: 36 }),
    numbered(
      [
        'Open the poster from the library',
        'Swap text, colours, photos and fonts',
        'Download PNG, JPG or PDF and post',
      ],
      200,
      360,
      980,
      { fontSize: 44, numberColor: COBALT.brand, gap: 130 },
    ),
    text('No design skills needed: everything runs in your browser.', 200, 880, 980, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#4b5563',
    }),
    icon('mouse', 1300, 420, 180, COBALT.accent, { strokeWidth: 1.5 }),
  );

const bonus = () =>
  page(
    INK,
    icon('gift', 110, 70, 150, COBALT.accent, { strokeWidth: 1.6 }),
    text('Bonus', 280, 110, 500, {
      fontFamily: HEAD,
      fontSize: 90,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    pill('Grab one pack, pick a second one free', 110, 300, {
      fill: COBALT.brand,
      fontSize: 40,
      color: '#ffffff',
    }),
    pill('Just send us a note after checkout', 110, 430, {
      fill: COBALT.brand,
      fontSize: 40,
      color: '#ffffff',
    }),
    pill('Limited window: offer ends soon', 110, 560, {
      fill: COBALT.brand,
      fontSize: 40,
      color: '#ffffff',
    }),
    circle(400, 1010, 250, linear(135, COBALT.brand, '#22d3ee')),
    photo('man-portrait-2', 190, 800, 420, 420, { cornerRadius: 210 }),
    text('Northwind', 760, 800, 760, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text('Studio', 760, 910, 760, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 800,
      fill: COBALT.accent,
    }),
    text('*Second pack must be the same price or lower.', 760, 1060, 760, {
      fontSize: 26,
      fontWeight: 400,
      fill: '#9ca3af',
    }),
  );

const brand = () =>
  page(
    INK,
    group(
      rect(120, 90, 560, 420, linear(135, '#5eead4', '#14b8a6'), {
        cornerRadius: 40,
        ...shadow(40, 18, 'rgba(20,184,166,0.35)'),
      }),
      icon('folder', 180, 160, 140, '#ffffff', { strokeWidth: 1.6 }),
      text('We Engage', 360, 190, 300, { fontSize: 44, fontWeight: 600, fill: '#ffffff' }),
      text('18.4 MB', 360, 250, 300, {
        fontSize: 28,
        fontWeight: 500,
        fill: 'rgba(255,255,255,0.8)',
      }),
      rect(180, 380, 400, 44, 'rgba(0,0,0,0.2)', { cornerRadius: 22, name: 'Progress track' }),
      rect(180, 380, 320, 44, '#ffffff', { cornerRadius: 22, name: 'Progress' }),
      icon('circle-check', 510, 300, 70, '#ffffff'),
    ),
    text('This is', 800, 110, 700, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text('Northwind', 800, 200, 700, {
      fontFamily: HEAD,
      fontSize: 90,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text('Studio', 800, 300, 700, {
      fontFamily: HEAD,
      fontSize: 90,
      fontWeight: 800,
      fill: '#5eead4',
    }),
    text('More than a template', 800, 420, 700, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 700,
      fill: '#ffffff',
    }),
    rect(0, 640, W, 560, '#eef2ff', { name: 'Strip' }),
    [0, 1, 2, 3, 4].map((index) => tile(index + 2, 40 + index * 312, 690, 0.27)),
  );

export const hiringSpotlightPack = definePack({
  id: 'hiring-spotlight',
  title: 'Hiring Spotlight',
  description:
    'Recruitment, welcome and team spotlight posts in cobalt and sunflower, with matching stories.',
  category: 'social-posts',
  tags: ['hiring', 'instagram', 'small-business', 'photo'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [cover, showcase, deliverables, editable, howItWorks, bonus, brand],
});

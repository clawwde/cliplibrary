import type { DesignIconName } from '@/design';
import { linear } from '@/design';
import {
  avatar,
  card,
  circle,
  cycle,
  fitBox,
  fitWidth,
  group,
  icon,
  line,
  mosaic,
  numbered,
  page,
  phone,
  phoneScreen,
  pill,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { globalCoverage, HEAD, LILAC, LIME, quoteCard } from './posts';
import { POSTS } from './posts-more';

const { width: W, height: H } = LANDSCAPE;
const BACKDROP = linear(135, '#0b0d10', '#26330f');
const INK = '#0b0d10';
const OLIVE = '#4d7c0f';
const BODY = 'Inter';

const editorBadge = (x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, LIME.accent, '#4d7c0f'), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.3, size * 0.1, 'rgba(0,0,0,0.4)'),
    }),
    icon('wand-sparkles', x + size * 0.24, y + size * 0.24, size * 0.52, INK, { strokeWidth: 2 }),
  );

const profileContent = (width: number, posts: readonly Template[]) => {
  const screen = phoneScreen(width);
  const sw = screen.width;
  const cell = sw / 3;
  const top = screen.height * 0.36;
  return [
    circle(sw * 0.17, screen.height * 0.1, sw * 0.1, INK),
    icon('arrow-up-right', sw * 0.11, screen.height * 0.1 - sw * 0.06, sw * 0.12, LIME.accent, {
      strokeWidth: 2.5,
    }),
    [
      ['124', 'Posts'],
      ['18k', 'Followers'],
      ['312', 'Following'],
    ].map(([value, label], index) =>
      text(`${value}\n${label}`, sw * (0.32 + index * 0.215), screen.height * 0.075, sw * 0.215, {
        fontFamily: BODY,
        fontSize: sw * 0.034,
        fontWeight: 600,
        fill: '#111827',
        align: 'center',
        lineHeight: 1.25,
      }),
    ),
    text('Vectra Labs', sw * 0.07, screen.height * 0.17, sw * 0.86, {
      fontFamily: BODY,
      fontSize: sw * 0.05,
      fontWeight: 700,
      fill: '#111827',
    }),
    text(
      'Templates for serious builders.\nShip faster, look sharper.',
      sw * 0.07,
      screen.height * 0.205,
      sw * 0.86,
      {
        fontFamily: BODY,
        fontSize: sw * 0.036,
        fontWeight: 400,
        fill: '#4b5563',
        lineHeight: 1.3,
      },
    ),
    ['Following', 'Message'].map((label, index) => [
      rect(sw * (0.07 + index * 0.44), screen.height * 0.28, sw * 0.4, sw * 0.08, '#e5e7eb', {
        cornerRadius: sw * 0.02,
        name: `${label} button`,
      }),
      text(label, sw * (0.07 + index * 0.44), screen.height * 0.28 + sw * 0.018, sw * 0.4, {
        fontFamily: BODY,
        fontSize: sw * 0.036,
        fontWeight: 600,
        fill: '#111827',
        align: 'center',
      }),
    ]),
    Array.from({ length: 9 }, (_, index) =>
      fitBox(
        cycle(posts, index),
        (index % 3) * cell + 1,
        top + Math.floor(index / 3) * cell * 1.25,
        cell - 2,
        cell * 1.25 - 2,
      ),
    ),
  ];
};

const cover = () =>
  page(
    BACKDROP,
    mosaic(LANDSCAPE, POSTS, { columns: 5 }),
    rect(0, 0, W, H, 'rgba(0,0,0,0.32)', { name: 'Dim' }),
    card(300, 90, 860, 470, { radius: 36, shadowBlur: 60 }),
    text('Posts for SaaS', 300, 130, 860, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 700,
      fill: INK,
      align: 'center',
    }),
    text('& AI Startups', 300, 235, 860, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 700,
      fill: OLIVE,
      align: 'center',
    }),
    text('39 editable SaaS templates', 300, 360, 860, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 500,
      fill: '#374151',
      align: 'center',
    }),
    pill('+9 BONUS', 600, 440, {
      fill: INK,
      color: LIME.accent,
      fontSize: 40,
      fontFamily: HEAD,
      fontWeight: 700,
      width: 260,
    }),
    phone(250, 480, 330, { screen: '#ffffff', rotation: -10, content: profileContent(330, POSTS) }),
    editorBadge(1190, 480, 180),
  );

const showcase = () =>
  page(
    BACKDROP,
    text('48 Social Posts and Stories\nfor SaaS Founders', 0, 50, W, {
      fontFamily: HEAD,
      fontSize: 68,
      fontWeight: 700,
      fill: '#ffffff',
      align: 'center',
      lineHeight: 1.15,
    }),
    text('Made for every social channel you post on', 0, 232, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: '#d9e3c8',
      align: 'center',
    }),
    Array.from({ length: 10 }, (_, index) =>
      fitWidth(
        cycle(POSTS, index + 1),
        16 + (index % 5) * 316,
        320 + Math.floor(index / 5) * 400,
        300,
      ),
    ),
  );

const editRow = (y: number, before: Template, after: Template) => [
  fitBox(before, 600, y, 360, 450),
  circle(1050, y + 225, 56, '#ffffff'),
  icon('arrow-right', 1018, y + 193, 64, OLIVE, { strokeWidth: 3 }),
  fitBox(after, 1140, y, 360, 450),
];

const editable = () =>
  page(
    BACKDROP,
    text(['Editable', 'Social Posts', 'in Your', 'Browser'].join('\n'), 90, 110, 560, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 700,
      fill: '#ffffff',
      lineHeight: 1.12,
    }),
    line(90, 540, 440, '#ffffff', 4, { dashed: true }),
    text('Customize in\nMinutes', 90, 620, 460, {
      fontFamily: BODY,
      fontSize: 52,
      fontWeight: 600,
      fill: '#ffffff',
      lineHeight: 1.3,
    }),
    text('100% Editable', 90, 770, 460, {
      fontFamily: BODY,
      fontSize: 46,
      fontWeight: 700,
      fill: LIME.accent,
    }),
    editRow(120, globalCoverage(LIME), globalCoverage(LILAC)),
    editRow(640, quoteCard(LIME), quoteCard(LILAC)),
  );

const CHANNELS: readonly DesignIconName[] = ['globe', 'briefcase', 'camera'];

const SLOGANS = [
  'From idea to post in minutes',
  'Stop designing. Start growing.',
  'Just ready-to-post content.',
];

const slogans = () =>
  page(
    BACKDROP,
    CHANNELS.map((name, index) => [
      rect(535 + index * 200, 70, 130, 130, linear(135, LIME.accent, OLIVE), {
        cornerRadius: 32,
        name: 'Channel tile',
      }),
      icon(name, 568 + index * 200, 103, 64, INK, { strokeWidth: 2 }),
    ]),
    SLOGANS.map((slogan, index) => [
      rect(140, 290 + index * 190, 1320, 140, 'rgba(0,0,0,0.5)', {
        cornerRadius: 24,
        name: 'Slogan bar',
      }),
      text(slogan, 140, 322 + index * 190, 1320, {
        fontFamily: HEAD,
        fontSize: 64,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'center',
      }),
    ]),
    text('Built for founders who ship.', 140, 930, 900, {
      fontFamily: BODY,
      fontSize: 40,
      fontWeight: 500,
      fill: '#d9e3c8',
    }),
    avatar('man-portrait-1', 1400, 1060, 230, LIME.accent),
  );

const howItWorks = () =>
  page(
    BACKDROP,
    text('How it works', 0, 50, W, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 700,
      fill: '#ffffff',
      align: 'center',
    }),
    card(140, 230, 1320, 820, { radius: 36 }),
    numbered(
      [
        'Instant download after checkout',
        'Open your templates in the editor',
        'Edit text, colours and branding',
        'Export and post on every channel',
      ],
      560,
      340,
      860,
      { fontSize: 42, fontFamily: BODY, color: INK, numberColor: OLIVE, gap: 120 },
    ),
    phone(90, 300, 330, { screen: '#ffffff', rotation: -8, content: profileContent(330, POSTS) }),
    text('No design skills needed: everything runs in your browser.', 560, 900, 860, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: '#374151',
      align: 'left',
    }),
  );

export const PAGES = [cover, showcase, editable, slogans, howItWorks];

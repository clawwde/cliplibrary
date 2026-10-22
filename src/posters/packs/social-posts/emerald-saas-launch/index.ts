import { linear } from '@/design';
import {
  card,
  circle,
  cycle,
  fitBox,
  fitWidth,
  group,
  icon,
  mosaic,
  numbered,
  page,
  phone,
  phoneScreen,
  photo,
  pill,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { definePack, LANDSCAPE } from '../../../pack';
import {
  allInOne,
  EMERALD,
  HEAD,
  hundredClients,
  SUNSET,
  saasBusiness,
  usersChoose,
  WHITE,
  zeroConfusion,
} from './posts';
import { aiAutomations, clearDecision, getInformed, newFeature, threeSteps } from './posts-more';

const { width: W, height: H } = LANDSCAPE;
const PAGE = linear(135, '#0f9f73', '#0a7a57');
const INK = '#04281f';

const POSTS = [
  allInOne,
  zeroConfusion,
  saasBusiness,
  hundredClients,
  usersChoose,
  aiAutomations,
  newFeature,
  threeSteps,
  getInformed,
  clearDecision,
].map((build) => build(EMERALD));

const editorBadge = (x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, '#34d399', '#4f46e5'), {
      cornerRadius: size * 0.24,
      name: 'Editor badge',
      ...shadow(30, 12),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, WHITE),
  );

const profilePhone = (x: number, y: number, width: number, rotation: number) => {
  const screen = phoneScreen(width);
  const cell = screen.width / 3;
  const gridTop = screen.height * 0.34;
  return phone(x, y, width, {
    screen: WHITE,
    rotation,
    content: [
      circle(
        screen.width * 0.17,
        screen.height * 0.12,
        screen.width * 0.1,
        linear(135, EMERALD.top, INK),
      ),
      icon(
        'mountain',
        screen.width * 0.11,
        screen.height * 0.12 - screen.width * 0.06,
        screen.width * 0.12,
        WHITE,
      ),
      ['42', '18K', '310'].map((value, index) =>
        text(value, screen.width * (0.36 + index * 0.21), screen.height * 0.1, screen.width * 0.2, {
          fontSize: screen.width * 0.055,
          fontWeight: 800,
          fill: '#111827',
          align: 'center',
        }),
      ),
      text('northpeak.studio', screen.width * 0.07, screen.height * 0.2, screen.width * 0.86, {
        fontSize: screen.width * 0.05,
        fontWeight: 700,
        fill: '#111827',
      }),
      text(
        'Growth content for SaaS teams',
        screen.width * 0.07,
        screen.height * 0.245,
        screen.width * 0.86,
        {
          fontSize: screen.width * 0.038,
          fontWeight: 400,
          fill: '#4b5563',
        },
      ),
      Array.from({ length: 9 }, (_, index) =>
        fitBox(
          cycle(POSTS, index),
          (index % 3) * cell,
          gridTop + Math.floor(index / 3) * cell * 1.25,
          cell - 3,
          cell * 1.25 - 3,
        ),
      ),
    ],
  });
};

const cover = () =>
  page(
    PAGE,
    mosaic(LANDSCAPE, POSTS, { columns: 6, gap: 18 }),
    rect(0, 0, W, H, 'rgba(4,40,31,0.25)', { name: 'Dim' }),
    card(330, 90, 940, 500, { radius: 40 }),
    text('Posts for SaaS', 330, 140, 940, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: '#0a7a57',
      align: 'center',
    }),
    text('& AI startups', 330, 262, 940, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: '#0a7a57',
      align: 'center',
    }),
    text('40 editable SaaS templates', 330, 400, 940, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 600,
      fill: INK,
      align: 'center',
    }),
    pill('+2 BONUS', 670, 470, {
      fill: '#0a7a57',
      color: WHITE,
      fontSize: 36,
      fontFamily: HEAD,
      fontWeight: 800,
      width: 260,
    }),
    profilePhone(250, 520, 300, -12),
    editorBadge(1180, 500, 170),
  );

const showcase = () =>
  page(
    PAGE,
    text('42 Social Posts and Stories\nfor SaaS Founders', 0, 50, W, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: WHITE,
      align: 'center',
      lineHeight: 1.1,
    }),
    text('Sized for every feed and professional network', 0, 240, W, {
      fontSize: 32,
      fontWeight: 500,
      fill: '#d1fae5',
      align: 'center',
    }),
    POSTS.map((item, index) =>
      fitWidth(item, 35 + (index % 5) * 310, 320 + Math.floor(index / 5) * 440, 290),
    ),
  );

const framed = (item: Template, x: number, y: number) => [
  rect(x - 3, y - 3, 406, 506, 'rgba(0,0,0,0)', {
    stroke: 'rgba(255,255,255,0.5)',
    strokeWidth: 3,
    name: 'Frame',
  }),
  fitBox(item, x, y, 400, 500),
];

const arrowBubble = (cx: number, cy: number) => [
  circle(cx, cy, 52, WHITE),
  icon('arrow-right', cx - 30, cy - 30, 60, INK, { strokeWidth: 3 }),
];

const editable = () =>
  page(
    PAGE,
    text('Editable\nSocial Posts\nin Your\nBrowser', 80, 130, 560, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: WHITE,
      lineHeight: 1.08,
    }),
    rect(80, 560, 480, 4, WHITE, { dashed: true, name: 'Divider' }),
    text('Customize in\nminutes', 80, 610, 500, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 700,
      fill: WHITE,
      lineHeight: 1.15,
    }),
    text('100% editable', 80, 760, 500, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 800,
      fill: '#d1fae5',
    }),
    framed(getInformed(EMERALD), 640, 70),
    arrowBubble(1110, 320),
    framed(getInformed(SUNSET), 1180, 70),
    framed(newFeature(EMERALD), 640, 630),
    arrowBubble(1110, 880),
    framed(newFeature(SUNSET), 1180, 630),
  );

const TAGLINES = [
  'From idea to post in minutes',
  'Stop designing. Start growing.',
  'Just ready-to-post content.',
];

const taglines = () =>
  page(
    PAGE,
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(640 + index * 160, 130, 56, WHITE),
      icon(name, 608 + index * 160, 98, 64, '#0a7a57', { strokeWidth: 2 }),
    ]),
    TAGLINES.map((line, index) => [
      rect(260, 260 + index * 150, 1080, 116, INK, { cornerRadius: 22, name: 'Tagline' }),
      text(line, 260, 288 + index * 150, 1080, {
        fontFamily: HEAD,
        fontSize: 54,
        fontWeight: 800,
        fill: WHITE,
        align: 'center',
      }),
    ]),
    [POSTS[0], POSTS[3], POSTS[6]].map((item, index) =>
      item === undefined ? [] : fitWidth(item, 120 + index * 290, 760, 260),
    ),
    photo('man-portrait-3', 1080, 720, 420, 480, { cornerRadius: 40 }),
  );

const howItWorks = () =>
  page(
    PAGE,
    text('How it works', 560, 70, 900, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: WHITE,
    }),
    card(360, 220, 1160, 880, { radius: 36 }),
    profilePhone(90, 210, 400, -8),
    numbered(
      [
        'Instant download after checkout',
        'Open your templates in the editor',
        'Edit text, colours and branding',
        'Export and post on every channel',
      ],
      600,
      330,
      860,
      { fontSize: 42, numberColor: '#0a7a57', gap: 130, fontFamily: HEAD, color: INK },
    ),
    text('No design skills needed: everything runs in your browser.', 600, 900, 860, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#4b5563',
    }),
  );

export const emeraldSaasLaunchPack = definePack({
  id: 'emerald-saas-launch',
  title: 'Emerald SaaS Posts',
  description:
    'Glassy emerald posts for SaaS and AI startups: features, stats, steps and product updates.',
  category: 'social-posts',
  tags: ['saas', 'ai', 'instagram', 'linkedin', 'gradient'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [cover, showcase, editable, taglines, howItWorks],
});

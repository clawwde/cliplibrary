import { type DesignIconName, linear } from '@/design';
import { icon, path, photo, pill, rating, rect, template, text } from '../../../kit';
import {
  BODY,
  copy,
  darkBg,
  dashboardScreen,
  device,
  HEAD,
  iconTile,
  kicker,
  LAGOON,
  lightBg,
  profileScreen,
  SH,
  SW,
  title,
} from './deck-kit';

const T = LAGOON;

const point = (degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return `${(100 + 80 * Math.sin(radians)).toFixed(2)} ${(100 - 80 * Math.cos(radians)).toFixed(2)}`;
};

const arc = (
  x: number,
  y: number,
  size: number,
  from: number,
  to: number,
  color: string,
  width: number,
) =>
  path(
    `M${point(from)} A80 80 0 ${to - from > 180 ? 1 : 0} 1 ${point(to)}`,
    x,
    y,
    size,
    size,
    'rgba(0,0,0,0)',
    { width: 200, height: 200 },
    { stroke: color, strokeWidth: width, name: 'Arc' },
  );

const segments: readonly { share: string; label: string; body: string; icon: DesignIconName }[] = [
  {
    share: '58%',
    label: 'Product Leaders',
    body: 'Own roadmaps and need clear usage data.',
    icon: 'briefcase',
  },
  {
    share: '26%',
    label: 'Growth Marketers',
    body: 'Run lifecycle campaigns across channels.',
    icon: 'megaphone',
  },
  {
    share: '16%',
    label: 'Startup Founders',
    body: 'Want fast insight without a data team.',
    icon: 'rocket',
  },
];

export const audienceSlide = template(SW, SH, () => [
  lightBg(T),
  title('Target Audience', 120, 100, 1000, 88, T.ink),
  arc(220, 300, 620, 2, 207, T.mid, 34),
  arc(220, 300, 620, 211, 299, T.glow, 34),
  arc(220, 300, 620, 303, 358, T.warm, 34),
  text('Key\nSegments', 220, 545, 620, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: T.ink,
    align: 'center',
    lineHeight: 1.1,
  }),
  segments.map((segment, index) => {
    const y = 320 + index * 200;
    const tint = [T.mid, T.glow, T.warm][index] ?? T.mid;
    return [
      iconTile(segment.icon, 960, y, 96, tint),
      text(`${segment.share}  ${segment.label}`, 1090, y + 6, 720, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 800,
        fill: T.ink,
      }),
      copy(segment.body, 1090, y + 60, 720, 26, T.muted),
    ];
  }),
]);

const review = (quote: string, name: string, role: string, y: number) => [
  rect(900, y, 900, 270, '#ffffff', { cornerRadius: 28, name: 'Review card' }),
  rating(940, y + 36, 30, 5, T.warm),
  copy(quote, 940, y + 86, 820, 28, T.ink),
  text(name, 940, y + 186, 500, { fontFamily: HEAD, fontSize: 28, fontWeight: 800, fill: T.ink }),
  text(role, 940, y + 222, 500, { fontFamily: BODY, fontSize: 22, fontWeight: 500, fill: T.muted }),
  pill('Read story', 1580, y + 196, {
    fill: T.mid,
    color: '#ffffff',
    fontSize: 22,
    fontFamily: BODY,
  }),
];

export const reviewsSlide = template(SW, SH, () => [
  lightBg(T),
  device(T, dashboardScreen, 130, 140, 300, -6),
  device(T, profileScreen, 400, 230, 300, 6),
  rect(560, 760, 230, 200, linear(150, T.deep, T.mid), { cornerRadius: 32, name: 'Score badge' }),
  text('App score', 560, 790, 230, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: T.soft,
    align: 'center',
  }),
  text('4.7', 560, 830, 230, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  kicker('User testimonials', 900, 110, T.mid),
  title('Rave Reviews', 900, 150, 900, 96, T.ink),
  review(
    '"The dashboards finally made our weekly reviews fast. We cut prep time in half."',
    'Priya Raman',
    'VP Customer Success, Fernwell',
    320,
  ),
  review(
    '"Onboarding new teammates takes minutes now. The alerts alone paid for it."',
    'Marcus Holt',
    'Product Lead, Brightpath',
    640,
  ),
]);

export const wordsSlide = template(SW, SH, () => [
  darkBg(T),
  text('Plan.\nLaunch.\nGrow.', 120, 110, 1000, {
    fontFamily: HEAD,
    fontSize: 236,
    fontWeight: 800,
    fill: '#ffffff',
    lineHeight: 0.98,
  }),
  photo('phone-hand-1', 1160, 90, 640, 900, { cornerRadius: 44 }),
]);

export const impactStorySlide = template(SW, SH, () => [
  lightBg(T),
  title('Real-World\nImpact', 120, 100, 800, 96, T.ink),
  rect(120, 430, 720, 360, linear(150, T.deep, T.mid), { cornerRadius: 32, name: 'Quote card' }),
  pill('Ana, Growth Lead', 160, 470, {
    fill: T.glow,
    color: T.deep,
    fontSize: 22,
    fontFamily: BODY,
    fontWeight: 700,
  }),
  text('Spends 15+ hours a week on manual reports, which slows every launch.', 160, 560, 640, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: '#ffffff',
    lineHeight: 1.2,
  }),
  photo('woman-portrait-6', 900, 110, 520, 860, { cornerRadius: 40 }),
  pill('SOLUTION', 1480, 300, { fill: T.mid, color: '#ffffff', fontSize: 22, fontFamily: BODY }),
  copy('Automate reports and asset prep so approvals stop stalling.', 1480, 370, 360, 26, T.ink),
  pill('IMPACT', 1480, 600, { fill: T.ink, color: '#ffffff', fontSize: 22, fontFamily: BODY }),
  copy('Kickoff time fell from 14 days to 3, and conversions rose.', 1480, 670, 360, 26, T.ink),
]);

const ICONS: readonly DesignIconName[] = [
  'wifi',
  'zap',
  'cloud',
  'code',
  'monitor',
  'database',
  'refresh-cw',
  'download',
  'upload',
  'phone',
  'rocket',
  'headphones',
  'keyboard',
  'laptop',
  'play',
  'cpu',
  'mouse',
  'gamepad-2',
  'mic',
  'message-square',
  'share-2',
  'git-branch',
  'camera',
  'layers',
  'video',
  'settings',
  'chart-bar',
  'radio-tower',
  'server',
  'brain',
  'smartphone',
  'printer',
  'shield-check',
  'lock',
  'key',
  'search',
  'bell',
  'calendar',
  'clock',
  'map-pin',
  'mail',
  'globe',
  'link',
  'user',
  'users',
  'briefcase',
  'store',
  'target',
  'trending-up',
  'chart-pie',
  'dollar-sign',
  'wallet',
  'credit-card',
  'shopping-cart',
  'gift',
  'tag',
  'award',
  'trophy',
  'crown',
  'flame',
  'heart',
  'star',
  'bookmark',
  'send',
  'image',
  'music',
  'tablet',
  'terminal',
  'bot',
  'puzzle',
  'workflow',
  'megaphone',
  'lightbulb',
  'sparkles',
  'compass',
  'qr-code',
  'scan-face',
  'wand-sparkles',
];

export const iconSheet = (start: number) =>
  template(SW, SH, () => [
    lightBg(T),
    Array.from({ length: 78 }, (_, index) => {
      const name = ICONS[(index + start) % ICONS.length] ?? 'star';
      return icon(name, 170 + (index % 13) * 128, 170 + Math.floor(index / 13) * 128, 64, T.ink, {
        strokeWidth: 2,
      });
    }),
  ]);

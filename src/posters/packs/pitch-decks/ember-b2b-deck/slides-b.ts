import type { DesignIconName } from '@/design';
import {
  avatar,
  checklist,
  circle,
  icon,
  line,
  photo,
  rating,
  rect,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import {
  BODY,
  background,
  body,
  EMBER,
  HEAD,
  heading,
  ratingDots,
  SH,
  SW,
  strong,
  tag,
} from './deck-kit';

const E = EMBER;

export const metricsSlide = template(SW, SH, () => [
  background(E.accent),
  heading('CTR', 90, 60, 120, E.ink, 500),
  body('Paid social ads', 90, 200, 500, 30, E.ink),
  rect(640, 260, 1280, 820, E.paper, { name: 'Step' }),
  heading('ROI', 700, 300, 120, E.ink, 500),
  body('Email marketing', 700, 440, 500, 30, E.ink),
  rect(1280, 520, 640, 560, E.ink, { name: 'Step' }),
  heading('REV', 1340, 560, 120, E.paper, 500),
  body('Content marketing', 1340, 700, 500, 30, E.paper),
  heading('30x', 90, 860, 170, E.ink, 500),
  heading('75%', 700, 860, 170, E.ink, 500),
  heading('500+', 1340, 860, 170, E.paper, 500),
]);

const team: readonly { photo: PosterPhotoName; name: string; role: string; bio: string }[] = [
  {
    photo: 'woman-portrait-1',
    name: 'Samira Cole',
    role: 'Lead Strategist',
    bio: 'Shapes go-to-market plans and positioning for every client.',
  },
  {
    photo: 'man-portrait-1',
    name: 'Jonas Reed',
    role: 'Creative Director',
    bio: 'Builds brand worlds that stay sharp across every channel.',
  },
  {
    photo: 'woman-portrait-5',
    name: 'Elise Moreau',
    role: 'Systems Lead',
    bio: 'Automates reporting so teams can focus on the next idea.',
  },
];

export const teamSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Meet Our Team', 0, 70, 130, E.paper, SW, 'center'),
  team.map((member, index) => {
    const cx = 420 + index * 540;
    return [
      avatar(member.photo, cx, 460, 170, E.accent),
      heading(member.name, cx - 250, 680, 60, E.paper, 500, 'center'),
      text(member.role.toUpperCase(), cx - 250, 762, 500, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 800,
        fill: E.accent,
        align: 'center',
        letterSpacing: 2,
      }),
      body(member.bio, cx - 210, 810, 420, 24, '#c9cdd6', 'center'),
    ];
  }),
]);

const plans: readonly {
  name: string;
  price: string;
  icon: DesignIconName;
  fill: string;
  items: readonly string[];
}[] = [
  {
    name: 'Startup',
    price: '$0',
    icon: 'rocket',
    fill: E.accent,
    items: ['Dedicated lead', 'Social campaigns', 'Monthly reports', 'Channel tuning'],
  },
  {
    name: 'Growth',
    price: '$10',
    icon: 'trending-up',
    fill: E.soft,
    items: ['Dedicated team', 'Bi-weekly calls', 'Custom web design', 'CRM integration'],
  },
  {
    name: 'Enterprise',
    price: '$25',
    icon: 'building-2',
    fill: E.paper,
    items: ['Full agency access', 'Account-based ads', 'Live dashboard', 'Round-the-clock help'],
  },
];

export const pricingSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Pricing Options', 100, 70, 130, E.paper),
  plans.map((plan, index) => {
    const x = 100 + index * 590;
    return [
      rect(x, 290, 540, 720, plan.fill, { cornerRadius: 32, name: 'Plan card' }),
      icon(plan.icon, x + 235, 330, 70, E.ink, { strokeWidth: 2 }),
      heading(plan.name, x, 420, 72, E.ink, 540, 'center'),
      checklist(plan.items, x + 70, 540, 420, {
        color: E.ink,
        iconColor: E.ink,
        icon: 'check',
        fontSize: 28,
        gap: 62,
        fontFamily: BODY,
      }),
      heading(`${plan.price} /mo`, x, 860, 90, E.ink, 540, 'center'),
    ];
  }),
]);

const nodes: readonly { label: string; icon: DesignIconName; x: number; y: number }[] = [
  { label: 'Kitebase', icon: 'database', x: 1350, y: 190 },
  { label: 'Orbitly', icon: 'globe', x: 1720, y: 360 },
  { label: 'Pinewire', icon: 'git-branch', x: 1720, y: 720 },
  { label: 'Halcyon', icon: 'cloud', x: 1350, y: 890 },
  { label: 'Quarry', icon: 'layers', x: 980, y: 720 },
  { label: 'Brightloop', icon: 'zap', x: 980, y: 360 },
];

const link = (x1: number, y1: number, x2: number, y2: number) =>
  line(x1, y1, Math.hypot(x2 - x1, y2 - y1), E.ink, 4, {
    rotation: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
    name: 'Link',
  });

export const networkSlide = template(SW, SH, () => [
  background(E.paper),
  heading('Integrated\nNetwork', 100, 100, 130, E.ink),
  body(
    'Your stack, connected. We plug into the tools your team already uses and keep every channel in sync.',
    100,
    400,
    640,
    32,
    E.grey,
  ),
  strong('Ember Sync', 100, 820, 600, 48, E.accent),
  body('Live in 2 weeks', 100, 890, 600, 30, E.ink),
  nodes.map((node, index) => {
    const next = nodes[(index + 1) % nodes.length] ?? node;
    return [link(node.x, node.y, 1350, 540), link(node.x, node.y, next.x, next.y)];
  }),
  circle(1350, 540, 130, E.ink),
  icon('target', 1300, 440, 100, E.accent, { strokeWidth: 2 }),
  text('ORBITAL HUB', 1220, 560, 260, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 800,
    fill: E.paper,
    align: 'center',
  }),
  nodes.map((node) => [
    circle(node.x, node.y, 74, E.ink),
    icon(node.icon, node.x - 32, node.y - 46, 64, E.accent, { strokeWidth: 2 }),
    text(node.label.toUpperCase(), node.x - 70, node.y + 22, 140, {
      fontFamily: BODY,
      fontSize: 17,
      fontWeight: 800,
      fill: E.paper,
      align: 'center',
    }),
  ]),
]);

const criteria = ['Strategy', 'Onboarding', 'Performance', 'Integration', 'Pricing'] as const;
const scores: readonly (readonly number[])[] = [
  [3, 3, 3, 3, 3],
  [2, 2, 2, 1, 0],
  [1, 2, 1, 2, 1],
];

export const matrixSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Competitive Matrix', 0, 70, 130, E.paper, SW, 'center'),
  ['Our firm', 'Competitor A', 'Competitor B'].map((label, index) => [
    index === 0 ? rect(760, 290, 340, 60, E.accent, { cornerRadius: 12, name: 'Header' }) : [],
    text(label.toUpperCase(), 760 + index * 370, 304, 340, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 800,
      fill: index === 0 ? E.ink : E.paper,
      align: 'center',
      letterSpacing: 1,
    }),
  ]),
  criteria.map((label, row) => {
    const y = 400 + row * 120;
    return [
      text(label.toUpperCase(), 260, y + 24, 420, {
        fontFamily: BODY,
        fontSize: 28,
        fontWeight: 800,
        fill: E.paper,
        letterSpacing: 1,
      }),
      rect(260, y + 96, 1440, 3, 'rgba(255,255,255,0.18)', { name: 'Row rule' }),
      scores.map((values, column) =>
        ratingDots(
          890 + column * 370,
          y + 40,
          values[row] ?? 0,
          column === 0 ? E.accent : E.paper,
          E.paper,
        ),
      ),
    ];
  }),
]);

const reviews = [
  { quote: '"Their team rebuilt our funnel in a month."', brand: 'Kitebase' },
  { quote: '"The playbook transformed our outbound."', brand: 'Orbitly' },
  { quote: '"Clear reporting, real growth, zero fluff."', brand: 'Pinewire' },
  { quote: '"Pipeline doubled within two quarters."', brand: 'Halcyon' },
] as const;

export const clientsSlide = template(SW, SH, () => [
  background(E.accent),
  heading('Hear From\nOur Clients!', 100, 80, 150, E.ink, 1000),
  reviews.map((review, index) => {
    const x = 100 + (index % 2) * 520;
    const y = 470 + Math.floor(index / 2) * 260;
    const dark = index === 0 || index === 3;
    const color = dark ? E.paper : E.ink;
    return [
      rect(x, y, 490, 230, dark ? E.ink : E.paper, { cornerRadius: 26, name: 'Review' }),
      rating(x + 30, y + 30, 26, 5, dark ? E.accent : E.ink),
      body(review.quote, x + 30, y + 76, 430, 26, color),
      tag(review.brand, x + 30, y + 160, dark ? E.accent : E.ink, dark ? E.ink : E.paper),
    ];
  }),
  photo('phone-hand-2', 1180, 0, 740, SH),
  rect(1330, 330, 360, 360, E.paper, { cornerRadius: 40, name: 'Rating card' }),
  text('Rated', 1330, 370, 360, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: E.ink,
    align: 'center',
  }),
  text('4.7', 1330, 430, 360, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 400,
    fill: E.ink,
    align: 'center',
  }),
]);

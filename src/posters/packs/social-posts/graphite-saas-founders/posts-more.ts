import type { DesignIconName } from '@/design';
import {
  circle,
  icon,
  photo,
  pill,
  rect,
  rotateNodes,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import {
  aiAnalytics,
  BODY,
  base,
  brandMark,
  clientsCount,
  feedbackWall,
  globalCoverage,
  H,
  HEAD,
  LIME,
  quoteCard,
  type SaasPalette,
  W,
} from './posts';

const TRUST: readonly { icon: DesignIconName; label: string }[] = [
  { icon: 'layout-grid', label: 'Launch faster with\nready-made flows' },
  { icon: 'zap', label: 'No code needed to\nget started' },
  { icon: 'sparkles', label: 'Clean, polished\nresults instantly' },
];

const whyTeamsTrust = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Product demo'),
    text('Why teams trust', 0, 220, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 500,
      fill: p.paper,
      align: 'center',
    }),
    text('Vectra Labs?', 0, 310, W, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 700,
      fill: p.accent,
      align: 'center',
      ...shadow(26, 0, p.accent),
    }),
    TRUST.map((item, index) => {
      const y = 480 + index * 200;
      return [
        rect(110, y, 860, 170, p.card, {
          cornerRadius: 22,
          stroke: 'rgba(255,255,255,0.1)',
          strokeWidth: 2,
          name: 'Trust row',
        }),
        rect(140, y + 30, 110, 110, p.accent, { cornerRadius: 20, name: 'Icon tile' }),
        icon(item.icon, 165, y + 55, 60, p.onAccent, { strokeWidth: 2.2 }),
        text(item.label, 290, y + 40, 640, {
          fontFamily: BODY,
          fontSize: 36,
          fontWeight: 600,
          fill: p.paper,
          lineHeight: 1.2,
        }),
      ];
    }),
    text('Trusted by 1,200+ product teams', 0, 1130, W, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: p.soft,
      align: 'center',
    }),
    brandMark(p, 800, 1260),
  ]);

const timeWaits = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Behind the brand'),
    rotateNodes(-8, 450, 265, [
      rect(300, 230, 300, 70, p.accent, { cornerRadius: 8, name: 'Time tag' }),
      text('Time waits', 300, 242, 300, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 700,
        fill: p.onAccent,
        align: 'center',
      }),
    ]),
    text('For No One', 0, 310, W, {
      fontFamily: HEAD,
      fontSize: 116,
      fontWeight: 700,
      fill: p.paper,
      align: 'center',
      ...shadow(30, 0, 'rgba(255,255,255,0.35)'),
    }),
    text('Post when it matters', 0, 460, W, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 500,
      fill: p.soft,
      align: 'center',
    }),
    circle(540, 950, 300, p.card, { stroke: p.paper, strokeWidth: 6 }),
    Array.from({ length: 12 }, (_, index) =>
      rotateNodes(index * 30, 540, 950, [
        rect(533, 670, 14, index % 3 === 0 ? 60 : 36, p.paper, {
          cornerRadius: 4,
          name: 'Tick',
        }),
      ]),
    ),
    rotateNodes(-55, 540, 950, [
      rect(532, 770, 16, 190, p.accent, { cornerRadius: 8, name: 'Hour hand' }),
    ]),
    rotateNodes(40, 540, 950, [
      rect(535, 700, 10, 260, p.paper, { cornerRadius: 5, name: 'Minute hand' }),
    ]),
    circle(540, 950, 20, p.accent),
  ]);

const buildLeads = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Growth'),
    text('Build Leads', 80, 190, 920, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 600,
      fill: p.paper,
    }),
    text('That Matter', 80, 295, 920, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 700,
      fill: p.accent,
    }),
    photo('meeting-1', 80, 470, 920, 560, { cornerRadius: 28 }),
    pill('Join 200+ customers', 80, 1090, {
      fill: p.accent,
      color: p.onAccent,
      fontSize: 36,
      fontFamily: BODY,
      fontWeight: 700,
      width: 440,
    }),
    brandMark(p, 800, 1260),
  ]);

const eventCard = (
  p: SaasPalette,
  x: number,
  y: number,
  width: number,
  date: string,
  title: string,
  body: string,
) => [
  rect(x, y, width, 300, p.card, {
    cornerRadius: 22,
    stroke: 'rgba(255,255,255,0.1)',
    strokeWidth: 2,
    name: 'Event card',
  }),
  text(date, x + 36, y + 34, width - 72, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 700,
    fill: p.accent,
  }),
  text(title, x + 36, y + 96, width - 72, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 600,
    fill: p.paper,
    lineHeight: 1.15,
  }),
  text(body, x + 36, y + 200, width - 72, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 500,
    fill: p.soft,
    lineHeight: 1.35,
  }),
];

const upcomingEvents = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Company news'),
    text('Upcoming', 80, 190, 900, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 500,
      fill: p.paper,
    }),
    text('Events', 80, 295, 900, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 700,
      fill: p.accent,
    }),
    eventCard(
      p,
      80,
      470,
      600,
      '03/10',
      'Product launch live',
      'See every new feature in\naction with our founders.',
    ),
    rect(720, 470, 280, 300, p.accent, { cornerRadius: 22, name: 'Icon card' }),
    icon('calendar', 800, 560, 120, p.onAccent, { strokeWidth: 2 }),
    eventCard(p, 80, 800, 440, '10/08', 'Q&A session', 'Bring your toughest\nquestions.'),
    eventCard(
      p,
      560,
      800,
      440,
      '09/02',
      'New growth guide',
      'How to boost content\nreach in 30 days.',
    ),
    brandMark(p, 800, 1260),
  ]);

export const POSTS: readonly Template[] = [
  globalCoverage(LIME),
  aiAnalytics(LIME),
  quoteCard(LIME),
  feedbackWall(LIME),
  clientsCount(LIME),
  whyTeamsTrust(LIME),
  timeWaits(LIME),
  buildLeads(LIME),
  upcomingEvents(LIME),
];

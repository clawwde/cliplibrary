import {
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface StatTheme {
  brand: string;
  ink: string;
  paper: string;
  surface: string;
  copy: string;
  muted: string;
}

export const VIOLET: StatTheme = {
  brand: '#6d3df5',
  ink: '#0e0a1f',
  paper: '#ffffff',
  surface: '#ffffff',
  copy: '#0e0a1f',
  muted: '#4b4766',
};

export const CORAL: StatTheme = {
  brand: '#f2554a',
  ink: '#1d0907',
  paper: '#ffffff',
  surface: '#fff5ef',
  copy: '#1d0907',
  muted: '#6b4a45',
};

export const MIDNIGHT: StatTheme = {
  brand: '#9b7bff',
  ink: '#05040c',
  paper: '#ffffff',
  surface: '#16122b',
  copy: '#ffffff',
  muted: '#b9b4d6',
};

const HEAD = 'Sora';
const BODY = 'Inter';
const { width: PW, height: PH } = POST_SIZE;

const kicker = (content: string, theme: StatTheme, y = 110) =>
  text(content, 90, y, 800, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: theme.paper,
    opacity: 0.85,
    letterSpacing: 1,
  });

const note = (theme: StatTheme, label: string, x: number, y: number, degrees: number) =>
  rotateNodes(degrees, x, y, [
    rect(x, y, 640, 170, theme.paper, { name: 'Note', cornerRadius: 20, ...shadow(30, 12) }),
    circle(x + 90, y + 85, 50, theme.ink),
    icon('arrow-up-right', x + 62, y + 57, 56, theme.paper, { strokeWidth: 2.6 }),
    text(label, x + 170, y + 38, 440, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 500,
      fill: theme.ink,
      lineHeight: 1.25,
    }),
  ]);

export const resultsNotes = (theme: StatTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    kicker('QUARTERLY GROWTH RECAP', theme),
    text('The wins we banked\nthis quarter', 90, 160, 940, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.12,
    }),
    star(5, 60, 560, 130, theme.ink, { innerRatio: 0.42 }),
    note(theme, 'Qualified leads grew\nby 32%', 260, 470, -3),
    note(theme, 'Churn rate dropped\nby 18%', 340, 720, 2),
    note(theme, 'Demo bookings rose\nby 27%', 220, 960, -2),
    star(5, 880, 1160, 150, theme.paper, { innerRatio: 0.42 }),
  ]);

export const bigStat = (theme: StatTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    star(5, 820, 70, 170, theme.ink, { innerRatio: 0.42 }),
    text('81%', 90, 120, 700, {
      fontFamily: HEAD,
      fontSize: 210,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1,
    }),
    text('of teams lose 12+ hours a\nweek to manual reporting', 90, 380, 940, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 700,
      fill: theme.paper,
      lineHeight: 1.2,
    }),
    text('Ops Pulse Survey 2026. Automate the busywork.', 90, 530, 900, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 500,
      fill: theme.paper,
      opacity: 0.8,
    }),
    rect(70, 790, 200, 560, theme.ink, { name: 'Bar' }),
    rect(320, 930, 200, 420, theme.paper, { name: 'Bar base' }),
    rect(320, 930, 200, 170, theme.ink, { name: 'Bar cap' }),
    rect(570, 850, 200, 500, theme.ink, { name: 'Bar' }),
    rect(820, 750, 200, 600, theme.paper, { name: 'Bar base' }),
    rect(820, 750, 200, 230, theme.ink, { name: 'Bar cap' }),
  ]);

const bubble = (
  theme: StatTheme,
  cx: number,
  cy: number,
  radius: number,
  value: string,
  label: string,
) => [
  circle(cx, cy, radius, theme.brand),
  text(value, cx - radius, cy - radius * 0.42, radius * 2, {
    fontFamily: HEAD,
    fontSize: radius * 0.52,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  text(label, cx - radius, cy + radius * 0.22, radius * 2, {
    fontFamily: BODY,
    fontSize: radius * 0.16,
    fontWeight: 600,
    fill: '#ffffff',
    align: 'center',
  }),
];

export const aiUsage = (theme: StatTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.surface, { name: 'Background' }),
    text('Where AI saves', 90, 110, 940, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: theme.copy,
    }),
    text('the most hours', 90, 196, 940, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: theme.brand,
    }),
    text('How do teams use AI every week?\nWhat about yours?', 90, 316, 900, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 500,
      fill: theme.muted,
      lineHeight: 1.35,
    }),
    text('Sales outreach', 800, 500, 260, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 600,
      fill: theme.copy,
    }),
    star(5, 640, 540, 340, theme.copy, { innerRatio: 0.48 }),
    text('49%', 690, 676, 240, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 800,
      fill: theme.brand,
      align: 'center',
    }),
    bubble(theme, 300, 800, 180, '64%', 'Content drafts'),
    bubble(theme, 650, 1080, 150, '57%', 'Lead research'),
    star(5, 150, 1010, 190, theme.copy, { innerRatio: 0.48 }),
    text('21%', 175, 1084, 140, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 800,
      fill: theme.brand,
      align: 'center',
    }),
    text('Admin tasks', 120, 1236, 300, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 600,
      fill: theme.copy,
    }),
  ]);

const marker = (
  theme: StatTheme,
  x: number,
  top: number,
  pointY: number,
  value: string,
  label: string,
): Nodes[] => [
  text(value, x - 120, top, 240, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: theme.paper,
    align: 'center',
  }),
  text(label, x - 120, top + 84, 240, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: theme.paper,
    align: 'center',
    lineHeight: 1.2,
  }),
  rect(x - 2, top + 160, 4, pointY - top - 160, theme.paper, { name: 'Marker line' }),
  circle(x, pointY, 16, theme.paper, { stroke: theme.ink, strokeWidth: 6 }),
];

export const leadersChart = (theme: StatTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    kicker('REVENUE OPERATIONS', theme),
    text('Where top teams\ninvest right now', 90, 150, 760, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.12,
    }),
    star(5, 860, 60, 140, theme.ink, { innerRatio: 0.42 }),
    path(
      'M0 1180 C 120 1175, 180 1165, 240 1150 S 420 1080, 520 1050 S 700 975, 800 960 S 960 920, 1080 860',
      0,
      0,
      PW,
      PH,
      'rgba(0,0,0,0)',
      { width: PW, height: PH },
      { stroke: theme.ink, strokeWidth: 8 },
    ),
    marker(theme, 240, 780, 1150, '48%', 'AI and\nautomation'),
    marker(theme, 520, 620, 1050, '69%', 'Customer\nacquisition'),
    marker(theme, 800, 460, 960, '83%', 'Delivery\nspeed'),
    star(5, 940, 700, 110, theme.paper, { innerRatio: 0.42 }),
    text('Want the full report? Send us a message.', 90, 1260, 900, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 600,
      fill: theme.paper,
      align: 'right',
    }),
  ]);

const growth = (theme: StatTheme, height: number, story: boolean): Nodes[] => {
  const shift = story ? 260 : 0;
  return [
    rect(0, 0, PW, height, theme.brand, { name: 'Background' }),
    [0, 1, 2, 3].map((index) =>
      rect(90 + index * 210, story ? 110 : 80, 190, 12, theme.paper, {
        name: 'Progress',
        cornerRadius: 6,
        opacity: index < 2 ? 1 : 0.35,
      }),
    ),
    star(5, 950, story ? 70 : 40, 100, theme.paper, { innerRatio: 0.42 }),
    text('Scale Your\nRevenue With Us', 90, 220 + shift, 940, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.1,
    }),
    text('94%', 90, 470 + shift, 500, {
      fontFamily: HEAD,
      fontSize: 160,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1,
    }),
    circle(560, 553 + shift, 62, theme.ink),
    icon('arrow-up-right', 523, 516 + shift, 74, theme.paper, { strokeWidth: 2.6 }),
    rect(90, 720 + shift, 120, 8, theme.ink, { name: 'Rule', cornerRadius: 4 }),
    text(
      'Our proven playbook helps service teams build steady, predictable revenue every single quarter.',
      90,
      770 + shift,
      800,
      {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 500,
        fill: theme.paper,
        lineHeight: 1.4,
      },
    ),
    star(5, 70, height - 230, 150, theme.ink, { innerRatio: 0.42 }),
    story
      ? [
          rect(90, 1560, 900, 120, theme.ink, { name: 'Button', cornerRadius: 60 }),
          text('Book a strategy call', 90, 1598, 900, {
            fontFamily: HEAD,
            fontSize: 38,
            fontWeight: 700,
            fill: theme.paper,
            align: 'center',
          }),
        ]
      : [],
  ];
};

export const growProfit = (theme: StatTheme): Template =>
  template(PW, PH, () => growth(theme, PH, false));

export const growStory = (theme: StatTheme): Template =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => growth(theme, STORY_SIZE.height, true));

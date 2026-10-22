import { linear } from '@/design';
import { POST_SIZE, rect, rotateNodes, shadow, star, template, text } from '../../../kit';

export interface EventTheme {
  from: string;
  to: string;
  ink: string;
  paper: string;
  brand: string;
  accent: string;
  tint: string;
}

export const ROSEWOOD: EventTheme = {
  from: '#3a0b2e',
  to: '#d93b72',
  ink: '#1c0716',
  paper: '#ffffff',
  brand: '#e0457b',
  accent: '#ffc145',
  tint: '#fde4ee',
};

export const LAGOON: EventTheme = {
  from: '#06302c',
  to: '#0f9f8f',
  ink: '#04201d',
  paper: '#ffffff',
  brand: '#14b8a6',
  accent: '#fde047',
  tint: '#d5f5f0',
};

const { width: W, height: H } = POST_SIZE;
export const HEAD = 'Outfit';
export const BODY = 'DM Sans';

export const backdrop = (theme: EventTheme, width: number = W, height: number = H) =>
  rect(0, 0, width, height, linear(200, theme.to, theme.from), { name: 'Background' });

const label = (
  theme: EventTheme,
  content: string,
  x: number,
  y: number,
  width: number,
  degrees: number,
  dark: boolean,
) =>
  rotateNodes(degrees, x, y, [
    rect(x, y, width, 70, dark ? theme.ink : theme.paper, {
      name: 'Label',
      ...shadow(16, 6, 'rgba(0,0,0,0.3)'),
    }),
    text(content, x, y + 16, width, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 700,
      fill: dark ? theme.paper : theme.ink,
      align: 'center',
    }),
  ]);

const DAYS = [
  ['03', 'Mon'],
  ['05', 'Wed'],
  ['07', 'Fri'],
  ['12', 'Wed'],
  ['14', 'Fri'],
  ['18', 'Tue'],
  ['20', 'Thu'],
  ['25', 'Tue'],
  ['28', 'Fri'],
] as const;

export const monthEvents = (theme: EventTheme) =>
  template(W, H, () => [
    backdrop(theme),
    text('Upcoming', 80, 80, 600, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 500,
      fill: theme.paper,
    }),
    text('November Events', 80, 130, 900, {
      fontFamily: HEAD,
      fontSize: 88,
      fontWeight: 800,
      fill: theme.paper,
    }),
    DAYS.map(([day, weekday], index) => {
      const x = 80 + (index % 3) * 315;
      const y = 300 + Math.floor(index / 3) * 275;
      const open = index === 2 || index === 5 || index === 7;
      return [
        rect(x, y, 290, 250, open ? 'rgba(255,255,255,0.14)' : theme.paper, {
          name: 'Day cell',
          cornerRadius: 6,
        }),
        text(day, x + 24, y + 18, 120, {
          fontFamily: HEAD,
          fontSize: 72,
          fontWeight: 800,
          fill: open ? theme.paper : theme.ink,
        }),
        text(weekday, x + 130, y + 48, 140, {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 500,
          fill: open ? theme.paper : '#6b7280',
        }),
      ];
    }),
    label(theme, 'Founder Coffee', 110, 470, 300, -6, true),
    label(theme, 'Demo Night', 430, 735, 260, 5, false),
    label(theme, 'Hackathon', 100, 1035, 270, -4, false),
    star(5, 920, 50, 120, theme.accent, { innerRatio: 0.42 }),
    star(5, 30, 1200, 120, theme.paper, { innerRatio: 0.42 }),
    text('Save your seat at loopworks.events', 0, 1230, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
    }),
  ]);

const ROWS = [
  ['04', 'Founder AMA', 'Ask our founders anything about the road to launch.'],
  ['11', 'Feature Poll', 'Vote on the next feature we build for you.'],
  ['19', 'Live Workshop', 'Learn how teams cut onboarding time in half.'],
  ['27', 'Beta Access Drop', 'A thank you for our most loyal early users.'],
] as const;

export const eventList = (theme: EventTheme) =>
  template(W, H, () => [
    backdrop(theme),
    ROWS.map(([day, title, detail], index) => {
      const y = 110 + index * 300;
      return [
        rect(90, y, 180, 190, theme.paper, { name: 'Date tile', cornerRadius: 10 }),
        rect(130, y - 22, 18, 50, theme.ink, { name: 'Ring', cornerRadius: 9 }),
        rect(212, y - 22, 18, 50, theme.ink, { name: 'Ring', cornerRadius: 9 }),
        text(day, 90, y + 30, 180, {
          fontFamily: HEAD,
          fontSize: 96,
          fontWeight: 800,
          fill: theme.ink,
          align: 'center',
          lineHeight: 1,
        }),
        text('NOV', 90, y + 135, 180, {
          fontFamily: BODY,
          fontSize: 26,
          fontWeight: 700,
          fill: theme.brand,
          align: 'center',
          letterSpacing: 3,
        }),
        text(title, 320, y + 18, 700, {
          fontFamily: HEAD,
          fontSize: 60,
          fontWeight: 800,
          fill: theme.paper,
        }),
        text(detail, 320, y + 100, 680, {
          fontFamily: BODY,
          fontSize: 32,
          fontWeight: 500,
          fill: 'rgba(255,255,255,0.82)',
          lineHeight: 1.35,
        }),
      ];
    }),
    star(5, 940, 40, 100, theme.accent, { innerRatio: 0.42 }),
    star(5, 950, 1220, 90, theme.paper, { innerRatio: 0.42 }),
  ]);

export const eventDay = (theme: EventTheme) =>
  template(W, H, () => [
    backdrop(theme),
    star(5, 600, 820, 460, 'rgba(0,0,0,0.28)', { innerRatio: 0.42, rotation: 12 }),
    rect(150, 330, 720, 640, theme.paper, { rotation: -6, name: 'Back card' }),
    rect(200, 340, 700, 660, theme.ink, { name: 'Front card', ...shadow(40, 16) }),
    star(5, 100, 230, 150, theme.paper, { innerRatio: 0.42 }),
    text('Event Day', 250, 400, 600, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 500,
      fill: theme.paper,
    }),
    text('Thu, 14 Nov', 250, 456, 620, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: theme.brand,
    }),
    text('From 6 pm to 9 pm', 250, 574, 600, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 500,
      fill: theme.paper,
    }),
    text('Quarterly roadmap\nlivestream', 250, 660, 620, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.15,
    }),
    rect(250, 840, 600, 120, theme.paper, { name: 'Callout' }),
    text('Join the waitlist for\nearly access perks', 280, 856, 560, {
      fontFamily: HEAD,
      fontSize: 36,
      fontWeight: 700,
      fill: theme.ink,
      lineHeight: 1.2,
    }),
    text('loopworks.events', 0, 1200, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
    }),
  ]);

import { linear } from '@/design';
import {
  circle,
  type Nodes,
  rect,
  rotateNodes,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { POST } from '../lagoon-saas-stats/theme';

export interface EventTheme {
  main: string;
  dark: string;
  paper: string;
  ink: string;
  onMain: string;
  pop: string;
  star: string;
  headFont: string;
  bodyFont: string;
}

interface CalendarDay {
  day: string;
  weekday: string;
  dark: boolean;
  sticker?: string;
}

export interface EventDayCopy {
  kicker: string;
  date: string;
  hours: string;
  title: string;
  cta: string;
}

export interface MonthCopy {
  kicker: string;
  title: string;
  days: readonly CalendarDay[];
}

export interface SaveCopy {
  title: string;
  invite: string;
  digits: readonly [string, string, string];
  units: readonly [string, string, string];
  reply: string;
  host: string;
}

const { width: W, height: H } = POST;

export const headStyle = (theme: EventTheme, size: number, fill: string) => ({
  fontFamily: theme.headFont,
  fontSize: size,
  fontWeight: 800,
  fill,
  lineHeight: 1.1,
});

export const bodyStyle = (theme: EventTheme, size: number, fill: string, weight = 400) => ({
  fontFamily: theme.bodyFont,
  fontSize: size,
  fontWeight: weight,
  fill,
  lineHeight: 1.35,
});

export const sparkle = (theme: EventTheme, x: number, y: number, size: number, fill?: string) =>
  star(5, x, y, size, fill ?? theme.star, { innerRatio: 0.45, name: 'Star' });

export const eventDay = (theme: EventTheme, copy: EventDayCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.dark, { name: 'Background' }),
    rotateNodes(-9, 540, 680, [
      rect(200, 330, 680, 700, theme.paper, { name: 'Back card', cornerRadius: 8 }),
    ]),
    sparkle(theme, 120, 210, 170),
    rotateNodes(-4, 540, 680, [
      rect(210, 320, 680, 720, theme.main, {
        name: 'Event card',
        cornerRadius: 8,
        ...shadow(40, 18, 'rgba(0,0,0,0.4)'),
      }),
      text(copy.kicker, 270, 380, 580, bodyStyle(theme, 34, theme.onMain, 500)),
      text(copy.date, 270, 430, 600, headStyle(theme, 80, theme.onMain)),
      text(copy.hours, 270, 540, 580, bodyStyle(theme, 32, theme.onMain)),
      text(copy.title, 270, 630, 580, headStyle(theme, 52, theme.onMain)),
      rect(270, 830, 560, 150, theme.paper, { name: 'Call to action', cornerRadius: 6 }),
      text(copy.cta, 300, 856, 500, headStyle(theme, 38, theme.ink)),
    ]),
    sparkle(theme, 700, 960, 250),
  ]);

const dayCell = (theme: EventTheme, day: CalendarDay, x: number, y: number): Nodes[] => [
  rect(x, y, 280, 270, day.dark ? theme.dark : theme.paper, {
    name: 'Day tile',
    cornerRadius: 6,
    ...shadow(20, 8, 'rgba(0,0,0,0.25)'),
  }),
  text(day.day, x + 24, y + 22, 90, headStyle(theme, 60, day.dark ? theme.pop : theme.ink)),
  text(
    day.weekday,
    x + 110,
    y + 44,
    170,
    bodyStyle(theme, 26, day.dark ? theme.paper : theme.ink, 500),
  ),
  day.sticker === undefined
    ? []
    : rotateNodes(-7, x + 140, y + 190, [
        rect(x + 10, y + 150, 260, 92, day.dark ? theme.paper : theme.dark, {
          name: 'Sticker',
          cornerRadius: 4,
        }),
        text(day.sticker, x + 20, y + 162, 240, {
          ...headStyle(theme, 26, day.dark ? theme.ink : theme.paper),
          align: 'center',
        }),
      ]),
];

export const monthCalendar = (theme: EventTheme, copy: MonthCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.main, { name: 'Background' }),
    text(copy.kicker, 80, 90, 600, bodyStyle(theme, 32, theme.onMain, 500)),
    text(copy.title, 80, 132, 900, headStyle(theme, 84, theme.onMain)),
    sparkle(theme, 920, 30, 140),
    copy.days.map((day, index) =>
      dayCell(theme, day, 80 + (index % 3) * 320, 300 + Math.floor(index / 3) * 330),
    ),
    sparkle(theme, 10, 1170, 150),
  ]);

export const saveTheDate = (theme: EventTheme, copy: SaveCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(90, '#b8bec6', '#eef0f3', '#c3c8cf', '#f4f5f7', '#b1b7bf'), {
      name: 'Brushed metal',
    }),
    rect(537, 0, 6, H, '#8d949d', { name: 'Door seam' }),
    rect(1000, 560, 40, 200, '#9ba2ab', { name: 'Call panel', cornerRadius: 8 }),
    circle(1020, 610, 10, theme.pop),
    circle(1020, 660, 10, '#ffffff'),
    rect(250, 300, 580, 780, '#fbfbfb', {
      name: 'Poster',
      cornerRadius: 4,
      ...shadow(36, 18, 'rgba(0,0,0,0.3)'),
    }),
    rotateNodes(-32, 290, 300, [
      rect(220, 280, 170, 54, theme.pop, { name: 'Tape', opacity: 0.85 }),
    ]),
    rotateNodes(32, 790, 300, [
      rect(700, 280, 170, 54, theme.pop, { name: 'Tape', opacity: 0.85 }),
    ]),
    text(copy.title, 250, 390, 580, { ...headStyle(theme, 70, theme.main), align: 'center' }),
    text(copy.invite, 250, 490, 580, {
      ...bodyStyle(theme, 30, '#374151'),
      align: 'center',
    }),
    copy.digits.map((digit, index) => [
      rect(300 + index * 165, 640, 150, 160, theme.dark, { name: 'Flip digit', cornerRadius: 10 }),
      rect(300 + index * 165, 718, 150, 4, 'rgba(255,255,255,0.25)', { name: 'Flip line' }),
      text(digit, 300 + index * 165, 662, 150, {
        ...headStyle(theme, 92, index === 1 ? theme.pop : theme.paper),
        align: 'center',
        lineHeight: 1,
      }),
      text(copy.units[index] ?? '', 300 + index * 165, 816, 150, {
        ...bodyStyle(theme, 22, '#6b7280', 600),
        align: 'center',
      }),
    ]),
    text(copy.reply, 250, 900, 580, { ...headStyle(theme, 36, theme.ink), align: 'center' }),
    text(copy.host, 250, 980, 580, { ...bodyStyle(theme, 24, '#6b7280', 500), align: 'center' }),
  ]);

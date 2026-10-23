import { linear } from '@/design';
import {
  circle,
  group,
  type Nodes,
  POST_SIZE,
  rect,
  rotateNodes,
  STORY_SIZE,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { contentCalendar } from './posts-calendar';

export interface EventPalette {
  top: string;
  deep: string;
  accent: string;
  paper: string;
  ink: string;
  soft: string;
}

const JADE: EventPalette = {
  top: '#0f9f8a',
  deep: '#032520',
  accent: '#c6f25e',
  paper: '#ffffff',
  ink: '#07130f',
  soft: '#c9f2e8',
};

export const COBALT: EventPalette = {
  top: '#2f6bff',
  deep: '#1d4ed8',
  accent: '#ffd84d',
  paper: '#ffffff',
  ink: '#0a1030',
  soft: '#dbe6ff',
};

const HEAD = 'Sora';
const BODY = 'DM Sans';
const { width: W, height: H } = POST_SIZE;

const tag = (label: string, x: number, y: number, rotation: number, p: EventPalette) => {
  const width = label.length * 14 + 36;
  return group(
    rotateNodes(rotation, x + width / 2, y + 22, [
      rect(x, y, width, 44, p.accent, { cornerRadius: 6, name: `${label} tag` }),
      text(label, x, y + 8, width, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: p.ink,
        align: 'center',
      }),
    ]),
  );
};

const CALENDAR = [
  { day: '01', weekday: 'Sunday' },
  { day: '04', weekday: 'Wednesday' },
  { day: '07', weekday: 'Saturday' },
  { day: '11', weekday: 'Wednesday' },
  { day: '13', weekday: 'Friday' },
  { day: '17', weekday: 'Tuesday' },
  { day: '21', weekday: 'Saturday' },
  { day: '26', weekday: 'Thursday' },
  { day: '30', weekday: 'Monday' },
];

const monthEvents = (p: EventPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(160, p.deep, p.top), { name: 'Background' }),
    text('Upcoming', 80, 80, 600, {
      fontFamily: BODY,
      fontSize: 40,
      fontWeight: 500,
      fill: p.soft,
    }),
    text('November Events', 80, 130, 900, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.paper,
    }),
    star(5, 930, 56, 96, p.accent, { innerRatio: 0.42 }),
    CALENDAR.map((cell, index) => {
      const x = 80 + (index % 3) * 315;
      const y = 300 + Math.floor(index / 3) * 335;
      const light = index % 2 === 1;
      return [
        rect(x, y, 290, 300, light ? p.paper : 'rgba(0,0,0,0.32)', {
          cornerRadius: 16,
          name: `${cell.day} cell`,
        }),
        text(cell.day, x + 26, y + 24, 240, {
          fontFamily: HEAD,
          fontSize: 72,
          fontWeight: 800,
          fill: light ? p.ink : p.paper,
        }),
        text(cell.weekday, x + 28, y + 118, 240, {
          fontFamily: BODY,
          fontSize: 28,
          fontWeight: 500,
          fill: light ? '#4b5563' : p.soft,
        }),
      ];
    }),
    tag('Open Studio Day', 100, 500, -6, p),
    tag('Kindness Day', 420, 840, 5, p),
    tag('Gratitude Week', 730, 1170, -5, p),
  ]);

const EVENTS = [
  {
    day: '06',
    title: 'Maker Spotlight',
    body: 'Celebrate the people who\nbuild your brand every day.',
  },
  { day: '12', title: 'Community Poll', body: 'Let your audience pick the\nnext product colour.' },
  { day: '19', title: 'Live Workshop', body: 'How small teams use AI to\nsave ten hours a week.' },
  { day: '27', title: 'VIP Preview Night', body: 'Thank your most loyal\ncustomers first.' },
];

const eventRows = (p: EventPalette, top: number, pitch: number): Nodes[] =>
  EVENTS.map((event, index) => {
    const y = top + index * pitch;
    return [
      rect(80, y, 180, 180, p.paper, { cornerRadius: 18, name: `${event.day} date` }),
      text(event.day, 80, y + 26, 180, {
        fontFamily: HEAD,
        fontSize: 80,
        fontWeight: 800,
        fill: p.ink,
        align: 'center',
      }),
      text('NOV', 80, y + 124, 180, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: '#6b7280',
        align: 'center',
        letterSpacing: 4,
      }),
      circle(250, y + 10, 18, p.accent),
      text(event.title, 300, y + 14, 720, {
        fontFamily: HEAD,
        fontSize: 50,
        fontWeight: 800,
        fill: p.paper,
      }),
      text(event.body, 300, y + 84, 720, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 400,
        fill: p.soft,
        lineHeight: 1.3,
      }),
    ];
  });

const eventListAt = (p: EventPalette, height: number) => {
  const story = height > H;
  const top = story ? 520 : 300;
  const pitch = story ? 330 : 250;
  return template(W, height, () => [
    rect(0, 0, W, height, linear(160, p.deep, p.top), { name: 'Background' }),
    text('This month at Fernway', 80, story ? 200 : 90, 800, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 600,
      fill: p.accent,
    }),
    text("What's On", 80, story ? 250 : 140, 800, {
      fontFamily: HEAD,
      fontSize: story ? 120 : 84,
      fontWeight: 800,
      fill: p.paper,
    }),
    star(5, 880, story ? 160 : 70, 120, p.accent, { innerRatio: 0.42 }),
    eventRows(p, top, pitch),
    star(5, 860, height - 200, 140, 'rgba(255,255,255,0.9)', { innerRatio: 0.42 }),
  ]);
};

export const eventList = (p: EventPalette) => eventListAt(p, H);

export const eventStory = eventListAt(JADE, STORY_SIZE.height);

const countdown = (p: EventPalette) =>
  [
    { label: 'Month', value: '11' },
    { label: 'Day', value: '14' },
    { label: 'Year', value: '26' },
  ].map((cell, index) => {
    const x = 270 + index * 190;
    return [
      text(cell.label, x, 640, 170, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 600,
        fill: '#6b7280',
        align: 'center',
      }),
      rect(x, 680, 170, 150, p.ink, { cornerRadius: 12, name: `${cell.label} box` }),
      text(cell.value, x, 702, 170, {
        fontFamily: HEAD,
        fontSize: 84,
        fontWeight: 800,
        fill: index === 1 ? p.accent : p.paper,
        align: 'center',
      }),
    ];
  });

const saveTheDate = (p: EventPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(90, '#8b939c', '#e6e9ed', '#9aa2ab'), { name: 'Fridge door' }),
    rect(536, 0, 8, H, 'rgba(55,65,81,0.55)', { name: 'Door gap' }),
    rect(470, 140, 24, 1060, '#c3c8ce', { cornerRadius: 12, name: 'Handle' }),
    rect(586, 140, 24, 1060, '#c3c8ce', { cornerRadius: 12, name: 'Handle' }),
    rotateNodes(-2.5, 540, 740, [
      rect(210, 330, 660, 820, '#fbfbf8', {
        name: 'Poster',
        cornerRadius: 4,
        shadow: { color: 'rgba(0,0,0,0.3)', blur: 30, offsetX: 0, offsetY: 14 },
      }),
      star(5, 250, 370, 44, p.top, { innerRatio: 0.42 }),
      text('Save the Date', 210, 430, 660, {
        fontFamily: HEAD,
        fontSize: 72,
        fontWeight: 800,
        fill: p.deep,
        align: 'center',
      }),
      text('You are invited to\nan evening to remember.', 210, 530, 660, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: '#4b5563',
        align: 'center',
        lineHeight: 1.3,
      }),
      countdown(p),
      text('Want a reminder?', 210, 880, 660, {
        fontFamily: BODY,
        fontSize: 28,
        fontWeight: 500,
        fill: '#6b7280',
        align: 'center',
      }),
      text('Comment: "GO"', 210, 925, 660, {
        fontFamily: HEAD,
        fontSize: 44,
        fontWeight: 800,
        fill: p.ink,
        align: 'center',
      }),
      rect(260, 1030, 560, 70, p.top, { cornerRadius: 35, name: 'Venue bar' }),
      text('Fernway Hall, 7 pm', 260, 1048, 560, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 700,
        fill: p.paper,
        align: 'center',
      }),
      rect(430, 296, 220, 70, 'rgba(214,186,132,0.85)', { rotation: 6, name: 'Tape' }),
      rect(170, 330, 150, 56, 'rgba(214,186,132,0.85)', { rotation: -32, name: 'Tape' }),
    ]),
  ]);

export const eventDay = (p: EventPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(150, p.deep, p.top), { name: 'Background' }),
    star(5, 90, 110, 110, p.accent, { innerRatio: 0.42 }),
    rect(150, 290, 700, 720, p.paper, { rotation: -8, cornerRadius: 6, name: 'Back card' }),
    rect(220, 330, 680, 700, p.ink, {
      cornerRadius: 6,
      shadow: { color: 'rgba(0,0,0,0.4)', blur: 40, offsetX: 0, offsetY: 18 },
      name: 'Front card',
    }),
    text('Event Day', 270, 384, 580, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 600,
      fill: p.accent,
    }),
    text('Thu, 14 Nov', 270, 434, 580, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: p.paper,
    }),
    text('From 6 pm to 9 pm', 270, 540, 580, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 400,
      fill: '#d1d5db',
    }),
    text('Founder meetup\nand live Q&A', 270, 624, 580, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 800,
      fill: p.accent,
      lineHeight: 1.15,
    }),
    rect(270, 800, 580, 160, p.paper, { cornerRadius: 8, name: 'Reserve box' }),
    text('Reserve your free\nseat today', 300, 830, 520, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: p.ink,
      lineHeight: 1.2,
    }),
    star(5, 760, 1000, 240, p.paper, { innerRatio: 0.42 }),
  ]);

export const POSTS: readonly [Template, Template, Template, Template, Template] = [
  monthEvents(JADE),
  eventList(JADE),
  saveTheDate(JADE),
  eventDay(JADE),
  contentCalendar(JADE),
];

import { linear } from '@/design';
import { rect, rotateNodes, star, type Template, template, text } from '../../../kit';
import { BODY, type EventPalette, H, HEAD, W } from './posts';

const AGENDA = [
  { day: '15', title: 'Creator Spotlight', body: 'Celebrate the makers behind your brand.' },
  { day: '20', title: 'Community Poll', body: 'Let your followers pick what comes next.' },
  { day: '24', title: 'Live Workshop', body: 'Teach one skill in thirty minutes flat.' },
  { day: '28', title: 'Early Access Night', body: 'Reward your most loyal customers first.' },
];

export const eventList = (p: EventPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    star(5, 470, 40, 80, p.paper, { innerRatio: 0.45 }),
    AGENDA.map((item, index) => {
      const y = 150 + index * 285;
      return [
        rect(110, y, 160, 170, p.paper, { cornerRadius: 10, name: 'Date box' }),
        rect(110, y, 160, 44, p.brand, { cornerRadius: 10, name: 'Date header' }),
        text('NOV', 110, y + 6, 160, {
          fontFamily: BODY,
          fontSize: 24,
          fontWeight: 800,
          fill: p.paper,
          align: 'center',
          letterSpacing: 3,
        }),
        text(item.day, 110, y + 56, 160, {
          fontFamily: HEAD,
          fontSize: 82,
          fontWeight: 800,
          fill: p.deep,
          align: 'center',
          lineHeight: 1,
        }),
        text(item.title, 310, y + 14, 700, {
          fontFamily: HEAD,
          fontSize: 54,
          fontWeight: 800,
          fill: p.brand,
        }),
        text(item.body, 310, y + 86, 660, {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 500,
          fill: p.paper,
          lineHeight: 1.35,
        }),
      ];
    }),
    star(5, 950, 130, 90, p.brand, { innerRatio: 0.45 }),
    star(5, 940, 1230, 90, p.brand, { innerRatio: 0.45 }),
  ]);

export const saveTheDate = (p: EventPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(90, '#8c959d', '#dfe3e6', '#a3abb2', '#e6e9eb', '#8c959d'), {
      name: 'Steel doors',
    }),
    rect(536, 0, 8, H, 'rgba(0,0,0,0.25)', { name: 'Door seam' }),
    rect(470, 560, 18, 220, '#5b636b', { cornerRadius: 9, name: 'Handle' }),
    rect(592, 560, 18, 220, '#5b636b', { cornerRadius: 9, name: 'Handle' }),
    rotateNodes(-2, 540, 700, [
      rect(200, 290, 680, 820, '#f8f8f6', {
        name: 'Poster',
        shadow: { color: 'rgba(0,0,0,0.3)', blur: 30, offsetX: 0, offsetY: 14 },
      }),
      text('Save the Date', 200, 380, 680, {
        fontFamily: HEAD,
        fontSize: 78,
        fontWeight: 800,
        fill: p.brand,
        align: 'center',
      }),
      text("You're invited to an\nunforgettable evening.", 200, 490, 680, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: '#1f2937',
        align: 'center',
        lineHeight: 1.35,
      }),
      ['08', '09', '10'].map((value, index) => [
        rect(262 + index * 192, 640, 172, 190, index === 1 ? p.brand : p.deep, {
          cornerRadius: 10,
          name: 'Countdown tile',
        }),
        rect(262 + index * 192, 732, 172, 6, 'rgba(0,0,0,0.3)', { name: 'Flip line' }),
        text(value, 262 + index * 192, 668, 172, {
          fontFamily: HEAD,
          fontSize: 100,
          fontWeight: 800,
          fill: p.paper,
          align: 'center',
          lineHeight: 1,
        }),
      ]),
      text('Want to hear more?', 200, 890, 680, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 500,
        fill: '#4b5563',
        align: 'center',
      }),
      text('Comment "GO"', 200, 940, 680, {
        fontFamily: HEAD,
        fontSize: 56,
        fontWeight: 800,
        fill: p.deep,
        align: 'center',
      }),
    ]),
    rotateNodes(-38, 250, 300, [
      rect(170, 270, 200, 64, 'rgba(196,164,120,0.85)', { name: 'Tape' }),
    ]),
    rotateNodes(38, 830, 300, [
      rect(730, 270, 200, 64, 'rgba(196,164,120,0.85)', { name: 'Tape' }),
    ]),
    star(5, 130, 140, 80, p.deep, { innerRatio: 0.45 }),
  ]);

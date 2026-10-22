import {
  avatar,
  circle,
  photo,
  rating,
  rect,
  rotateNodes,
  star,
  template,
  text,
} from '../../../kit';
import { footer, H, HEAD, heavy, LIME, W } from './posts';

const EVENTS = [
  ['04', 'Growth Breakfast', 'Founders meetup, 8:30 AM'],
  ['12', 'Live Q&A', 'Pricing pages that convert'],
  ['19', 'Partner Webinar', 'Scaling outbound in 2027'],
  ['27', 'Client Awards', 'Celebrating our best launches'],
] as const;

export const eventsList = template(W, H, () => [
  rect(0, 0, W, H, LIME.primary, { name: 'Background' }),
  text('UPCOMING', 80, 90, 500, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 800,
    fill: LIME.ink,
    letterSpacing: 6,
  }),
  heavy('October Events', 80, 140, 100, LIME.ink),
  EVENTS.map(([day, title, detail], index) => {
    const y = 320 + index * 225;
    return [
      rect(80, y, 170, 180, LIME.ink, { cornerRadius: 20, name: 'Date box' }),
      text(day, 80, y + 22, 170, {
        fontFamily: HEAD,
        fontSize: 90,
        fontWeight: 900,
        fill: LIME.primary,
        align: 'center',
        lineHeight: 1,
      }),
      text('OCT', 80, y + 124, 170, {
        fontSize: 26,
        fontWeight: 700,
        fill: LIME.paper,
        align: 'center',
        letterSpacing: 4,
      }),
      text(title, 290, y + 34, 700, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 900,
        fill: LIME.ink,
      }),
      text(detail, 290, y + 104, 700, { fontSize: 30, fontWeight: 500, fill: '#2f3a12' }),
    ];
  }),
  footer(LIME.ink),
]);

const OPTIONS = ['Search and SEO', 'LinkedIn content', 'Cold email', 'Referrals'];

export const quizTime = template(W, H, () => [
  rect(0, 0, W, H, LIME.paper, { name: 'Background' }),
  heavy('Quick Quiz', 80, 100, 120, LIME.ink),
  rotateNodes(-8, 760, 150, [
    rect(700, 110, 260, 96, LIME.primary, { cornerRadius: 16, name: 'Time tag' }),
    text('TIME!', 700, 124, 260, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 900,
      fill: LIME.ink,
      align: 'center',
    }),
  ]),
  text('Which channel brings you the most\nqualified B2B leads?', 80, 300, 920, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 800,
    fill: LIME.ink,
    lineHeight: 1.2,
  }),
  OPTIONS.map((option, index) => {
    const y = 500 + index * 150;
    const picked = index === 1;
    return [
      rect(80, y, 920, 120, picked ? LIME.primary : '#f1f2f4', {
        cornerRadius: 22,
        name: 'Option',
      }),
      rect(104, y + 20, 80, 80, LIME.ink, { cornerRadius: 16, name: 'Option number' }),
      text(String(index + 1), 104, y + 34, 80, {
        fontFamily: HEAD,
        fontSize: 44,
        fontWeight: 900,
        fill: LIME.paper,
        align: 'center',
      }),
      text(option, 220, y + 36, 740, {
        fontSize: 40,
        fontWeight: 600,
        fill: LIME.ink,
      }),
    ];
  }),
  text('Drop your answer in the comments', 0, 1150, W, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: LIME.ink,
    align: 'center',
  }),
  star(5, 880, 1200, 110, LIME.ink, { innerRatio: 0.42 }),
  footer('#6b7280'),
]);

export const reviewWords = template(W, H, () => [
  rect(0, 0, W, H, LIME.ink, { name: 'Background' }),
  rotateNodes(-8, 540, 300, [
    text('CLIENT', 140, 70, 900, {
      fontFamily: 'Anton',
      fontSize: 230,
      fontWeight: 400,
      fill: LIME.primary,
      lineHeight: 1,
    }),
  ]),
  rotateNodes(-8, 540, 1100, [
    text('REVIEW', 120, 1010, 900, {
      fontFamily: 'Anton',
      fontSize: 230,
      fontWeight: 400,
      fill: 'rgba(0,0,0,0)',
      stroke: LIME.primary,
      strokeWidth: 4,
      lineHeight: 1,
    }),
  ]),
  rect(120, 470, 840, 470, LIME.paper, { cornerRadius: 30, name: 'Review card' }),
  rating(180, 530, 46, 5, '#f5b400', 0.2),
  text(
    '"Kestrel rebuilt our content engine. Demo requests doubled in one quarter."',
    180,
    610,
    720,
    { fontFamily: HEAD, fontSize: 42, fontWeight: 700, fill: LIME.ink, lineHeight: 1.3 },
  ),
  avatar('woman-portrait-5', 230, 850, 50),
  text('Lena Ortiz', 300, 812, 500, { fontSize: 32, fontWeight: 800, fill: LIME.ink }),
  text('COO, Brightfold Labs', 300, 856, 500, { fontSize: 26, fontWeight: 500, fill: '#6b7280' }),
]);

export const checkComments = template(W, H, () => [
  rect(0, 0, W, H, LIME.primary, { name: 'Background' }),
  text('CHECK THE COMMENTS', 70, 1270, 1180, {
    fontFamily: 'Anton',
    fontSize: 130,
    fontWeight: 400,
    fill: LIME.ink,
    rotation: -90,
    lineHeight: 1,
  }),
  photo('woman-portrait-6', 300, 80, 700, 1000, { cornerRadius: 30 }),
  rect(300, 1110, 700, 160, LIME.ink, { cornerRadius: 24, name: 'Caption card' }),
  text('Tell us your biggest\nmarketing win this year', 340, 1135, 640, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: LIME.paper,
    lineHeight: 1.2,
  }),
  circle(930, 110, 70, LIME.ink),
  star(5, 880, 60, 100, LIME.primary, { innerRatio: 0.42 }),
]);

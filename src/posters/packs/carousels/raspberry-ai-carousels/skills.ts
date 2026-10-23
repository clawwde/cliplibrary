import { icon, photo, poly, rect, type Template, template, text } from '../../../kit';
import { trail } from '../coral-tide-carousels/slide-kit';
import { BERRY, berryBackground, brandMark, FONT, H, W } from './palette';

const skillsCover = template(W, H, () => [
  berryBackground(),
  photo('phone-hand-1', 80, 140, 460, 400, { cornerRadius: 28 }),
  rect(820, 140, 260, 900, BERRY.white, { cornerRadius: 32, name: 'Next card' }),
  icon('navigation', 900, 920, 90, BERRY.ink, { strokeWidth: 2.4 }),
  text('5 Core AI Skills\nWorth Learning\nThis Year', 80, 600, 700, {
    fontFamily: FONT,
    fontSize: 72,
    fontWeight: 800,
    fill: BERRY.white,
    lineHeight: 1.15,
  }),
  text('The edge goes to the teams\nwho learn the fastest.', 80, 880, 700, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 500,
    fill: BERRY.blush,
    lineHeight: 1.4,
  }),
  brandMark(80, 1140),
]);

const skillCard = (number: number, title: string, body: string, note: string, dark: boolean) =>
  template(W, H, () => {
    const inkText = dark ? BERRY.white : BERRY.ink;
    return [
      berryBackground(),
      rect(80, 140, 680, 1060, dark ? BERRY.ink : BERRY.white, { cornerRadius: 36, name: 'Card' }),
      rect(900, 140, 180, 1060, dark ? BERRY.white : BERRY.ink, {
        cornerRadius: 36,
        name: 'Next card',
      }),
      rect(130, 200, 250, 84, BERRY.hot, { cornerRadius: 14, name: 'Label' }),
      text(`Skill #${number}`, 130, 216, 250, {
        fontFamily: FONT,
        fontSize: 42,
        fontWeight: 800,
        fill: BERRY.white,
        align: 'center',
      }),
      text(title, 130, 340, 580, {
        fontFamily: FONT,
        fontSize: 76,
        fontWeight: 800,
        fill: inkText,
        lineHeight: 1.15,
      }),
      text(body, 130, 580, 580, {
        fontFamily: FONT,
        fontSize: 46,
        fontWeight: 500,
        fill: inkText,
        lineHeight: 1.4,
      }),
      icon('puzzle', 130, 1010, 72, BERRY.hot, { strokeWidth: 2.4 }),
      text(note, 230, 1008, 480, {
        fontFamily: FONT,
        fontSize: 28,
        fontWeight: 500,
        fill: dark ? BERRY.blush : '#4b5563',
        lineHeight: 1.35,
      }),
    ];
  });

const waveGauge = template(W, H, () => [
  berryBackground(),
  text('Stay Ahead of\nthe AI Wave', 80, 160, 920, {
    fontFamily: FONT,
    fontSize: 96,
    fontWeight: 800,
    fill: BERRY.white,
    lineHeight: 1.12,
  }),
  text('Because the future belongs\nto the fast learners.', 80, 420, 900, {
    fontFamily: FONT,
    fontSize: 42,
    fontWeight: 500,
    fill: BERRY.blush,
    lineHeight: 1.4,
  }),
  trail('M100 540 A440 440 0 0 1 980 540', 0, 810, W, 540, BERRY.ink, 130),
  poly(
    [
      [470, 1350],
      [560, 1350],
      [860, 960],
    ],
    BERRY.white,
    { name: 'Needle' },
  ),
]);

export const SKILL_SERIES: readonly Template[] = [
  skillsCover,
  skillCard(
    1,
    'Prompt\nCrafting',
    'Write clear, specific prompts for text, image and research tools.',
    'Test small wording changes and compare the results.',
    false,
  ),
  skillCard(
    2,
    'Workflow\nAutomation',
    'Hand repeat tasks like reports, replies and scheduling to smart tools.',
    'Save hours every week and focus on strategy.',
    true,
  ),
  skillCard(
    3,
    'Responsible\nAI Use',
    'Know the basics of data privacy, bias and honest disclosure.',
    'Using AI with care makes you the trusted expert.',
    false,
  ),
  waveGauge,
];

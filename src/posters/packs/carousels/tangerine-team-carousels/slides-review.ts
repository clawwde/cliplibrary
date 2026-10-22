import type { DesignIconName } from '@/design';
import { circle, icon, rect, template } from '../../../kit';
import { darkBackground, H, lightBackground, say, TANGERINE, W } from './palette';

const STROKE = 7;

const connector = (enterY: number, wordY: number, wordEnd: number) => [
  rect(0, enterY, 64, STROKE, TANGERINE.orange, { name: 'Path' }),
  rect(60, Math.min(enterY, wordY), STROKE, Math.abs(enterY - wordY) + STROKE, TANGERINE.orange, {
    name: 'Path',
  }),
  rect(60, wordY, 50, STROKE, TANGERINE.orange, { name: 'Path' }),
  rect(wordEnd + 30, wordY, W - wordEnd - 30, STROKE, TANGERINE.orange, { name: 'Path' }),
];

const wordWidth = (word: string, size: number) => word.length * size * 0.62;

export const toneCover = template(W, H, () => [
  darkBackground(),
  say('Find\nYour\nBrand', 90, 200, 800, 120, TANGERINE.white, 800, { lineHeight: 1 }),
  say('Tone', 90, 560, 500, 120, TANGERINE.orange, 800, { lineHeight: 1 }),
  rect(
    90 + wordWidth('Tone', 120) + 30,
    626,
    W - 120 - wordWidth('Tone', 120),
    STROKE,
    TANGERINE.orange,
    { name: 'Path' },
  ),
  say('How to sound clear,\nwarm and consistent.', 90, 760, 800, 42, TANGERINE.sage, 500),
  circle(150, 1150, 60, TANGERINE.white),
  icon('arrow-right', 115, 1115, 70, TANGERINE.forest, { strokeWidth: 2.4 }),
]);

const toneStep = (enterY: number, lead: string, word: string, wordTop: number, body: string) => {
  const size = 92;
  const wordY = wordTop + Math.round(size * 0.55);
  return template(W, H, () => [
    darkBackground(),
    say(lead, 130, wordTop - 110, 900, size, TANGERINE.white, 800, { lineHeight: 1.1 }),
    say(word, 130, wordTop, 900, size, TANGERINE.orange, 800, { lineHeight: 1.1 }),
    connector(enterY, wordY, 130 + wordWidth(word, size)),
    say(body, 130, wordTop + 160, 860, 38, TANGERINE.sage, 400, { lineHeight: 1.5 }),
  ]);
};

export const toneValues = toneStep(
  626,
  'Pick Your',
  'Values',
  390,
  'Choose three words that describe\nhow you want to be felt, then\nfilter every post through them.',
);

export const toneWords = toneStep(
  441,
  'Shape Your',
  'Words',
  590,
  'Swap jargon for plain talk. Short\nsentences, real examples and a\nlittle personality go a long way.',
);

export const toneReader = toneStep(
  641,
  'Meet Your',
  'Reader',
  450,
  'Write for one person you know\nwell. Their questions become your\ntopics and their words your copy.',
);

export const reviewCover = template(W, H, () => [
  lightBackground(),
  say('northpine.co', 90, 90, 600, 32, TANGERINE.forest, 600),
  [0, 1, 2].map((index) =>
    icon('chevron-right', 430 + index * 130, 420, 260, TANGERINE.orange, { strokeWidth: 2.6 }),
  ),
  say('Yearly\nReview:', 90, 760, 900, 96, TANGERINE.orange, 800, { lineHeight: 1.05 }),
  say('Engagement\nand ROI', 90, 980, 900, 72, TANGERINE.forest, 600, { lineHeight: 1.1 }),
]);

const reviewStat = (value: string, label: string, symbol: DesignIconName) =>
  template(W, H, () => [
    lightBackground(),
    say('northpine.co', 90, 90, 600, 32, TANGERINE.forest, 600),
    say(value, 90, 300, 900, 230, TANGERINE.orange, 800, { lineHeight: 1 }),
    say(label, 90, 560, 800, 68, TANGERINE.forest, 500, { lineHeight: 1.15 }),
    circle(800, 1070, 230, 'rgba(255,138,61,0.16)', { name: 'Icon halo' }),
    icon(symbol, 650, 920, 300, TANGERINE.orange, { strokeWidth: 1.2 }),
  ]);

export const statLeads = reviewStat('41%', 'growth in\nqualified leads', 'trending-up');
export const statReplies = reviewStat('6x', 'more replies\non every post', 'message-circle');
export const statHours = reviewStat('12+', 'hours saved\nevery week', 'clock');

import { circle, icon, line, rect, template } from '../../../kit';
import { boxed, estimateWidth, H, say, TOMATO, W } from './palette';

const sidePanel = () => [
  rect(0, 0, W, H, TOMATO.red, { name: 'Background' }),
  rect(950, 140, 130, 1070, TOMATO.deep, { name: 'Side panel', cornerRadius: 56 }),
  rect(1010, 140, 70, 1070, TOMATO.deep, { name: 'Side panel edge' }),
  circle(1000, 675, 36, TOMATO.white),
  icon('chevron-right', 978, 653, 44, TOMATO.red, { strokeWidth: 3 }),
];

export const brandCover = template(W, H, () => [
  sidePanel(),
  say('Your\nPersonal\nBrand Is\nYour', 90, 190, 840, 104, TOMATO.white, 700, {
    lineHeight: 1.02,
  }),
  boxed('Strongest', 90, 640, 104, TOMATO.white, TOMATO.red),
  say('Advantage', 90, 790, 840, 104, TOMATO.white, 700, { lineHeight: 1.02 }),
]);

const pillLabel = (label: string) => [
  rect(90, 300, estimateWidth(label, 54) + 60, 92, TOMATO.white, {
    name: 'Label pill',
    cornerRadius: 46,
    stroke: TOMATO.ink,
    strokeWidth: 3,
  }),
  say(label, 90, 314, estimateWidth(label, 54) + 60, 54, TOMATO.red, 700, {
    align: 'center',
    lineHeight: 1.1,
  }),
];

const brandStep = (label: string, body: string) =>
  template(W, H, () => [
    sidePanel(),
    pillLabel(label),
    say(body, 90, 460, 800, 42, TOMATO.white, 500, { lineHeight: 1.45 }),
  ]);

export const brandPeople = brandStep(
  'Your People:',
  'Your audience is not just buying\na service. They are choosing you.\n\nTrust, familiarity and a clear\npoint of view drive every choice.',
);

export const brandGap = brandStep(
  'The Gap:',
  "If you aren't visible, consistent\nand clear...\n\nYou get overlooked.\nYou get underpriced.\nYou get forgotten.",
);

export const brandNext = brandStep(
  'Next Steps:',
  "Build with intention every day\n\n•  Share useful insights\n•  Show your perspective\n•  Stay consistent over time\n•  Engage, don't just post",
);

export const sentencesCover = template(W, H, () => [
  rect(0, 0, W, H, TOMATO.red, { name: 'Background' }),
  say('3', 70, 400, 300, 440, TOMATO.white, 700, { lineHeight: 1 }),
  boxed('Sentences', 360, 500, 60, TOMATO.ink, TOMATO.white),
  say('marketers\nshould\nremember', 360, 590, 640, 60, TOMATO.white, 500, { lineHeight: 1.1 }),
  icon('corner-down-right', 300, 880, 110, TOMATO.white, { strokeWidth: 2 }),
  boxed('Swipe to read', 430, 940, 36, TOMATO.ink, TOMATO.white),
]);

const cropMarks = () => [
  line(110, 0, H, 'rgba(255,255,255,0.75)', 2, { name: 'Frame line', rotation: 90 }),
  line(970, 0, H, 'rgba(255,255,255,0.75)', 2, { name: 'Frame line', rotation: 90 }),
  line(0, 150, W, 'rgba(255,255,255,0.75)', 2, { name: 'Frame line' }),
  line(0, 1200, W, 'rgba(255,255,255,0.75)', 2, { name: 'Frame line' }),
];

const sentence = (lead: string, punch: string) => {
  const size = 64;
  const punchWidth = estimateWidth(punch, size) + size * 0.5;
  return template(W, H, () => [
    rect(0, 0, W, H, TOMATO.red, { name: 'Background' }),
    cropMarks(),
    say(lead, 110, 460, 860, size, TOMATO.white, 500, { align: 'center', lineHeight: 1.3 }),
    boxed(punch, (W - punchWidth) / 2, 640, size, TOMATO.ink, TOMATO.white),
  ]);
};

export const sentenceClear = sentence('If your message is fuzzy,\nyour audience', "won't care.");
export const sentenceEngage = sentence("If your audience isn't\ninterested, they", "won't engage.");
export const sentenceConvert = sentence("If people don't engage,\nthey will", 'never convert.');

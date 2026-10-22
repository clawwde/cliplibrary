import { circle, icon, type Template, template, text } from '../../../kit';
import { BODY, BRAND, darkBackground, H, HEAD, TIDE, W } from './palette';
import { trail } from './showcase';

const LOW = 1180;
const TITLE_Y = 300;
const TITLE_SIZE = 110;
const ACCENT_MID = TITLE_Y + TITLE_SIZE * 1.15 + TITLE_SIZE * 0.6;

const voiceCover = template(W, H, () => [
  darkBackground(),
  text(BRAND, 480, 110, 510, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 700,
    fill: TIDE.white,
    align: 'right',
    letterSpacing: 3,
  }),
  text('Find\nYour\nBrand', 90, 300, 800, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 800,
    fill: TIDE.white,
    lineHeight: 1.1,
  }),
  text('Voice', 90, 730, 600, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 800,
    fill: TIDE.coral,
  }),
  trail('M0 0 H300 Q360 0 360 60 V300 Q360 360 420 360 H540', 540, 820, 540, 360, TIDE.coral, 10),
  text('How to sound clear, warm\nand unmistakably you.', 90, 940, 760, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 500,
    fill: TIDE.mist,
    lineHeight: 1.35,
  }),
  circle(140, 1170, 56, TIDE.white),
  icon('arrow-right', 106, 1136, 68, TIDE.deep, { strokeWidth: 2.6 }),
]);

const voicePoint = (lead: string, accent: string, body: string) =>
  template(W, H, () => {
    const accentEnd = 130 + accent.length * TITLE_SIZE * 0.64 + 30;
    return [
      darkBackground(),
      trail(
        `M0 ${LOW - ACCENT_MID} H40 Q80 ${LOW - ACCENT_MID} 80 ${LOW - ACCENT_MID - 40} V40 Q80 0 110 0`,
        0,
        ACCENT_MID,
        110,
        LOW - ACCENT_MID,
        TIDE.coral,
        10,
      ),
      text(lead, 130, TITLE_Y, 900, {
        fontFamily: HEAD,
        fontSize: TITLE_SIZE,
        fontWeight: 800,
        fill: TIDE.white,
        lineHeight: 1.15,
      }),
      text(accent, 130, TITLE_Y + TITLE_SIZE * 1.15, 900, {
        fontFamily: HEAD,
        fontSize: TITLE_SIZE,
        fontWeight: 800,
        fill: TIDE.coral,
        lineHeight: 1.15,
      }),
      trail(
        `M0 0 H${900 - accentEnd} Q${960 - accentEnd} 0 ${960 - accentEnd} 60 V${LOW - ACCENT_MID - 60} Q${960 - accentEnd} ${LOW - ACCENT_MID} ${1020 - accentEnd} ${LOW - ACCENT_MID} H${W - accentEnd}`,
        accentEnd,
        ACCENT_MID,
        W - accentEnd,
        LOW - ACCENT_MID,
        TIDE.coral,
        10,
      ),
      text(body, 130, 620, 700, {
        fontFamily: BODY,
        fontSize: 44,
        fontWeight: 500,
        fill: TIDE.white,
        lineHeight: 1.4,
      }),
    ];
  });

export const VOICE_SERIES: readonly Template[] = [
  voiceCover,
  voicePoint(
    'Why It',
    'Matters',
    'Your voice is the personality behind every post. It makes you familiar, human and easy to remember.',
  ),
  voicePoint(
    'Pick Your',
    'Traits',
    'Choose three words that describe how you want to sound, then check every caption against them.',
  ),
  voicePoint(
    'Know Your',
    'Readers',
    'Learn the words your audience already uses and meet them there, in their language.',
  ),
  voicePoint(
    'Collect',
    'Examples',
    'Save posts that feel right, note why they work and build a simple guide your team can share.',
  ),
];

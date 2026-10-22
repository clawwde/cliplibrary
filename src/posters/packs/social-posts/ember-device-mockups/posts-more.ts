import { icon, rect, STORY_SIZE, template, text } from '../../../kit';
import {
  duskArt,
  EMBER as E,
  glow,
  H,
  HEAD,
  laptopDevice,
  monitor,
  pedestal,
  phoneDevice,
  type ScreenArt,
  SITE,
  siteLine,
  storeArt,
  tablet,
  W,
} from './devices';

interface LaunchStyle {
  site: string;
  title: string;
  tail: string;
  sticker: string;
  accent: string;
  glowColor: string;
  art: ScreenArt;
}

const launchNodes = (height: number, style: LaunchStyle) => {
  const top = height > H ? 400 : 90;
  return [
    rect(0, 0, W, height, E.black, { name: 'Background' }),
    glow(540, top + 760, 620, style.glowColor, height),
    text(style.site, 0, top, W, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 600,
      fill: E.white,
      align: 'center',
    }),
    text(style.title, 0, top + 60, W, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: E.white,
      align: 'center',
      lineHeight: 1,
    }),
    text(style.tail, 0, top + 190, W, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: style.accent,
      align: 'center',
      lineHeight: 1,
    }),
    rect(700, top + 330, 270, 72, style.accent, {
      cornerRadius: 36,
      rotation: -8,
      name: 'Sticker',
    }),
    text(style.sticker, 700, top + 348, 270, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 800,
      fill: E.black,
      align: 'center',
      rotation: -8,
    }),
    pedestal(220, top + 790, 640, height - top - 900),
    laptopDevice(250, top + 440, 580, style.art),
  ];
};

const EMBER_LAUNCH: LaunchStyle = {
  site: SITE,
  title: 'New Page',
  tail: 'is live',
  sticker: 'Visit today!',
  accent: E.glow,
  glowColor: 'rgba(255,106,26,0.55)',
  art: duskArt,
};

export const newPage = template(W, H, () => launchNodes(H, EMBER_LAUNCH));

export const newPageStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  launchNodes(STORY_SIZE.height, EMBER_LAUNCH),
);

export const newStore = template(W, H, () =>
  launchNodes(H, {
    site: 'brightloop.shop',
    title: 'New Store',
    tail: 'is open',
    sticker: 'Shop today!',
    accent: '#38e1ff',
    glowColor: 'rgba(56,225,255,0.45)',
    art: storeArt,
  }),
);

export const bigRelease = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(700, 560, 520),
  text('New Release', 30, 1310, 1270, {
    fontFamily: HEAD,
    fontSize: 176,
    fontWeight: 800,
    fill: 'rgba(255,106,26,0.85)',
    rotation: -90,
    lineHeight: 1,
  }),
  text(SITE, 600, 90, 420, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 600,
    fill: E.white,
    align: 'right',
  }),
  monitor(320, 260, 700),
  text('Our biggest update yet.\nFaster, lighter, smarter.', 320, 1000, 700, {
    fontFamily: HEAD,
    fontSize: 42,
    fontWeight: 600,
    fill: E.white,
    lineHeight: 1.35,
  }),
  rect(320, 1160, 330, 74, E.glow, { cornerRadius: 37, name: 'Button' }),
  text('See what is new', 320, 1180, 330, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill: E.black,
    align: 'center',
  }),
]);

const PERKS = ['Fast, reliable workflows', 'Always up to date', 'Support around the clock'];

export const upgradeFlow = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(820, 760, 500),
  text('Upgrade\nyour flow', 80, 150, 620, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: E.white,
    lineHeight: 1.05,
  }),
  text('with AI.', 80, 370, 620, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: E.glow,
    lineHeight: 1.05,
  }),
  tablet(640, 470, 380, 580, { rotation: 10 }),
  PERKS.map((perk, index) => [
    rect(80, 580 + index * 104, 520, 78, E.white, { cornerRadius: 39, name: 'Perk' }),
    icon('circle-check', 104, 597 + index * 104, 44, E.glow, { strokeWidth: 2.4 }),
    text(perk, 164, 602 + index * 104, 420, {
      fontFamily: HEAD,
      fontSize: 28,
      fontWeight: 700,
      fill: E.black,
    }),
  ]),
  siteLine(1230),
]);

export const everyDevice = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 840, 560),
  text('Available on', 0, 120, W, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 600,
    fill: E.white,
    align: 'center',
  }),
  text('every device', 0, 225, W, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: E.glow,
    align: 'center',
  }),
  rect(380, 370, 320, 68, E.glow, { cornerRadius: 34, name: 'Button' }),
  text('Learn more today', 380, 388, 320, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: E.black,
    align: 'center',
  }),
  laptopDevice(190, 580, 560),
  tablet(640, 680, 300, 420),
  phoneDevice(110, 790, 150),
  siteLine(1230),
]);

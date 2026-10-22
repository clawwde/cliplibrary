import {
  circle,
  ellipse,
  type Nodes,
  POST_SIZE,
  photo,
  pill,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface GrowthPalette {
  brand: string;
  ink: string;
  paper: string;
  accent: string;
}

export const MAGENTA: GrowthPalette = {
  brand: '#e11d74',
  ink: '#111014',
  paper: '#fdf6f0',
  accent: '#ffcc33',
};

export const EMERALD: GrowthPalette = {
  brand: '#10a37f',
  ink: '#05140f',
  paper: '#f2fbf7',
  accent: '#ffd166',
};

export const HEAD = 'Poppins';
export const DISPLAY = 'Archivo Black';
export const { width: W, height: H } = POST_SIZE;

const domino = (x: number, angle: number): Nodes[] =>
  rotateNodes(angle, x + 110, 1230, [
    rect(x + 96, 1018, 26, 212, '#9a9aa3', { name: 'Domino side' }),
    rect(x, 1010, 100, 220, '#f4f4f5', {
      cornerRadius: 6,
      name: 'Domino',
      shadow: { color: 'rgba(0,0,0,0.45)', blur: 18, offsetX: 6, offsetY: 6 },
    }),
  ]);

export const moreEyes = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('MORE EYES,\nMORE CLICKS,', 80, 210, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.paper,
      align: 'right',
      lineHeight: 1.08,
    }),
    text('MORE BUSINESS.', 80, 384, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.brand,
      align: 'right',
    }),
    pill('Step by step guide', 640, 530, {
      fill: p.brand,
      color: '#ffffff',
      fontSize: 32,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
    [0, 1, 2, 3, 4, 5, 6].map((index) => domino(40 + index * 140, index < 4 ? 64 - index * 16 : 0)),
    star(5, 80, 90, 80, p.accent, { innerRatio: 0.45 }),
  ]);

export const brandTrust = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.paper, { name: 'Background' }),
    [0, 1, 2, 3].map((index) =>
      text('BRIGHTWAVE', 40, 70 + index * 150, 1000, {
        fontFamily: DISPLAY,
        fontSize: 128,
        fontWeight: 400,
        fill: index % 2 === 0 ? p.brand : 'rgba(0,0,0,0)',
        stroke: p.brand,
        strokeWidth: index % 2 === 0 ? 0 : 3,
        align: 'center',
      }),
    ),
    rect(80, 720, 920, 6, p.ink, { name: 'Divider' }),
    text('HOW TO BUILD A BRAND\nTHAT PEOPLE TRUST', 80, 780, 920, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 800,
      fill: p.ink,
      lineHeight: 1.12,
    }),
    text('Five habits that turn first clicks into loyal buyers.', 80, 960, 920, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: '#4b5563',
    }),
    pill('Brightwave Studio', 80, 1110, {
      fill: p.brand,
      color: '#ffffff',
      fontSize: 34,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
    star(5, 880, 1080, 130, p.ink, { innerRatio: 0.45 }),
  ]);

const TABS = ['SEO', 'PAID ADS', 'EMAIL', 'WEBSITE', 'SOCIAL', 'BRANDING'];

export const tearOffNote = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    rotateNodes(-3, 540, 700, [
      rect(160, 200, 760, 470, '#ffffff', {
        name: 'Note',
        shadow: { color: 'rgba(0,0,0,0.5)', blur: 40, offsetX: 0, offsetY: 16 },
      }),
      text('Take what your brand\nneeds right now with', 210, 280, 660, {
        fontFamily: HEAD,
        fontSize: 48,
        fontWeight: 800,
        fill: p.ink,
        lineHeight: 1.15,
      }),
      text('Brightwave Studio', 210, 400, 660, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 800,
        fill: p.brand,
      }),
      rect(210, 520, 660, 4, '#d1d5db', { dashed: true, name: 'Perforation' }),
      text('Pull a tab, then send us a message', 210, 560, 660, {
        fontFamily: HEAD,
        fontSize: 28,
        fontWeight: 500,
        fill: '#6b7280',
      }),
      TABS.map((label, index) =>
        index === 4
          ? []
          : [
              rect(160 + index * 127, 670, 123, 420, '#ffffff', {
                name: 'Tear tab',
                shadow: { color: 'rgba(0,0,0,0.3)', blur: 14, offsetX: 0, offsetY: 6 },
              }),
              text(label, 196 + index * 127, 1060, 380, {
                fontFamily: HEAD,
                fontSize: 40,
                fontWeight: 700,
                fill: index % 2 === 0 ? p.ink : p.brand,
                rotation: -90,
              }),
            ],
      ),
    ]),
    rect(470, 170, 140, 60, 'rgba(255,204,51,0.85)', { rotation: -4, name: 'Tape' }),
    star(5, 900, 1160, 110, p.brand, { innerRatio: 0.45 }),
  ]);

export const gotMail = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.paper, { name: 'Background' }),
    text("YOU'VE GOT\nA MAIL!", 0, 130, W, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: p.brand,
      align: 'center',
      lineHeight: 1.05,
    }),
    rect(515, 820, 50, 360, p.ink, { name: 'Post' }),
    ellipse(380, 1160, 320, 50, 'rgba(0,0,0,0.12)', { name: 'Ground shadow' }),
    rect(330, 560, 420, 280, p.ink, { cornerRadius: 30, name: 'Mailbox' }),
    ellipse(330, 480, 420, 180, p.ink, { name: 'Mailbox top' }),
    rect(360, 610, 300, 200, '#2a2930', { cornerRadius: 16, name: 'Mailbox opening' }),
    rotateNodes(-12, 450, 640, [
      rect(380, 590, 280, 170, '#ffffff', { cornerRadius: 8, name: 'Letter' }),
      rect(380, 590, 280, 26, p.brand, { cornerRadius: 8, name: 'Letter stripe' }),
      rect(410, 650, 180, 12, '#d1d5db', { cornerRadius: 6, name: 'Letter line' }),
      rect(410, 680, 120, 12, '#d1d5db', { cornerRadius: 6, name: 'Letter line' }),
    ]),
    rect(750, 520, 20, 200, p.ink, { name: 'Flag pole' }),
    rect(770, 520, 110, 70, p.brand, { name: 'Flag' }),
    pill('Join our newsletter', 330, 1220, {
      fill: p.brand,
      color: '#ffffff',
      fontSize: 34,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
    star(5, 90, 450, 90, p.ink, { innerRatio: 0.45 }),
  ]);

export const closeTo = (p: GrowthPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    text("You're this", 90, 170, 800, {
      fontFamily: HEAD,
      fontSize: 54,
      fontWeight: 500,
      fill: p.paper,
    }),
    text('Close to...', 90, 236, 900, {
      fontFamily: HEAD,
      fontSize: 120,
      fontWeight: 800,
      fill: p.paper,
    }),
    photo('phone-hand-2', 300, 520, 700, 740, { cornerRadius: 40 }),
    circle(300, 520, 70, p.accent),
    text('Read the full story below', 90, 1290, 800, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 600,
      fill: p.paper,
    }),
    star(5, 900, 120, 110, p.ink, { innerRatio: 0.45 }),
  ]);

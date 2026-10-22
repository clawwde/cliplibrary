import {
  avatar,
  circle,
  line,
  POST_SIZE,
  rect,
  rotateNodes,
  STORY_SIZE,
  star,
  template,
  text,
} from '../../../kit';

export interface ValuePalette {
  brand: string;
  ink: string;
  paper: string;
  accent: string;
  soft: string;
}

export const COBALT: ValuePalette = {
  brand: '#3355ff',
  ink: '#090b16',
  paper: '#ffffff',
  accent: '#ffd23f',
  soft: '#c7d0ff',
};

export const MINT: ValuePalette = {
  brand: '#10b981',
  ink: '#05140f',
  paper: '#ffffff',
  accent: '#fde047',
  soft: '#c8f5e3',
};

export const HEAD = 'Poppins';
export const BODY = 'Manrope';
export const { width: W, height: H } = POST_SIZE;

const SERVICES = ['SEO', 'PAID ADS', 'EMAIL', 'WEBSITE', 'SOCIAL', 'BRANDING'];

export const ourServices = (p: ValuePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    star(5, 900, 90, 100, p.accent, { innerRatio: 0.42 }),
    star(5, 70, 1180, 70, p.paper, { innerRatio: 0.42 }),
    rotateNodes(-4, 540, 670, [
      rect(150, 180, 780, 980, p.paper, {
        cornerRadius: 6,
        shadow: { color: 'rgba(0,0,0,0.45)', blur: 40, offsetX: 0, offsetY: 16 },
        name: 'Flyer',
      }),
      rect(420, 150, 240, 64, p.brand, { cornerRadius: 6, name: 'Tape' }),
      text('Our Services', 150, 270, 780, {
        fontFamily: HEAD,
        fontSize: 86,
        fontWeight: 800,
        fill: p.ink,
        align: 'center',
      }),
      text('at Northpeak Studio', 150, 390, 780, {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 700,
        fill: p.brand,
        align: 'center',
      }),
      line(190, 560, 700, '#9ca3af', 3, { dashed: true }),
      SERVICES.map((label, index) => {
        const x = 190 + index * 118;
        const pulled = index === 4;
        return rotateNodes(pulled ? -5 : 0, x + 55, 590, [
          rect(x, pulled ? 610 : 580, 110, 440, pulled ? p.brand : '#f3f4f6', {
            cornerRadius: 4,
            stroke: '#d1d5db',
            strokeWidth: 2,
            name: `${label} tab`,
          }),
          text(label, x + 30, pulled ? 990 : 960, 360, {
            fontFamily: HEAD,
            fontSize: 44,
            fontWeight: 700,
            fill: pulled ? p.paper : p.ink,
            rotation: -90,
            letterSpacing: 2,
          }),
        ]);
      }),
    ]),
  ]);

const WORLD = [
  '   #####       ##     ######        ',
  ' ##########   ###  ############### #',
  '  ##########  #   ################# ',
  '   ########      #################  ',
  '    ######      ##############  #   ',
  '     ####       ############## #    ',
  '      ##        ####  ######        ',
  '       ###     ######  ####   #     ',
  '        ####   #######  ##   ##     ',
  '        #####   #####         ##    ',
  '         ####    ####          ###  ',
  '         ###     ###        ####    ',
  '         ##      ##        ######   ',
  '         #                  ####    ',
  '        #                           ',
];

const worldDots = (x: number, y: number, spacing: number, color: string) =>
  WORLD.flatMap((row, rowIndex) =>
    [...row].flatMap((cell, column) =>
      cell === '#'
        ? [circle(x + column * spacing, y + rowIndex * spacing, spacing * 0.36, color)]
        : [],
    ),
  );

const clearProcessAt = (p: ValuePalette, height: number) => {
  const shift = height > H ? 280 : 0;
  return template(W, height, () => [
    rect(0, 0, W, height, p.brand, { name: 'Background' }),
    text('Clear process.', 0, 120 + shift, W, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: p.ink,
      align: 'center',
    }),
    text('Simple. Proven. Fast.', 0, 240 + shift, W, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 700,
      fill: p.paper,
      align: 'center',
    }),
    worldDots(85, 520 + shift, 26, p.ink),
    avatar('woman-portrait-2', 300, 600 + shift, 62, p.paper),
    avatar('man-portrait-3', 700, 560 + shift, 58, p.paper),
    avatar('woman-portrait-5', 520, 820 + shift, 54, p.paper),
    text('Strategy, design and launch,\nhandled by one team.', 0, 1050 + shift, W, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
      lineHeight: 1.35,
    }),
    star(5, 490, height - 150 - shift * 0.5, 100, p.paper, { innerRatio: 0.42 }),
  ]);
};

export const clearProcess = (p: ValuePalette) => clearProcessAt(p, H);

export const clearProcessStory = clearProcessAt(COBALT, STORY_SIZE.height);

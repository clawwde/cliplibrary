import { type Fill, linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  type Nodes,
  path,
  photo,
  pill,
  rect,
  rotateNodes,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { POST, type PostTheme } from '../lagoon-saas-stats/theme';

const { width: W, height: H } = POST;

const head = (theme: PostTheme, size: number, fill: string) => ({
  fontFamily: theme.headFont,
  fontSize: size,
  fontWeight: 800,
  fill,
  lineHeight: 1.08,
});

const copyStyle = (theme: PostTheme, size: number, fill: string, weight = 400) => ({
  fontFamily: theme.bodyFont,
  fontSize: size,
  fontWeight: weight,
  fill,
  lineHeight: 1.35,
});

const ringSegment = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  from: number,
  to: number,
) => {
  const point = (radius: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return `${(cx + radius * Math.cos(radians)).toFixed(1)} ${(cy - radius * Math.sin(radians)).toFixed(1)}`;
  };
  return `M${point(outer, from)} A${outer} ${outer} 0 0 1 ${point(outer, to)} L${point(inner, to)} A${inner} ${inner} 0 0 0 ${point(inner, from)} Z`;
};

export const benefitsDonut = (theme: PostTheme): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.background, { name: 'Background' }),
    text(
      'Measurable gains for\nteams that ship fast.',
      560,
      90,
      440,
      copyStyle(theme, 28, theme.muted, 500),
    ),
    text('Benefits', 80, 260, 900, head(theme, 104, theme.text)),
    text('for You', 80, 372, 900, head(theme, 104, theme.brand)),
    text(
      'Ship faster with fewer\nhandoffs and meetings.',
      110,
      560,
      460,
      copyStyle(theme, 32, theme.text),
    ),
    text(
      'Turn expert know-how\ninto results you can see.',
      560,
      700,
      460,
      copyStyle(theme, 32, theme.text),
    ),
    path(
      ringSegment(540, 1350, 400, 240, 180, 76),
      0,
      0,
      W,
      H,
      theme.surface,
      { width: W, height: H },
      { name: 'Share A' },
    ),
    path(
      ringSegment(540, 1350, 400, 240, 72, 0),
      0,
      0,
      W,
      H,
      theme.brand,
      { width: W, height: H },
      { name: 'Share B' },
    ),
    text('60%', 253, 1066, 180, { ...head(theme, 60, theme.ink), align: 'center' }),
    text('40%', 710, 1130, 180, { ...head(theme, 60, theme.brandText), align: 'center' }),
  ]);

const roleList = (theme: PostTheme, items: readonly string[], y: number) =>
  items.map((item, index) => [
    icon('arrow-right', 470, y + index * 54 + 4, 30, theme.brand, { strokeWidth: 2.6 }),
    text(item, 516, y + index * 54, 500, copyStyle(theme, 30, theme.text, 500)),
  ]);

export const hiringVertical = (theme: PostTheme): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.deep, { name: 'Background' }),
    text('We are', 80, 360, 340, head(theme, 48, theme.text)),
    text('HIRING', 70, 1290, 900, {
      fontFamily: 'Anton',
      fontSize: 300,
      fontWeight: 400,
      fill: theme.brand,
      rotation: -90,
      lineHeight: 1,
      letterSpacing: 4,
    }),
    photo('team-2', 470, 90, 530, 300, { cornerRadius: 22 }),
    text('Growth Marketer', 470, 430, 560, head(theme, 56, theme.text)),
    roleList(
      theme,
      ['Weekly launch campaigns', 'Paid social experiments', 'Three product releases'],
      510,
    ),
    text('Responsibilities', 470, 730, 560, head(theme, 46, theme.text)),
    roleList(theme, ['Own the growth funnel', 'Report wins every week', 'Mentor two juniors'], 800),
    text('Join Our Team', 470, 1040, 560, head(theme, 46, theme.text)),
    text(
      'Send your CV to\njobs@orbitly.io',
      470,
      1110,
      560,
      copyStyle(theme, 32, theme.muted, 500),
    ),
  ]);

const globeDots = (theme: PostTheme, cx: number, cy: number, radius: number): Nodes[] => {
  const spacing = 34;
  const nodes: Nodes[] = [];
  for (let y = cy - radius; y <= cy + radius; y += spacing) {
    for (let x = cx - radius; x <= cx + radius; x += spacing) {
      const inside = (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2;
      const land = Math.sin(x * 0.012) + Math.cos(y * 0.016 + x * 0.004) > -0.15;
      if (inside) {
        nodes.push(circle(x, y, 6, theme.muted, { name: 'Map dot', opacity: land ? 0.85 : 0.22 }));
      }
    }
  }
  return nodes;
};

export const clearProcess = (theme: PostTheme): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.background, { name: 'Background' }),
    text('Clear process', 0, 110, W, { ...head(theme, 90, theme.text), align: 'center' }),
    text('Strategic. Effective.', 0, 220, W, { ...head(theme, 54, theme.brand), align: 'center' }),
    globeDots(theme, 540, 790, 360),
    avatar('woman-portrait-1', 300, 620, 74, theme.brand),
    avatar('man-portrait-1', 810, 580, 64, theme.surface),
    avatar('woman-portrait-4', 340, 1010, 64, theme.surface),
    avatar('man-portrait-3', 770, 990, 76, theme.brand),
    text('From first call to launch in four clear steps.', 0, 1230, W, {
      ...copyStyle(theme, 30, theme.muted, 500),
      align: 'center',
    }),
  ]);

const folder = (x: number, y: number, width: number, height: number, fill: Fill, name: string) => [
  rect(x, y - 54, width * 0.34, 80, fill, { name: `${name} tab`, cornerRadius: 18 }),
  rect(x, y, width, height, fill, { name, cornerRadius: 24 }),
];

export const expertsFolder = (theme: PostTheme): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.background, { name: 'Background' }),
    text('Insider notes', 80, 100, 600, copyStyle(theme, 30, theme.muted, 600)),
    folder(160, 260, 760, 520, '#4c0b5c', 'Back folder'),
    rotateNodes(-4, 540, 520, [
      rect(230, 340, 620, 420, theme.surface, { name: 'Sheet', cornerRadius: 8 }),
      [0, 1, 2, 3].map((index) =>
        rect(280, 400 + index * 60, 420 - index * 60, 16, '#e5e7eb', {
          name: 'Sheet line',
          cornerRadius: 8,
        }),
      ),
    ]),
    folder(80, 600, 920, 640, linear(160, theme.brand, '#7e22ce'), 'Front folder'),
    text('ONLY EXPERTS\nKNOW THIS', 140, 700, 820, head(theme, 84, '#ffffff')),
    text(
      'Your expertise is your real value. It is the lens that lets clients see things your way. Want to learn more?',
      140,
      920,
      800,
      copyStyle(theme, 32, '#ffffff'),
    ),
    pill('Read the full guide', 140, 1100, {
      fill: '#ffffff',
      color: theme.ink,
      fontSize: 30,
      fontFamily: theme.bodyFont,
      fontWeight: 700,
    }),
  ]);

export const employeeBadge = (theme: PostTheme): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.background, { name: 'Background' }),
    rect(500, 0, 80, 250, theme.deep, { name: 'Lanyard' }),
    rect(512, 236, 56, 80, '#9ca3af', { name: 'Clip', cornerRadius: 10 }),
    rotateNodes(-10, 400, 640, [
      rect(200, 330, 420, 640, theme.deep, { name: 'Back badge', cornerRadius: 28 }),
      text('Orbitly', 195, 930, 400, { ...head(theme, 56, theme.muted), rotation: -90 }),
    ]),
    rect(320, 300, 460, 700, theme.surface, {
      name: 'Badge',
      cornerRadius: 30,
      ...shadow(40, 16, 'rgba(0,0,0,0.35)'),
    }),
    rect(490, 326, 120, 22, theme.deep, { name: 'Badge slot', cornerRadius: 11 }),
    photo('woman-portrait-2', 360, 380, 380, 400, { cornerRadius: 18 }),
    text('EMPLOYEE\nSPOTLIGHT', 360, 806, 380, head(theme, 52, theme.ink)),
    text('Meet Anya Rivera', 360, 930, 380, copyStyle(theme, 28, '#4b5563', 500)),
    star(5, 820, 260, 150, theme.brand, { innerRatio: 0.45, name: 'Star' }),
    text('Our new SEO lead says hello. Welcome!', 0, 1120, W, {
      ...head(theme, 44, theme.text),
      align: 'center',
    }),
  ]);

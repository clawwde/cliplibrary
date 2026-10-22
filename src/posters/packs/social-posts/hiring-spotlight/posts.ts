import { linear } from '@/design';
import {
  checklist,
  group,
  icon,
  type Nodes,
  photo,
  pill,
  poly,
  polygon,
  rect,
  star,
  text,
} from '../../../kit';

export interface HiringTheme {
  brand: string;
  ink: string;
  paper: string;
  accent: string;
}

export const COBALT: HiringTheme = {
  brand: '#3b5bfd',
  ink: '#0b0d17',
  paper: '#fff6ea',
  accent: '#ffd23f',
};

export const PLUM: HiringTheme = {
  brand: '#7a2e5c',
  ink: '#1c0f18',
  paper: '#fdf1f6',
  accent: '#ff9f68',
};

export const POST = { width: 1080, height: 1350 } as const;

const HEAD = 'Outfit';

export const weAreHiring = (theme: HiringTheme): Nodes[] => [
  rect(0, 0, POST.width, POST.height, theme.brand, { name: 'Background' }),
  poly(
    [
      [0, 1180],
      [POST.width, 520],
      [POST.width, 690],
      [0, 1350],
    ],
    theme.paper,
    { name: 'Diagonal band' },
  ),
  text('We are', 80, 110, 600, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 500,
    fill: theme.paper,
  }),
  text('Hiring', 80, 180, 800, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 800,
    fill: theme.paper,
    lineHeight: 1,
  }),
  text('Join our team as a', 80, 400, 700, { fontSize: 40, fontWeight: 500, fill: theme.paper }),
  text('PRODUCT DESIGNER', 80, 452, 900, {
    fontSize: 52,
    fontWeight: 800,
    fill: theme.accent,
    letterSpacing: 2,
  }),
  photo('team-3', 560, 640, 440, 520, { cornerRadius: 36, stroke: theme.paper, strokeWidth: 10 }),
  star(5, 900, 90, 110, theme.accent, { innerRatio: 0.42 }),
  star(5, 120, 1010, 70, theme.paper, { innerRatio: 0.42 }),
  pill('Apply now', 80, 1180, { fill: theme.ink, color: theme.paper, fontSize: 34 }),
];

export const spotlightBadge = (theme: HiringTheme): Nodes[] => [
  rect(0, 0, POST.width, POST.height, theme.brand, { name: 'Background' }),
  rect(505, 0, 70, 260, theme.ink, { cornerRadius: 12, name: 'Lanyard' }),
  rect(230, 340, 520, 680, theme.ink, { cornerRadius: 40, rotation: -8, name: 'Back card' }),
  text('Team News', 270, 860, 360, {
    fontFamily: HEAD,
    fontSize: 56,
    fontWeight: 700,
    fill: theme.accent,
    rotation: -98,
  }),
  group(
    rect(330, 230, 460, 700, theme.paper, { cornerRadius: 40, name: 'Badge' }),
    rect(490, 260, 140, 26, theme.ink, { cornerRadius: 13, name: 'Badge slot' }),
    photo('woman-portrait-2', 375, 320, 370, 370, { cornerRadius: 28 }),
    text('TEAM\nSPOTLIGHT', 375, 720, 380, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: theme.ink,
      lineHeight: 1,
    }),
    text('Meet Priya Nair', 375, 840, 380, { fontSize: 30, fontWeight: 500, fill: '#4b5563' }),
  ),
  star(5, 760, 200, 130, theme.accent, { innerRatio: 0.42 }),
  text('Our new Growth Lead says hello!', 90, 1150, 900, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 700,
    fill: theme.paper,
    align: 'center',
  }),
];

export const verticalHiring = (theme: HiringTheme): Nodes[] => [
  rect(0, 0, POST.width, POST.height, theme.ink, { name: 'Background' }),
  text('HIRING', 60, 1290, 1200, {
    fontFamily: 'Anton',
    fontSize: 330,
    fontWeight: 400,
    fill: theme.brand,
    rotation: -90,
    letterSpacing: 6,
  }),
  rect(80, 1030, 64, 230, theme.paper, { cornerRadius: 10, name: 'Tag' }),
  text('We are', 100, 1250, 220, { fontSize: 34, fontWeight: 700, fill: theme.ink, rotation: -90 }),
  star(5, 70, 90, 90, theme.paper, { innerRatio: 0.42 }),
  text('Brand Designer', 500, 150, 520, {
    fontFamily: HEAD,
    fontSize: 60,
    fontWeight: 800,
    fill: theme.paper,
  }),
  checklist(['Social media visuals', 'Packaging refresh', 'Three launches a year'], 500, 260, 520, {
    color: '#d1d5db',
    iconColor: theme.accent,
    icon: 'arrow-right',
    fontSize: 32,
  }),
  text('What you will do', 500, 540, 520, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 800,
    fill: theme.paper,
  }),
  checklist(
    ['Own the visual system', 'Ship weekly campaigns', 'Mentor two juniors'],
    500,
    640,
    520,
    {
      color: '#d1d5db',
      iconColor: theme.accent,
      icon: 'arrow-right',
      fontSize: 32,
    },
  ),
  text('Join our crew', 500, 930, 520, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 800,
    fill: theme.paper,
  }),
  text('Send your portfolio to\njobs@northwind.studio', 500, 1010, 520, {
    fontSize: 32,
    fontWeight: 500,
    fill: '#d1d5db',
    lineHeight: 1.4,
  }),
];

export const takeTheSeat = (theme: HiringTheme): Nodes[] => [
  rect(0, 0, POST.width, POST.height, theme.ink, { name: 'Background' }),
  polygon(3, 160, 120, 640, 1150, linear(180, 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.32)'), {
    rotation: -14,
    name: 'Spotlight',
  }),
  icon('armchair', 300, 860, 300, theme.paper, { strokeWidth: 1.4 }),
  rect(560, 120, 200, 70, theme.paper, { name: 'Label' }),
  text("IT'S", 575, 128, 180, {
    fontFamily: 'Anton',
    fontSize: 52,
    fontWeight: 400,
    fill: theme.ink,
  }),
  rect(560, 200, 260, 90, theme.brand, { name: 'Label' }),
  text('TIME', 575, 205, 240, {
    fontFamily: 'Anton',
    fontSize: 72,
    fontWeight: 400,
    fill: theme.paper,
  }),
  text('TO CLAIM\nTHAT SEAT', 560, 300, 460, {
    fontFamily: 'Anton',
    fontSize: 92,
    fontWeight: 400,
    fill: theme.brand,
    lineHeight: 1,
  }),
  text(
    'We are looking for curious people who love solving problems for small businesses.',
    560,
    520,
    420,
    {
      fontSize: 30,
      fontWeight: 400,
      fill: '#d1d5db',
      lineHeight: 1.45,
    },
  ),
  star(5, 860, 900, 90, theme.accent, { innerRatio: 0.42 }),
  pill('Apply today', 560, 1150, { fill: theme.brand, color: theme.paper, fontSize: 32 }),
];

export const welcomePost = (theme: HiringTheme): Nodes[] => [
  rect(0, 0, POST.width, POST.height, theme.brand, { name: 'Background' }),
  text('WELCOME', 0, 90, POST.width, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: theme.paper,
    align: 'center',
    letterSpacing: 4,
  }),
  rect(170, 270, 740, 860, 'rgba(0,0,0,0)', {
    stroke: theme.paper,
    strokeWidth: 14,
    name: 'Frame',
  }),
  photo('man-portrait-3', 220, 320, 640, 760),
  rect(220, 1000, 420, 150, theme.paper, { name: 'Name card' }),
  text('DANIEL OKAFOR', 250, 1025, 380, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: theme.ink,
  }),
  text('Head of Customer Success', 250, 1085, 380, {
    fontSize: 26,
    fontWeight: 500,
    fill: '#4b5563',
  }),
  icon('sparkles', 860, 1150, 110, theme.accent, { strokeWidth: 2 }),
];

export const MINI_POSTS = [weAreHiring, spotlightBadge, verticalHiring, takeTheSeat, welcomePost];

import type { DesignIconName } from '@/design';
import { circle, icon, line, poly, rect, template, text } from '../../../kit';
import {
  BODY,
  caps,
  contacts,
  doubleRule,
  GARNET,
  HEAD,
  heading,
  iconTile,
  LETTER,
  monogram,
} from './brand';

const LEFT = 190;
const SPLIT = 600;
const RIGHT = 640;

const sectionTab = (label: string, top: number, height: number) => [
  poly(
    [
      [115, top],
      [150, top + 34],
      [150, top + height - 34],
      [115, top + height],
      [80, top + height - 34],
      [80, top + 34],
    ],
    GARNET.wine,
    { name: `${label} tab` },
  ),
  text(label, 98, top + height / 2 + 150, 300, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 600,
    fill: '#ffffff',
    align: 'center',
    rotation: -90,
    letterSpacing: 2,
  }),
];

const divider = (top: number, height: number) =>
  line(SPLIT + 18, top, height, GARNET.ink, 2, { rotation: 90 });

const bullets = (items: readonly string[], x: number, y: number, width: number) =>
  items.map((item, index) => [
    circle(x + 5, y + index * 34 + 13, 5, GARNET.wine),
    caps(item, x + 22, y + index * 34, width, 23),
  ]);

const tools: readonly { label: string; icon: DesignIconName; color: string }[] = [
  { label: 'VECTOR ILLUSTRATION', icon: 'pen-tool', color: '#f97316' },
  { label: 'PHOTO RETOUCHING', icon: 'image', color: '#3b82f6' },
  { label: 'LAYOUT AND PRINT', icon: 'newspaper', color: '#ec4899' },
  { label: 'MOTION DESIGN', icon: 'clapperboard', color: '#8b5cf6' },
  { label: '3D MOCKUPS', icon: 'layers', color: '#10b981' },
];

const specialties: readonly { label: string; icon: DesignIconName }[] = [
  { label: 'TYPOGRAPHY', icon: 'pencil' },
  { label: 'PHOTOGRAPHY', icon: 'camera' },
  { label: 'LOGO MARKS', icon: 'gem' },
  { label: 'ILLUSTRATION', icon: 'brush' },
  { label: 'PACKAGING', icon: 'gift' },
  { label: 'SOCIAL MEDIA', icon: 'share-2' },
  { label: 'EDITORIAL', icon: 'book-open' },
  { label: 'CAMPAIGNS', icon: 'megaphone' },
  { label: 'SIGNAGE', icon: 'flag' },
];

export const resume = template(LETTER.width, LETTER.height, () => [
  rect(0, 0, LETTER.width, LETTER.height, GARNET.paper, { name: 'Background' }),
  monogram(80, 70, 150, GARNET.wine, '#ffffff'),
  text('ARLO VANCE', 270, 70, 600, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 500,
    fill: GARNET.ink,
    lineHeight: 1,
    letterSpacing: 2,
  }),
  caps('BRAND DESIGNER\nART DIRECTOR', 272, 166, 400, 32, GARNET.ink, 500),
  poly(
    [
      [620, 268],
      [1195, 110],
      [1195, 268],
    ],
    GARNET.wine,
    { name: 'Wedge' },
  ),
  doubleRule(80, 280, 1115),
  sectionTab('PROFILE', 320, 290),
  heading('ABOUT ME', LEFT, 330, 38),
  text(
    'I am a brand designer who builds bold, simple identities for consumer brands. I move easily from strategy workshops to type, packaging and launch campaigns, and I love a tight brief.',
    LEFT,
    384,
    400,
    { fontFamily: BODY, fontSize: 22, fontWeight: 400, fill: GARNET.muted, lineHeight: 1.45 },
  ),
  divider(330, 260),
  heading('CONTACT', RIGHT, 330, 38),
  contacts.map((item, index) => [
    iconTile(item.icon, RIGHT, 390 + index * 70, 48),
    caps(item.label, RIGHT + 68, 398 + index * 70, 480, 28),
  ]),
  doubleRule(80, 630, 1115),
  sectionTab('SKILLS', 670, 270),
  heading('TOOLKIT', LEFT, 680, 34),
  tools.map((tool, index) => [
    rect(LEFT, 730 + index * 40, 28, 28, tool.color, { cornerRadius: 6, name: 'Tool tile' }),
    icon(tool.icon, LEFT + 5, 735 + index * 40, 18, '#ffffff', { strokeWidth: 2.4 }),
    caps(tool.label, LEFT + 42, 730 + index * 40, 360, 23),
  ]),
  divider(680, 250),
  heading('SPECIALTIES', RIGHT, 680, 34),
  specialties.map((item, index) => {
    const x = RIGHT + (index % 3) * 190;
    const y = 740 + Math.floor(index / 3) * 56;
    return [iconTile(item.icon, x, y, 34), caps(item.label, x + 44, y + 3, 150, 21)];
  }),
  doubleRule(80, 960, 1115),
  sectionTab('EDUCATION', 1000, 270),
  heading('2014-2018', LEFT, 1010, 60),
  caps('BA VISUAL COMMUNICATION', LEFT, 1082, 400, 26, GARNET.ink, 600),
  caps('RIVERTON SCHOOL OF ART', LEFT, 1116, 400, 22, GARNET.muted),
  caps('GPA', LEFT, 1160, 200, 26, GARNET.ink, 600),
  caps('3.9 / 4.0', LEFT, 1194, 200, 22, GARNET.muted),
  divider(1010, 250),
  heading('CERTIFICATES', RIGHT, 1010, 60),
  bullets(
    ['BRAND STRATEGY INTENSIVE', 'ADVANCED TYPE DESIGN', 'PACKAGING SYSTEMS', 'UX FOUNDATIONS'],
    RIGHT,
    1090,
    300,
  ),
  bullets(['ART DIRECTION LAB', 'MOTION BASICS', 'COLOUR THEORY'], RIGHT + 330, 1090, 230),
  doubleRule(80, 1290, 1115),
  sectionTab('EMPLOYMENT', 1330, 270),
  heading('WORK', LEFT, 1340, 60),
  caps('ORCHARD AND CO', LEFT, 1414, 400, 28, GARNET.ink, 600),
  caps('SENIOR BRAND DESIGNER / 2021-NOW', LEFT, 1450, 400, 21, GARNET.muted),
  caps('NORTHFIELD MEDIA', LEFT, 1500, 400, 28, GARNET.ink, 600),
  caps('VISUAL DESIGNER / 2018-2021', LEFT, 1536, 400, 21, GARNET.muted),
  divider(1340, 250),
  heading('ACHIEVEMENTS', RIGHT, 1340, 60),
  bullets(
    ['LED A FULL REBRAND IN 9 WEEKS', 'GREW SOCIAL REACH BY 3X', 'WON TWO PACKAGING AWARDS'],
    RIGHT,
    1420,
    330,
  ),
  bullets(['MENTORED 4 JUNIORS', 'LAUNCHED 30 BRANDS'], RIGHT + 360, 1420, 200),
]);

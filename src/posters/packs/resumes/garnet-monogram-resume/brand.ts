import type { DesignIconName } from '@/design';
import { icon, line, polygon, rect, text } from '../../../kit';

export const GARNET = {
  wine: '#3a1024',
  rose: '#f27aa3',
  blush: '#fbe3ec',
  paper: '#ffffff',
  ink: '#1f0b14',
  muted: '#5e4a53',
};

export const LETTER = { width: 1275, height: 1650 } as const;
export const HEAD = 'Barlow Condensed';
export const BODY = 'Barlow';

export const monogram = (x: number, y: number, size: number, fill: string, color: string) => [
  polygon(6, x, y, size, size, fill, { rotation: 0, name: 'Monogram' }),
  polygon(6, x + size * 0.14, y + size * 0.14, size * 0.72, size * 0.72, 'rgba(0,0,0,0)', {
    stroke: color,
    strokeWidth: size * 0.03,
    name: 'Monogram ring',
  }),
  text('AV', x, y + size * 0.27, size, {
    fontFamily: HEAD,
    fontSize: size * 0.4,
    fontWeight: 700,
    fill: color,
    align: 'center',
    lineHeight: 1,
    letterSpacing: size * 0.01,
  }),
];

export const doubleRule = (x: number, y: number, width: number, color = GARNET.ink) => [
  line(x, y, width, color, 2),
  line(x, y + 10, width, color, 2, { dashed: true }),
];

export const iconTile = (name: DesignIconName, x: number, y: number, size: number) => [
  rect(x, y, size, size, GARNET.rose, { cornerRadius: size * 0.22, name: 'Icon tile' }),
  icon(name, x + size * 0.2, y + size * 0.2, size * 0.6, GARNET.wine, { strokeWidth: 2.4 }),
];

export const contacts: readonly { icon: DesignIconName; label: string }[] = [
  { icon: 'mail', label: 'ARLO@VANCESTUDIO.CO' },
  { icon: 'phone', label: '(555) 618-2034' },
  { icon: 'globe', label: 'VANCESTUDIO.CO' },
];

export const heading = (label: string, x: number, y: number, size: number, color = GARNET.ink) =>
  text(label, x, y, 900, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 600,
    fill: color,
    lineHeight: 1,
  });

export const caps = (
  label: string,
  x: number,
  y: number,
  width: number,
  size: number,
  color = GARNET.ink,
  weight = 500,
) =>
  text(label, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill: color,
    lineHeight: 1.3,
  });

export const LETTER_TEXT = [
  'Dear Hiring Team,',
  'I am writing to apply for the Senior Brand Designer role at Copperline. Your identity work for independent makers has inspired me for years, and I would love to help shape the next chapter of the studio.',
  'For the past seven years I have built visual systems for consumer brands, from logo and type to packaging and campaign rollouts. At Orchard and Co I led a rebrand for a regional coffee roaster that lifted shelf sales by 31% in its first season, and I set up the template library our team still uses today.',
  'I enjoy turning complicated briefs into simple, confident ideas, and I care about craft down to the last kerning pair. I would welcome the chance to share my portfolio and learn more about your plans.',
  'Thank you for your time and consideration.',
  'Sincerely,',
].join('\n\n');

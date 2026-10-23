import { linear, NO_FILTERS } from '@/design';
import { dots, rect, SLIDE_SIZE } from '../../../kit';
import { typeset } from '../coral-b2b-agency-deck/deck-kit';

export const EV = {
  ink: '#0f2a25',
  muted: '#5c726c',
  mint: '#5fd3a8',
  emerald: '#2f9e7c',
  forest: '#0b2622',
  forestMid: '#1d5c50',
  paper: '#f2f7f5',
  line: '#d3e3dd',
  soft: 'rgba(255,255,255,0.74)',
  white: '#ffffff',
};

export const { width: SW, height: SH } = SLIDE_SIZE;

export const { head, body } = typeset('Urbanist', 'Work Sans');

export const GRAY = { filters: { ...NO_FILTERS, grayscale: 1 } };

export const lightBg = () => [
  rect(0, 0, SW, SH, linear(160, EV.white, EV.paper), { name: 'Background' }),
  dots(1480, 700, 12, 10, 34, 'rgba(47,158,124,0.13)', 4),
];

export const darkBg = () =>
  rect(0, 0, SW, SH, linear(180, EV.forest, EV.forest, EV.forestMid), { name: 'Background' });

export const glass = (x: number, y: number, width: number, height: number, radius = 24) =>
  rect(x, y, width, height, linear(180, 'rgba(95,211,168,0.42)', 'rgba(95,211,168,0.08)'), {
    name: 'Glass tile',
    cornerRadius: radius,
    stroke: 'rgba(255,255,255,0.2)',
    strokeWidth: 2,
  });

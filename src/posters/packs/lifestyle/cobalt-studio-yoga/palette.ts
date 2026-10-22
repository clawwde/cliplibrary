import { icon, text } from '../../../kit';

export const CO = {
  cobalt: '#2f4bff',
  deep: '#1a2bb8',
  ink: '#0d0f1a',
  paper: '#f4f2ec',
  lilac: '#c9d1ff',
  white: '#ffffff',
  grey: '#6b7085',
};

export const SANS = 'Plus Jakarta Sans';
export const SERIF = 'Playfair Display';

export const brandMark = (x: number, y: number, color: string, size = 36) => [
  icon('flower-2', x, y, size * 1.2, color, { strokeWidth: 2 }),
  text('Driftwood', x + size * 1.6, y + size * 0.05, size * 7, {
    fontFamily: SANS,
    fontSize: size,
    fontWeight: 700,
    fill: color,
  }),
];

export const centeredMark = (centerX: number, y: number, color: string, size = 36) =>
  brandMark(centerX - size * 3.5, y, color, size);

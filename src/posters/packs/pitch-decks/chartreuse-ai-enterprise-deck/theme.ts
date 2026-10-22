import { linear, NO_FILTERS, radial } from '@/design';
import { circle, photo, rect, SLIDE_SIZE } from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { typeset } from '../coral-b2b-agency-deck/deck-listing';

export const K = {
  black: '#060805',
  panel: '#121610',
  panelSoft: '#1c2318',
  lime: '#b8f531',
  limeDeep: '#8fc61a',
  olive: '#3d5a0c',
  white: '#ffffff',
  muted: '#a3ab9c',
  line: 'rgba(255,255,255,0.14)',
};

export const { width: SW, height: SH } = SLIDE_SIZE;

export const { head, body } = typeset('Space Grotesk', 'Manrope');

export const backdrop = (angle = 180) => [
  rect(0, 0, SW, SH, K.black, { name: 'Background' }),
  rect(0, 0, SW, SH, linear(angle, 'rgba(61,90,12,0.6)', 'rgba(6,8,5,0)', 'rgba(6,8,5,0)'), {
    name: 'Glow wash',
  }),
];

export const glow = (cx: number, cy: number, radius: number, strength = 0.55) =>
  circle(
    cx,
    cy,
    radius,
    radial(
      `rgba(184,245,49,${strength})`,
      `rgba(143,198,26,${(strength * 0.3).toFixed(2)})`,
      'rgba(61,90,12,0)',
      'rgba(61,90,12,0)',
    ),
    { name: 'Glow' },
  );

export const mono = (
  name: PosterPhotoName,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 28,
) =>
  photo(name, x, y, width, height, {
    cornerRadius: radius,
    filters: { ...NO_FILTERS, grayscale: 1, contrast: 1.1 },
  });

export const fade = (from: string) => linear(180, from, 'rgba(255,255,255,0.04)');

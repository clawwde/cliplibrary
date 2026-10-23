import { rect, SLIDE_SIZE } from '../../../kit';
import { typeset } from './deck-kit';

export const NV = {
  plum: '#2b1236',
  plumSoft: '#44214f',
  coral: '#ff7a59',
  peach: '#ffd5c6',
  cream: '#fff7f2',
  ink: '#24102e',
  grey: '#6e5f76',
  line: '#ead9d0',
  white: '#ffffff',
};

export const { width: SW, height: SH } = SLIDE_SIZE;

export const { head, body } = typeset('Bricolage Grotesque', 'DM Sans');

export const backdrop = (fill: string) => rect(0, 0, SW, SH, fill, { name: 'Background' });

export const marker = (x: number, y: number) =>
  rect(x, y, 72, 12, NV.coral, { name: 'Accent bar', cornerRadius: 6 });

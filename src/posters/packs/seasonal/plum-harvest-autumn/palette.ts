import { photo, rect, rotateNodes, shadow } from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export const AUT = {
  plum: '#4a2338',
  berry: '#7b3a52',
  rose: '#c98b8b',
  sage: '#7f8f6a',
  butter: '#f1dca7',
  oat: '#f5efe4',
  espresso: '#2b1d18',
  white: '#ffffff',
  line: '#e4dccd',
};

export const SERIF = 'Fraunces';
export const HAND = 'Caveat';
export const BODY = 'DM Sans';

export const snap = (
  name: PosterPhotoName,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
) =>
  rotateNodes(rotation, x + width / 2, y + height / 2, [
    rect(x - 16, y - 16, width + 32, height + 32, AUT.white, {
      name: 'Photo border',
      ...shadow(24, 10, 'rgba(43,29,24,0.25)'),
    }),
    photo(name, x, y, width, height),
  ]);

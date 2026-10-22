import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import { photo, rect } from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export const HAWKS = {
  navy: '#0a1631',
  deep: '#050c1d',
  steel: '#12264d',
  ice: '#8fd3ff',
  blue: '#1d6fb8',
  frost: '#eef5fb',
  amber: '#ffb81c',
  gold: '#e08e0b',
  white: '#ffffff',
};

export const DISPLAY = 'Bebas Neue';
export const LABEL = 'Barlow Condensed';
export const SCRIPT = 'Satisfy';

export const iceBackground = (width: number, height: number) => [
  rect(0, 0, width, height, linear(180, '#f6fafd', '#d3e4f1'), { name: 'Ice' }),
  [0.12, 0.31, 0.55, 0.78].map((ratio, index) =>
    rect(width * ratio, height * (0.1 + index * 0.21), width * 0.18, 3, 'rgba(29,111,184,0.12)', {
      rotation: index % 2 === 0 ? 8 : -6,
      name: 'Skate mark',
    }),
  ),
];

export const toned = (
  name: PosterPhotoName,
  x: number,
  y: number,
  width: number,
  height: number,
  tint: string,
  style: { radius?: number; flip?: boolean } = {},
) => [
  photo(name, x, y, width, height, {
    cornerRadius: style.radius ?? 0,
    flipX: style.flip ?? false,
    filters: IMAGE_FILTER_PRESETS.mono,
  }),
  rect(x, y, width, height, tint, { cornerRadius: style.radius ?? 0, name: 'Photo tint' }),
];

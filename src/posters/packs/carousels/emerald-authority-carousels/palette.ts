import { linear } from '@/design';
import { POST_SIZE, rect, text } from '../../../kit';
import { trail } from '../coral-tide-carousels/showcase';

export const LEAF = {
  deep: '#04231b',
  mid: '#0a4334',
  mint: '#6ee7b7',
  wire: '#d1fae5',
  white: '#ffffff',
};

export const HEAD = 'Outfit';
export const BODY = 'DM Sans';
export const SCRIPT = 'Caveat';
export const BRAND = 'EVERLEAF MEDIA';

export const { width: W, height: H } = POST_SIZE;

export const leafBackground = () => [
  rect(0, 0, W, H, linear(165, '#0b4a39', '#031a14'), { name: 'Background' }),
  trail('M0 420 Q540 0 1080 300', 0, 880, W, 440, 'rgba(110,231,183,0.12)', 3),
];

export const brandMark = (x: number, y: number) =>
  text(BRAND, x, y, 520, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 800,
    fill: LEAF.white,
    letterSpacing: 3,
  });

export const titleLine = (content: string, x: number, y: number, size: number, fill: string) =>
  text(content, x, y, W - x - 60, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 700,
    fill,
    lineHeight: 1.15,
  });

export const bodyText = (
  content: string,
  x: number,
  y: number,
  width: number,
  align: 'left' | 'center' = 'left',
) =>
  text(content, x, y, width, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 500,
    fill: LEAF.white,
    lineHeight: 1.4,
    align,
  });

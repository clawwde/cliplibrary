import { linear } from '@/design';
import { icon, POST_SIZE, rect, text } from '../../../kit';

export const BERRY = {
  hot: '#ff3f7f',
  deep: '#9e1046',
  ink: '#1c0a14',
  white: '#ffffff',
  blush: '#ffe1ec',
  sun: '#ffd23f',
};

export const FONT = 'Plus Jakarta Sans';

export const { width: W, height: H } = POST_SIZE;

export const berryBackground = () =>
  rect(0, 0, W, H, linear(155, '#ff5a8f', '#b0124f'), { name: 'Background' });

export const brandMark = (x: number, y: number, align: 'left' | 'center' = 'left') => {
  const width = align === 'center' ? W - x * 2 : 500;
  return [
    text('LUMEN LABS', x, y, width, {
      fontFamily: FONT,
      fontSize: 44,
      fontWeight: 800,
      fill: BERRY.white,
      align,
      letterSpacing: 1,
    }),
    text('AI STUDIO', x, y + 56, width, {
      fontFamily: FONT,
      fontSize: 22,
      fontWeight: 600,
      fill: BERRY.blush,
      align,
      letterSpacing: 6,
    }),
  ];
};

export const swipeFooter = () => [
  rect(80, 1200, 920, 3, 'rgba(255,255,255,0.35)', { name: 'Footer rule' }),
  text('lumenlabs.ai', 80, 1240, 500, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 600,
    fill: BERRY.blush,
  }),
  text('Swipe', 700, 1240, 220, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 700,
    fill: BERRY.white,
    align: 'right',
  }),
  icon('chevrons-right', 936, 1236, 44, BERRY.white, { strokeWidth: 2.6 }),
];

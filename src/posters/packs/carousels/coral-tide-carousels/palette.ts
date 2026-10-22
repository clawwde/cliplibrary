import { linear } from '@/design';
import { icon, POST_SIZE, rect, text } from '../../../kit';

export const TIDE = {
  deep: '#0d2a30',
  coral: '#ff7a59',
  cream: '#fdf3ea',
  white: '#ffffff',
  mist: '#b8d4d6',
};

export const HEAD = 'Sora';
export const BODY = 'Manrope';
export const BRAND = 'NORTHBEAM STUDIO';

export const { width: W, height: H } = POST_SIZE;

export const darkBackground = () =>
  rect(0, 0, W, H, linear(160, '#123a42', '#0a1f24'), { name: 'Background' });

export const brandFooter = (color: string, arrow: string) => [
  text(BRAND, 90, 1200, 600, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 700,
    fill: color,
    letterSpacing: 3,
  }),
  icon('arrow-right', 890, 1170, 100, arrow, { strokeWidth: 2.6 }),
];

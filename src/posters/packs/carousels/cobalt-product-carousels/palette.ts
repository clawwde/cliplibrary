import { linear } from '@/design';
import { POST_SIZE, rect, text } from '../../../kit';

export const COBALT = {
  ink: '#0a0f1f',
  sky: '#38bdf8',
  blue: '#2563eb',
  white: '#ffffff',
  grey: '#4b5563',
  line: '#e5e7eb',
};

export const glow = () => linear(160, '#38bdf8', '#1d4ed8');

export const HEAD = 'Urbanist';
export const BODY = 'Inter';
export const SITE = 'orbitalworks.co';

export const { width: W, height: H } = POST_SIZE;

export const inkBackground = () => rect(0, 0, W, H, COBALT.ink, { name: 'Background' });

export const brandLine = (x: number, y: number, color: string) =>
  text('ORBITAL WORKS', x, y, 600, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 800,
    fill: color,
    letterSpacing: 3,
  });

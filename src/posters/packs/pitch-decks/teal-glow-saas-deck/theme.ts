import { radial } from '@/design';
import { circle, rect, SLIDE_SIZE } from '../../../kit';
import { typeset } from '../coral-b2b-agency-deck/deck-listing';

export const HX = {
  night: '#07090b',
  panel: '#11171a',
  panelSoft: '#1a2226',
  teal: '#19e3c4',
  deep: '#0b8f86',
  white: '#ffffff',
  muted: '#9aa7ad',
  rule: 'rgba(255,255,255,0.14)',
};

export const { width: SW, height: SH } = SLIDE_SIZE;

export const { head, body } = typeset('Sora', 'Inter');

export const backdrop = () => rect(0, 0, SW, SH, HX.night, { name: 'Background' });

export const glow = (cx: number, cy: number, radius: number, strength = 0.38) =>
  circle(
    cx,
    cy,
    radius,
    radial(
      `rgba(25,227,196,${strength})`,
      `rgba(11,143,134,${strength * 0.4})`,
      'rgba(11,143,134,0)',
      'rgba(11,143,134,0)',
    ),
    { name: 'Glow' },
  );

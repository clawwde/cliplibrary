import { group, icon, POST_SIZE, rect, text } from '../../../kit';

export const SIGNAL = {
  ink: '#140f26',
  night: '#211a3d',
  plum: '#3a2c63',
  amber: '#ffb43c',
  flame: '#ff7a3d',
  paper: '#f6f0e6',
  white: '#ffffff',
  mute: '#b9b0d6',
  slate: '#4a4560',
};

export const MONO = {
  brightness: 1,
  contrast: 1.15,
  saturation: 0,
  hue: 0,
  blur: 0,
  grayscale: 1,
  sepia: 0,
  invert: 0,
};

export const { width: W, height: H } = POST_SIZE;

export const brandMark = (color: string, y: number, centerX = W / 2) =>
  group(
    icon('mic', centerX - 150, y, 44, color, { strokeWidth: 2.4 }),
    text('Lumen Radio', centerX - 98, y + 1, 260, {
      fontFamily: 'Barlow',
      fontSize: 38,
      fontWeight: 700,
      fill: color,
    }),
  );

export const waveform = (
  x: number,
  centerY: number,
  width: number,
  maxHeight: number,
  count: number,
  fill: string,
) => {
  const slot = width / count;
  return Array.from({ length: count }, (_, index) => {
    const wave = Math.abs(Math.sin(index * 0.55) * Math.cos(index * 0.17));
    const barHeight = Math.max(maxHeight * 0.12, maxHeight * (0.25 + 0.75 * wave));
    return rect(
      x + index * slot + slot * 0.2,
      centerY - barHeight / 2,
      slot * 0.6,
      barHeight,
      fill,
      {
        name: 'Wave bar',
        cornerRadius: slot * 0.3,
      },
    );
  });
};

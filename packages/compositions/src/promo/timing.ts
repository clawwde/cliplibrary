import { Easing, interpolate } from 'remotion';

export const smooth = Easing.bezier(0.65, 0, 0.35, 1);
export const settle = Easing.bezier(0.25, 0.8, 0.35, 1);
export const accelerate = Easing.bezier(0.7, 0, 0.84, 0);

export const tween = (
  frame: number,
  range: [number, number],
  output: [number, number],
  easing: (t: number) => number = smooth,
): number =>
  interpolate(frame, range, output, {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const pixelTween = (
  frame: number,
  range: [number, number],
  [from, to]: [number, number],
  easing: (t: number) => number = smooth,
): number => {
  const start = Math.round(from);
  const distance = Math.abs(Math.round(to) - start);
  if (distance === 0 || frame <= range[0]) {
    return start;
  }
  const direction = Math.sign(Math.round(to) - start);
  let travelled = 0;
  for (let step = Math.floor(range[0]) + 1; step <= frame && travelled < distance; step++) {
    const ideal = Math.abs(
      tween(step, range, [from, to], easing) - tween(step - 1, range, [from, to], easing),
    );
    travelled = Math.min(distance, travelled + Math.max(1, Math.round(ideal)));
  }
  return start + direction * travelled;
};

export const TAU = Math.PI * 2;

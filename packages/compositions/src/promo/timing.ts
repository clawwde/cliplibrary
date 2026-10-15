import { Easing, interpolate } from 'remotion';

export const smooth = Easing.bezier(0.65, 0, 0.35, 1);
export const settle = Easing.bezier(0.25, 0.8, 0.35, 1);
const accelerate = Easing.bezier(0.7, 0, 0.84, 0);

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

export const MIN_TEXT_SPEED = 1;

export const landing = (
  frame: number,
  range: [number, number],
  distance: number,
  easing: (t: number) => number = settle,
): number => {
  const offset = (at: number) => distance * (1 - tween(at, range, [0, 1], easing));
  let slow = range[0];
  while (slow < range[1] && offset(slow) - offset(slow + 1) >= MIN_TEXT_SPEED) {
    slow += 1;
  }
  if (frame <= slow) {
    return offset(frame);
  }
  const tail = offset(slow);
  const speed = tail / Math.max(1, Math.floor(tail / MIN_TEXT_SPEED));
  return Math.max(0, tail - (frame - slow) * speed);
};

export const launch = (
  frame: number,
  range: [number, number],
  distance: number,
  easing: (t: number) => number = accelerate,
): number =>
  frame <= range[0]
    ? 0
    : Math.min(
        distance,
        Math.max(
          distance * tween(frame, range, [0, 1], easing),
          (frame - range[0]) * MIN_TEXT_SPEED,
        ),
      );

export const track = (
  frame: number,
  keys: [number, number][],
  easing: (t: number) => number = smooth,
): number => {
  const first = keys[0];
  const last = keys.at(-1);
  if (first === undefined || last === undefined) {
    return 0;
  }
  if (frame <= first[0]) {
    return first[1];
  }
  for (let index = 0; index < keys.length - 1; index++) {
    const current = keys[index];
    const next = keys[index + 1];
    if (current !== undefined && next !== undefined && frame <= next[0]) {
      return tween(frame, [current[0], next[0]], [current[1], next[1]], easing);
    }
  }
  return last[1];
};

export const TAU = Math.PI * 2;

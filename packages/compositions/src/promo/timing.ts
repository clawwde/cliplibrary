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
  [first, last]: [number, number],
  [from, to]: [number, number],
  easing: (t: number) => number = smooth,
): number => {
  const start = Math.round(from);
  const target = Math.round(to);
  if (start === target || frame <= first) {
    return start;
  }
  const direction = Math.sign(target - start);
  let position = start;
  for (let step = Math.ceil(first + 1e-9); step <= Math.min(frame, last); step++) {
    const eased = Math.round(tween(step, [first, last], [from, to], easing));
    position =
      direction > 0
        ? Math.min(target, Math.max(eased, position + 1))
        : Math.max(target, Math.min(eased, position - 1));
  }
  return frame >= last ? target : position;
};

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

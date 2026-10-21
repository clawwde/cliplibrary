import type { MagnifierCaptionProps } from '@/schemas';
import { smooth, tween } from '../promo/timing';
import { type Bubble, idlePose, type LensPose, lensPose, type Point, targetPoint } from './field';

export interface FieldState {
  lens: LensPose;
  focus: Point;
  offset: Point;
}

interface Key {
  start: number;
  focus: Point;
  lens: LensPose;
}

export const wordStart = (index: number, timing: MagnifierCaptionProps['timing']): number =>
  timing.firstWord + index * timing.wordInterval;

const keysFor = (props: MagnifierCaptionProps, count: number): Key[] => {
  const { timing } = props;
  const keys: Key[] = [];
  for (let index = 0; index < count; index++) {
    keys.push({
      start: wordStart(index, timing) - timing.arriveLead,
      focus: targetPoint(index),
      lens: lensPose(index, props.lens),
    });
  }
  keys.push({ start: timing.returnFrame, focus: { x: 0, y: 0 }, lens: idlePose(props.lens) });
  return keys;
};

export const fieldState = (
  frame: number,
  props: MagnifierCaptionProps,
  count: number,
): FieldState => {
  const keys = keysFor(props, count);
  const idle = idlePose(props.lens);
  const focus = { x: 0, y: 0 };
  const lens = { ...idle };
  let previous: Key = { start: 0, focus: { x: 0, y: 0 }, lens: idle };
  for (const key of keys) {
    const progress = tween(
      frame,
      [key.start, key.start + props.timing.travelFrames],
      [0, 1],
      smooth,
    );
    focus.x += (key.focus.x - previous.focus.x) * progress;
    focus.y += (key.focus.y - previous.focus.y) * progress;
    lens.x += (key.lens.x - previous.lens.x) * progress;
    lens.y += (key.lens.y - previous.lens.y) * progress;
    lens.angle += (key.lens.angle - previous.lens.angle) * progress;
    previous = key;
  }
  const drift = props.field.drift;
  const sway = props.lens.sway;
  lens.x += Math.sin(frame / 71) * 3 * sway;
  lens.y += Math.cos(frame / 59) * 3 * sway;
  lens.angle += Math.sin(frame / 53) * 1.2 * sway;
  return {
    lens,
    focus,
    offset: {
      x: lens.x - focus.x + Math.sin(frame / 30) * drift,
      y: lens.y - focus.y + Math.cos(frame / 41) * drift * 0.7,
    },
  };
};

const smoothstep = (edge0: number, edge1: number, value: number): number => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export const glowFor = (
  bubble: Bubble,
  frame: number,
  state: FieldState,
  props: MagnifierCaptionProps,
  count: number,
): number => {
  if (bubble.target < 0) {
    return 0;
  }
  const { timing } = props;
  const enter = wordStart(bubble.target, timing) - timing.arriveLead;
  const leave =
    bubble.target + 1 < count
      ? wordStart(bubble.target + 1, timing) - timing.arriveLead + timing.travelFrames
      : timing.returnFrame + timing.travelFrames;
  const window =
    tween(frame, [enter - 4, enter], [0, 1]) * tween(frame, [leave - 4, leave], [1, 0]);
  const distance = Math.hypot(
    bubble.x + state.offset.x - state.lens.x,
    bubble.y + state.offset.y - state.lens.y,
  );
  const radius = props.lens.radius;
  return window * (1 - smoothstep(radius * 0.08, radius * 0.85, distance));
};

export const charOpacity = (
  frame: number,
  start: number,
  index: number,
  props: MagnifierCaptionProps,
): number => {
  const { caption, timing } = props;
  const appear = start + index * caption.charStagger;
  const vanish = timing.fadeOutFrame + index * timing.fadeOutStagger;
  const shown = tween(frame, [appear, appear + caption.charFade], [0, 1], (t) => t);
  const gone = tween(frame, [vanish, vanish + caption.charFade], [0, 1], (t) => t);
  return shown * (1 - gone);
};

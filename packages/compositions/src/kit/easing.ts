import { Easing } from 'remotion';

export const EASINGS = {
  linear: Easing.linear,
  easeOut: Easing.out(Easing.cubic),
  easeInOut: Easing.inOut(Easing.cubic),
  easeIn: Easing.in(Easing.cubic),
} as const;

export type EasingId = keyof typeof EASINGS;

export const EASING_IDS = Object.keys(EASINGS) as EasingId[];

export const resolveEasing = (id: EasingId): ((t: number) => number) => EASINGS[id];

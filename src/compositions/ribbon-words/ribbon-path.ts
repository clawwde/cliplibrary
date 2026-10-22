import type { RibbonWordsProps } from '@/schemas';
import { TAU } from '../promo/timing';

const SEGMENTS = 64;
const LENGTH_SAMPLES = 6;
const DERIVATIVE_STEP = 1e-4;

type Point = { x: number; y: number };

type CurveFn = (t: number) => Point;

export type Curve = {
  d: string;
  lengths: number[];
  length: number;
};

export type RibbonLane = {
  offsetY: number;
  shift: number;
};

const cubicPoint = (a: Point, b: Point, c: Point, d: Point, t: number): Point => {
  const u = 1 - t;
  const w0 = u * u * u;
  const w1 = 3 * u * u * t;
  const w2 = 3 * u * t * t;
  const w3 = t * t * t;
  return {
    x: w0 * a.x + w1 * b.x + w2 * c.x + w3 * d.x,
    y: w0 * a.y + w1 * b.y + w2 * c.y + w3 * d.y,
  };
};

const derivative = (fn: CurveFn, t: number): Point => {
  const a = fn(t - DERIVATIVE_STEP);
  const b = fn(t + DERIVATIVE_STEP);
  return {
    x: (b.x - a.x) / (2 * DERIVATIVE_STEP),
    y: (b.y - a.y) / (2 * DERIVATIVE_STEP),
  };
};

const buildCurve = (fn: CurveFn): Curve => {
  const step = 1 / SEGMENTS;
  const first = fn(0);
  const parts = [`M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`];
  const lengths = [0];
  let length = 0;
  for (let index = 0; index < SEGMENTS; index++) {
    const t0 = index * step;
    const a = fn(t0);
    const d = fn(t0 + step);
    const ta = derivative(fn, t0);
    const td = derivative(fn, t0 + step);
    const b = { x: a.x + (ta.x * step) / 3, y: a.y + (ta.y * step) / 3 };
    const c = { x: d.x - (td.x * step) / 3, y: d.y - (td.y * step) / 3 };
    parts.push(
      `C ${b.x.toFixed(2)} ${b.y.toFixed(2)} ${c.x.toFixed(2)} ${c.y.toFixed(2)} ${d.x.toFixed(2)} ${d.y.toFixed(2)}`,
    );
    let previous = a;
    for (let sample = 1; sample <= LENGTH_SAMPLES; sample++) {
      const point = cubicPoint(a, b, c, d, sample / LENGTH_SAMPLES);
      length += Math.hypot(point.x - previous.x, point.y - previous.y);
      previous = point;
    }
    lengths.push(length);
  }
  return { d: parts.join(' '), lengths, length };
};

export const lengthToT = (curve: Curve, distance: number): number => {
  const { lengths } = curve;
  if (distance <= 0) {
    return 0;
  }
  if (distance >= curve.length) {
    return 1;
  }
  let low = 0;
  let high = lengths.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if ((lengths[middle] ?? 0) <= distance) {
      low = middle;
    } else {
      high = middle;
    }
  }
  const from = lengths[low] ?? 0;
  const to = lengths[high] ?? from;
  const within = to > from ? (distance - from) / (to - from) : 0;
  return (low + within) / SEGMENTS;
};

export const tToLength = (curve: Curve, t: number): number => {
  const position = Math.min(SEGMENTS, Math.max(0, t * SEGMENTS));
  const index = Math.min(SEGMENTS - 1, Math.floor(position));
  const from = curve.lengths[index] ?? 0;
  const to = curve.lengths[index + 1] ?? from;
  return from + (to - from) * (position - index);
};

const ribbonOvershoot = (props: RibbonWordsProps): number =>
  Math.ceil(props.ribbon.width / 2 + props.words.size + 60);

export const ribbonSway = (props: RibbonWordsProps, frame: number): number => {
  const { amplitude, breathe, breatheFrames } = props.path;
  return amplitude > 0 ? (breathe / amplitude) * Math.sin((TAU * frame) / breatheFrames) : 0;
};

const bend = (
  shape: RibbonWordsProps['path']['shape'],
  t: number,
  omega: number,
  phase: number,
): number => {
  if (shape === 'swoop') {
    return -Math.sin(Math.PI * t) * Math.cos(phase);
  }
  if (shape === 'swell') {
    return Math.sin(omega * t + phase) * (0.2 + 0.8 * t);
  }
  return Math.sin(omega * t + phase);
};

const centerFn = (
  props: RibbonWordsProps,
  frameWidth: number,
  sway: number,
  lane: RibbonLane,
): CurveFn => {
  const { centerY, drop, amplitude, waves, shift, shape } = props.path;
  const overshoot = ribbonOvershoot(props);
  const span = frameWidth + overshoot * 2;
  const phase = ((shift + lane.shift) / 360) * TAU + sway;
  const omega = TAU * waves;
  return (t) => ({
    x: -overshoot + span * t,
    y: centerY + lane.offsetY + (t - 0.5) * drop + amplitude * bend(shape, t, omega, phase),
  });
};

const offsetFn =
  (fn: CurveFn, distance: number): CurveFn =>
  (t) => {
    const point = fn(t);
    const tangent = derivative(fn, t);
    const size = Math.hypot(tangent.x, tangent.y) || 1;
    return {
      x: point.x - (tangent.y / size) * distance,
      y: point.y + (tangent.x / size) * distance,
    };
  };

export type RibbonGeometry = {
  center: Curve;
  entry: number;
  sides: [Curve, Curve] | null;
};

export const buildRibbon = (
  props: RibbonWordsProps,
  frameWidth: number,
  sway: number,
  lane: RibbonLane,
  withSides: boolean,
): RibbonGeometry => {
  const fn = centerFn(props, frameWidth, sway, lane);
  const center = buildCurve(fn);
  const overshoot = ribbonOvershoot(props);
  const entryT = Math.max(0, overshoot - props.ribbon.width / 2 - 8) / (frameWidth + overshoot * 2);
  const reach = Math.max(0, props.ribbon.width / 2 - props.ribbon.outline / 2);
  return {
    center,
    entry: tToLength(center, entryT),
    sides: withSides ? [buildCurve(offsetFn(fn, reach)), buildCurve(offsetFn(fn, -reach))] : null,
  };
};

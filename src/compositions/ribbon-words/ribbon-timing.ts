import { Easing } from 'remotion';
import type { RibbonWordsProps } from '@/schemas';
import { tween } from '../promo/timing';

const draw = Easing.bezier(0.35, 0.35, 0.55, 1);
const retract = Easing.bezier(0.45, 0, 0.7, 0.55);
const SCAN_STEP = 0.25;
const REFINE_STEPS = 24;

export type RibbonMotion = {
  head: number;
  tail: number;
  textCenter: number;
};

type Track = {
  length: number;
  entry: number;
  textWidth: number;
};

const headAt = (timing: RibbonWordsProps['timing'], track: Track, frame: number): number =>
  tween(
    frame,
    [timing.drawAt, timing.drawAt + timing.drawFrames],
    [track.entry, track.length],
    draw,
  );

const hermite = (s: number, startSlope: number, endSlope: number): number => {
  const s2 = s * s;
  const s3 = s2 * s;
  return (s3 - 2 * s2 + s) * startSlope + (3 * s2 - 2 * s3) + (s3 - s2) * endSlope;
};

const holdCenter = (timing: RibbonWordsProps['timing'], track: Track, frame: number): number => {
  const { drawAt, drawFrames, lag, settleAt, settleFrames, drift } = timing;
  const rest = settleAt * track.length;
  const ride = (at: number) => headAt(timing, track, at) - lag - track.textWidth / 2;
  const speed = (at: number) => headAt(timing, track, at + 0.5) - headAt(timing, track, at - 0.5);
  const slack = (at: number) => rest - ride(at) - (settleFrames * (speed(at) + 2 * drift)) / 3;
  const drawEnd = drawAt + drawFrames;
  let low = drawAt;
  let high = drawEnd;
  if (slack(drawAt) <= 0) {
    high = drawAt;
  } else {
    let scan = drawAt;
    while (scan < drawEnd && slack(scan + SCAN_STEP) > 0) {
      scan += SCAN_STEP;
    }
    low = scan;
    high = Math.min(drawEnd, scan + SCAN_STEP);
    for (let step = 0; step < REFINE_STEPS; step++) {
      const middle = (low + high) / 2;
      if (slack(middle) > 0) {
        low = middle;
      } else {
        high = middle;
      }
    }
  }
  const settleStart = high;
  const settleEnd = settleStart + settleFrames;
  if (frame <= settleStart) {
    return ride(frame);
  }
  if (frame >= settleEnd) {
    return rest + drift * (frame - settleEnd);
  }
  const from = ride(settleStart);
  const distance = rest - from;
  if (distance <= 0) {
    return Math.max(from + drift * (frame - settleStart), rest + drift * (frame - settleEnd));
  }
  const endSlope = Math.min(1, (drift * settleFrames) / distance);
  const startSlope = Math.min(3 - 2 * endSlope, (speed(settleStart) * settleFrames) / distance);
  return from + distance * hermite((frame - settleStart) / settleFrames, startSlope, endSlope);
};

export const ribbonMotion = (
  props: RibbonWordsProps,
  track: Track,
  frame: number,
): RibbonMotion => {
  const { timing } = props;
  const leave = tween(
    frame,
    [timing.retractAt, timing.retractAt + timing.retractFrames],
    [0, 1],
    retract,
  );
  const hold = holdCenter(timing, track, frame);
  const holdAtExit = holdCenter(timing, track, Math.min(frame, timing.retractAt));
  const exitTarget = track.length + track.textWidth / 2 + props.words.size;
  return {
    head: headAt(timing, track, frame),
    tail: frame < timing.retractAt ? 0 : track.entry + (track.length - track.entry) * leave,
    textCenter: hold + leave * Math.max(0, exitTarget - holdAtExit),
  };
};

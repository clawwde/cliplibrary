import * as THREE from 'three';
import type { ProblemStrikeoutProps } from '@/schemas';
import { settle, smooth, track, tween } from '../promo/timing';
import { PAGE, PAGE_CANVAS, pointOnStrike, type StrikePath } from './page-art';

export const NOTEBOOK_TOP = 0.072;

type Timing = ProblemStrikeoutProps['timing'];
type NotebookLook = ProblemStrikeoutProps['notebook'];

const ENTER_FRAMES = 18;
const EXIT_FRAMES = 22;
const FOLLOW_SAMPLES = 6;
const FOLLOW_LAG = 10;

const OFF_PAGE = { x: PAGE_CANVAS.width * 1.45, y: PAGE_CANVAS.height * 1.15 };

export const strikeAt = (timing: Timing, index: number): number =>
  timing.strikeStart + index * (timing.strikeFrames + timing.travelFrames);

export const strikeProgress = (timing: Timing, index: number, frame: number): number =>
  tween(frame, [strikeAt(timing, index), strikeAt(timing, index) + timing.strikeFrames], [0, 1]);

export const pullbackStart = (timing: Timing, count: number): number =>
  strikeAt(timing, Math.max(0, count - 1)) + timing.strikeFrames + 4;

export const notebookMatrix = (notebook: NotebookLook): THREE.Matrix4 =>
  new THREE.Matrix4()
    .makeTranslation(notebook.x, 0, notebook.z)
    .multiply(new THREE.Matrix4().makeRotationY(notebook.turn));

export const canvasToWorld = (
  notebook: NotebookLook,
  point: { x: number; y: number },
  height: number,
): THREE.Vector3 =>
  new THREE.Vector3(
    (point.x / PAGE_CANVAS.width - 0.5) * PAGE.width,
    NOTEBOOK_TOP + height,
    (point.y / PAGE_CANVAS.height - 0.5) * PAGE.depth,
  ).applyMatrix4(notebookMatrix(notebook));

export interface PencilState {
  tip: { x: number; y: number };
  height: number;
  sweep: number;
}

const mixPoint = (a: { x: number; y: number }, b: { x: number; y: number }, t: number) => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const first = (path: StrikePath | undefined) => path?.points[0] ?? OFF_PAGE;
const last = (path: StrikePath | undefined) => path?.points.at(-1) ?? OFF_PAGE;

export const pencilState = (
  paths: StrikePath[],
  timing: Timing,
  lift: number,
  frame: number,
): PencilState => {
  const count = paths.length;
  if (count === 0 || frame < timing.strikeStart) {
    const t = tween(frame, [timing.strikeStart - ENTER_FRAMES, timing.strikeStart], [0, 1], settle);
    return {
      tip: mixPoint(OFF_PAGE, first(paths[0]), t),
      height: lift * 4 * (1 - t) + lift * 0.4 * Math.sin(Math.PI * t),
      sweep: 0,
    };
  }
  for (let index = 0; index < count; index++) {
    const start = strikeAt(timing, index);
    const end = start + timing.strikeFrames;
    const path = paths[index];
    if (frame <= end && path !== undefined) {
      const progress = strikeProgress(timing, index, frame);
      return { tip: pointOnStrike(path, progress), height: 0, sweep: progress - 0.5 };
    }
    const next = paths[index + 1];
    if (next !== undefined && frame < strikeAt(timing, index + 1)) {
      const t = tween(frame, [end, strikeAt(timing, index + 1)], [0, 1], smooth);
      return {
        tip: mixPoint(last(path), first(next), t),
        height: lift * Math.sin(Math.PI * t),
        sweep: 0.5 - t,
      };
    }
  }
  const leave = pullbackStart(timing, count) - 2;
  const t = tween(frame, [leave, leave + EXIT_FRAMES], [0, 1], smooth);
  return {
    tip: mixPoint(last(paths.at(-1)), OFF_PAGE, t),
    height: lift * 5 * t,
    sweep: 0.5 - t * 0.5,
  };
};

export const pencilWorld = (
  paths: StrikePath[],
  props: Pick<ProblemStrikeoutProps, 'timing' | 'notebook' | 'pencil'>,
  frame: number,
): THREE.Vector3 => {
  const state = pencilState(paths, props.timing, props.pencil.lift, frame);
  return canvasToWorld(props.notebook, state.tip, state.height);
};

export interface CameraShot {
  eye: THREE.Vector3;
  target: THREE.Vector3;
  focus: THREE.Vector3;
}

export const cameraShot = (
  paths: StrikePath[],
  props: Pick<ProblemStrikeoutProps, 'timing' | 'notebook' | 'pencil' | 'camera'>,
  frame: number,
): CameraShot => {
  const { timing, camera } = props;
  const pull = pullbackStart(timing, paths.length);
  const center = canvasToWorld(
    props.notebook,
    { x: PAGE_CANVAS.width * 0.5, y: PAGE_CANVAS.height * 0.52 },
    0,
  );
  const followed = new THREE.Vector3();
  for (let sample = 0; sample < FOLLOW_SAMPLES; sample++) {
    const at = Math.max(timing.strikeStart, frame - (sample * FOLLOW_LAG) / FOLLOW_SAMPLES);
    followed.add(pencilWorld(paths, props, Math.min(at, pull)));
  }
  followed.divideScalar(FOLLOW_SAMPLES).setY(NOTEBOOK_TOP);
  const following =
    camera.follow *
    tween(frame, [timing.strikeStart - 10, timing.strikeStart + 8], [0.4, 1]) *
    tween(frame, [pull, pull + timing.pullbackFrames], [1, 0], smooth);
  const lead = new THREE.Vector3(Math.cos(camera.azimuth), 0, -Math.sin(camera.azimuth));
  const target = center.clone().lerp(followed.addScaledVector(lead, camera.lead), following);
  const distance = track(frame, [
    [0, camera.openDistance],
    [timing.strikeStart + 10, camera.closeDistance],
    [pull, camera.closeDistance * 1.04],
    [pull + timing.pullbackFrames, camera.wideDistance],
  ]);
  const azimuth = camera.azimuth + frame * 0.0006;
  const elevation =
    camera.elevation + tween(frame, [pull, pull + timing.pullbackFrames], [0, 0.12]);
  const eye = target
    .clone()
    .add(
      new THREE.Vector3(
        Math.sin(azimuth) * Math.cos(elevation),
        Math.sin(elevation),
        Math.cos(azimuth) * Math.cos(elevation),
      ).multiplyScalar(distance),
    );
  const tip = pencilWorld(paths, props, frame);
  return { eye, target, focus: center.clone().lerp(tip.setY(NOTEBOOK_TOP), following) };
};

import type { UnveilCloth, UnveilTiming } from '@/schemas';
import { BOARD, CLOTH, hookAt, hookVelocity, ramp, TENSION_FRAMES, type Vec3 } from './flight';

const BOARD_TOP = BOARD.centerY + BOARD.height / 2;
const BOARD_BOTTOM = BOARD.centerY - BOARD.height / 2;
const HALF_WIDTH = BOARD.width / 2;
const WAVE_SPEED = 1.5;
const CABLE_STEPS = 8;

export const CABLE_COLUMNS = [0, 1 / 3, 2 / 3, 1] as const;

const length = (vector: Vec3): number => Math.hypot(vector[0], vector[1], vector[2]);

const normalize = (vector: Vec3): Vec3 => {
  const size = length(vector) || 1;
  return [vector[0] / size, vector[1] / size, vector[2] / size];
};

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

const mix = (from: number, to: number, amount: number): number => from + (to - from) * amount;

const tangentAt = (arc: number, frame: number, timing: UnveilTiming): Vec3 => {
  const velocity = hookVelocity(frame - arc / WAVE_SPEED, timing);
  const speed = length(velocity);
  const pull = speed / (speed + 0.16);
  const back = normalize([-velocity[0], -velocity[1], -velocity[2]]);
  return normalize([back[0] * pull, back[1] * pull - (1 - pull), back[2] * pull + 0.06 * pull]);
};

interface Spine {
  centers: Vec3[];
  tangents: Vec3[];
}

const spineAt = (frame: number, timing: UnveilTiming): Spine => {
  let point = hookAt(frame, timing);
  for (let step = 0; step < CABLE_STEPS; step++) {
    const arc = ((step + 0.5) / CABLE_STEPS) * CLOTH.cable;
    const tangent = tangentAt(arc, frame, timing);
    const stride = CLOTH.cable / CABLE_STEPS;
    point = [
      point[0] + tangent[0] * stride,
      point[1] + tangent[1] * stride,
      point[2] + tangent[2] * stride,
    ];
  }
  const centers: Vec3[] = [point];
  const tangents: Vec3[] = [tangentAt(CLOTH.cable, frame, timing)];
  const stride = CLOTH.height / CLOTH.rows;
  for (let row = 1; row <= CLOTH.rows; row++) {
    const arc = CLOTH.cable + (row - 0.5) * stride;
    const tangent = tangentAt(arc, frame, timing);
    point = [
      point[0] + tangent[0] * stride,
      point[1] + tangent[1] * stride,
      point[2] + tangent[2] * stride,
    ];
    centers.push(point);
    tangents.push(tangentAt(arc + stride / 2, frame, timing));
  }
  return { centers, tangents };
};

const drapedAt = (
  u: number,
  v: number,
  frame: number,
  cloth: UnveilCloth,
  timing: UnveilTiming,
): Vec3 => {
  const tension = ramp(frame, timing.liftStart - TENSION_FRAMES, TENSION_FRAMES);
  let x = (u - 0.5) * CLOTH.width;
  let y = BOARD_TOP + 0.25 - v * CLOTH.height + tension * 0.55 * (1 - v) ** 2;
  const wind = 0.75 + 0.25 * Math.sin(frame / 37);
  const amplitude = 0.11 * cloth.ripple * wind * (1 + tension * 0.8);
  const sag = Math.abs(Math.sin(u * Math.PI * 3)) * (1 - v) ** 4 * 0.5 * cloth.ripple;
  let z =
    CLOTH.lift +
    amplitude *
      (Math.sin(x * 1.25 + 0.6 * Math.sin(y * 0.22 + frame * 0.025)) * (1.4 - v * 0.8) +
        Math.sin(x * 0.55 - y * 0.18 + frame * 0.04 + 1.3) * 0.6) +
    0.32 * cloth.ripple * wind * Math.sin((x + y) * 0.42 + frame * 0.03) * (0.4 + v * 0.6) +
    sag;
  const overflow = Math.max(0, Math.abs(x) - HALF_WIDTH);
  if (overflow > 0) {
    x = Math.sign(x) * (HALF_WIDTH + 0.12 + overflow * 0.25);
    z = Math.min(z, CLOTH.lift) - overflow * 2.6;
  }
  const below = Math.max(0, BOARD_BOTTOM - y);
  z += below * 0.35 + Math.sin(u * 19 + frame * 0.05) * below * 0.25 * cloth.ripple;
  y += below * 0.12;
  return [x, y, z];
};

const releaseAt = (u: number, v: number, frame: number, timing: UnveilTiming): number =>
  ramp(frame, timing.liftStart - 2 + u * 9 + v * 12, 30);

export const fillCloth = (
  positions: Float32Array,
  frame: number,
  cloth: UnveilCloth,
  timing: UnveilTiming,
): void => {
  const flying = frame > timing.liftStart - 4;
  const spine = flying ? spineAt(frame, timing) : undefined;
  const columns = CLOTH.columns;
  for (let row = 0; row <= CLOTH.rows; row++) {
    const v = row / CLOTH.rows;
    const center = spine?.centers[row];
    const tangent = spine?.tangents[row];
    let side: Vec3 = [1, 0, 0];
    let normal: Vec3 = [0, 0, 1];
    if (tangent !== undefined) {
      const along = dot(side, tangent);
      side = normalize([
        side[0] - along * tangent[0],
        side[1] - along * tangent[1],
        side[2] - along * tangent[2],
      ]);
      normal = cross(side, tangent);
    }
    for (let column = 0; column <= columns; column++) {
      const u = column / columns;
      const draped = drapedAt(u, v, frame, cloth, timing);
      const index = (row * (columns + 1) + column) * 3;
      const release = center === undefined ? 0 : releaseAt(u, v, frame, timing);
      if (center === undefined || release <= 0) {
        positions[index] = draped[0];
        positions[index + 1] = draped[1];
        positions[index + 2] = draped[2];
        continue;
      }
      const spread = mix(1, 0.4 + 0.5 * v, release) * CLOTH.width;
      const twist = release * 0.55 * cloth.flutter * Math.sin(v * 4.2 - frame * 0.17);
      const across = (u - 0.5) * spread;
      const fold =
        release *
        cloth.flutter *
        (0.9 * Math.sin(u * Math.PI * 3.2 + v * 5 - frame * 0.24) * (0.35 + 0.65 * v) +
          1.8 * Math.sin(v * 7.5 - frame * 0.32 + u * 1.7) * v);
      const offsetSide = across * Math.cos(twist);
      const offsetNormal = across * Math.sin(twist) + fold;
      const flown: Vec3 = [
        center[0] + side[0] * offsetSide + normal[0] * offsetNormal,
        center[1] + side[1] * offsetSide + normal[1] * offsetNormal,
        center[2] + side[2] * offsetSide + normal[2] * offsetNormal,
      ];
      positions[index] = mix(draped[0], flown[0], release);
      positions[index + 1] = mix(draped[1], flown[1], release);
      positions[index + 2] = Math.max(0.12, mix(draped[2], flown[2], release));
    }
  }
};

export const clothPoint = (positions: Float32Array, u: number, v: number): Vec3 => {
  const column = Math.round(u * CLOTH.columns);
  const row = Math.round(v * CLOTH.rows);
  const index = (row * (CLOTH.columns + 1) + column) * 3;
  return [positions[index] ?? 0, positions[index + 1] ?? 0, positions[index + 2] ?? 0];
};

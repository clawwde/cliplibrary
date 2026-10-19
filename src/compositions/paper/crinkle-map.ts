import * as THREE from 'three';
import { seeded } from '../unveil/random';

const MAP_WIDTH = 1536;
const CRINKLES = 2400;
const SLOPE = 0.3;

const maps = new Map<string, THREE.DataTexture>();

const bakeHeights = (width: number, height: number, rows: number, seed: number): Float32Array => {
  const heights = new Float32Array(MAP_WIDTH * rows);
  const pixel = width / MAP_WIDTH;
  const random = seeded(seed * 104_729 + 17);
  for (let index = 0; index < CRINKLES; index++) {
    const x = (random() - 0.5) * width;
    const y = (random() - 0.5) * height;
    const angle = random() * Math.PI;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const half = 0.025 + random() * 0.09;
    const reach = 0.012 + random() * 0.03;
    const depth = (random() < 0.5 ? -1 : 1) * (0.35 + random() * 0.65);
    const extentX = Math.abs(dx) * half + reach;
    const extentY = Math.abs(dy) * half + reach;
    const left = Math.max(0, Math.floor((x - extentX + width / 2) / pixel));
    const right = Math.min(MAP_WIDTH - 1, Math.ceil((x + extentX + width / 2) / pixel));
    const top = Math.max(0, Math.floor((height / 2 - (y + extentY)) / pixel));
    const bottom = Math.min(rows - 1, Math.ceil((height / 2 - (y - extentY)) / pixel));
    for (let row = top; row <= bottom; row++) {
      const py = height / 2 - (row + 0.5) * pixel - y;
      for (let column = left; column <= right; column++) {
        const px = (column + 0.5) * pixel - width / 2 - x;
        const across = Math.abs(px * dy - py * dx);
        if (across >= reach) {
          continue;
        }
        const along = Math.abs(px * dx + py * dy) / half;
        if (along >= 1) {
          continue;
        }
        const fade = 1 - along * along;
        heights[row * MAP_WIDTH + column] =
          (heights[row * MAP_WIDTH + column] ?? 0) + depth * (reach - across) * fade;
      }
    }
  }
  return heights;
};

export const crinkleMap = (width: number, height: number, seed: number): THREE.DataTexture => {
  const key = `${width}:${height}:${seed}`;
  const hit = maps.get(key);
  if (hit !== undefined) {
    return hit;
  }
  const rows = Math.round((MAP_WIDTH * height) / width);
  const heights = bakeHeights(width, height, rows, seed);
  const pixel = width / MAP_WIDTH;
  const data = new Uint8Array(MAP_WIDTH * rows * 4);
  const at = (column: number, row: number) =>
    heights[
      Math.min(rows - 1, Math.max(0, row)) * MAP_WIDTH +
        Math.min(MAP_WIDTH - 1, Math.max(0, column))
    ] ?? 0;
  const normal = new THREE.Vector3();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < MAP_WIDTH; column++) {
      const slopeX = (at(column + 1, row) - at(column - 1, row)) / (2 * pixel);
      const slopeY = (at(column, row - 1) - at(column, row + 1)) / (2 * pixel);
      normal.set(-slopeX * SLOPE, -slopeY * SLOPE, 1).normalize();
      const offset = ((rows - 1 - row) * MAP_WIDTH + column) * 4;
      data[offset] = Math.round((normal.x * 0.5 + 0.5) * 255);
      data[offset + 1] = Math.round((normal.y * 0.5 + 0.5) * 255);
      data[offset + 2] = Math.round((normal.z * 0.5 + 0.5) * 255);
      data[offset + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, MAP_WIDTH, rows, THREE.RGBAFormat);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  maps.set(key, texture);
  return texture;
};

import * as THREE from 'three';
import { memo, roundedShape, roundedSlab } from './phone-geometry';

export interface ReliefRingSpec {
  outer: number;
  band: number;
  depth: number;
}

export interface ReliefLayout {
  count: number;
  core: number;
  band: number;
  gap: number;
  growth: number;
  depth: number;
  depthStep: number;
}

export const reliefRings = (layout: ReliefLayout): ReliefRingSpec[] => {
  const rings: ReliefRingSpec[] = [];
  let inner = layout.core;
  for (let index = 0; index < layout.count; index++) {
    const band = layout.band * layout.growth ** index;
    const outer = inner + band * 2;
    rings.push({
      outer,
      band,
      depth: layout.depth + (layout.count - 1 - index) * layout.depthStep,
    });
    inner = outer + layout.gap * 2 * layout.growth ** index;
  }
  return rings;
};

const RELIEF_CORNER = 0.24;

export const reliefRingGeometry = (ring: ReliefRingSpec, bevel: number) =>
  memo(`relief:${ring.outer}:${ring.band}:${ring.depth}:${bevel}`, () => {
    const outer = ring.outer - bevel * 2;
    const inner = ring.outer - ring.band * 2 + bevel * 2;
    const shape = roundedShape(outer, outer, outer * RELIEF_CORNER);
    shape.holes.push(roundedShape(inner, inner, inner * RELIEF_CORNER));
    const core = Math.max(0.0001, ring.depth - bevel * 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: core,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 6,
      curveSegments: 40,
    });
    geometry.translate(0, 0, bevel);
    geometry.computeVertexNormals();
    return geometry;
  });

export const pedestalGeometry = (size: number, bevel: number) =>
  roundedSlab(size, size, bevel * 1.5, size, bevel);

export const iconTileGeometry = (size: number, depth: number) =>
  roundedSlab(size, size, size * 0.23, depth, depth * 0.3);

export interface RibbonSpec {
  length: number;
  width: number;
  thickness: number;
  amplitude: number;
  waves: number;
  phase: number;
}

export const ribbonHeight = (spec: RibbonSpec, x: number): number =>
  spec.thickness +
  spec.amplitude *
    (0.5 + 0.5 * Math.sin((x / spec.length) * Math.PI * 2 * spec.waves + spec.phase));

const RIBBON_SEGMENTS = 160;

export const ribbonGeometry = (spec: RibbonSpec) =>
  memo(
    `ribbon:${spec.length}:${spec.width}:${spec.thickness}:${spec.amplitude}:${spec.waves}:${spec.phase}`,
    () => {
      const shape = new THREE.Shape();
      const start = -spec.length / 2;
      shape.moveTo(start, 0);
      for (let step = 0; step <= RIBBON_SEGMENTS; step++) {
        const x = start + (spec.length * step) / RIBBON_SEGMENTS;
        shape.lineTo(x, ribbonHeight(spec, x));
      }
      shape.lineTo(-start, 0);
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: spec.width,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 4,
        curveSegments: 1,
      });
      geometry.translate(0, 0, -spec.width / 2);
      geometry.rotateX(Math.PI / 2);
      geometry.computeVertexNormals();
      return geometry;
    },
  );

import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { seeded } from '../unveil/random';

interface Fold {
  normal: THREE.Vector3;
  offset: number;
  depth: number;
}

const ballGeometries = new Map<string, THREE.BufferGeometry>();

const foldsFor = (random: () => number, count: number): Fold[] =>
  Array.from({ length: count }, () => ({
    normal: new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize(),
    offset: (random() - 0.5) * 1.4,
    depth: (0.03 + random() * 0.07) * (random() < 0.5 ? -1 : 1),
  }));

const buildBall = (seed: number, crumple: number, facets: number): THREE.BufferGeometry => {
  const random = seeded(seed * 4093 + 17);
  const raw = new THREE.IcosahedronGeometry(1, facets + 1);
  raw.deleteAttribute('normal');
  raw.deleteAttribute('uv');
  const base = mergeVertices(raw);
  const folds = foldsFor(random, 60);
  const squash = new THREE.Vector3(
    0.92 + random() * 0.16,
    0.86 + random() * 0.12,
    0.92 + random() * 0.16,
  );
  const position = base.getAttribute('position');
  const point = new THREE.Vector3();
  for (let index = 0; index < position.count; index++) {
    point.fromBufferAttribute(position, index);
    let radius = 1;
    for (const fold of folds) {
      const distance = point.dot(fold.normal) - fold.offset;
      radius += fold.depth * Math.exp(-Math.abs(distance) * 16) * crumple;
    }
    radius += (random() - 0.5) * 0.035 * crumple;
    point.multiplyScalar(radius).multiply(squash);
    position.setXYZ(index, point.x, point.y, point.z);
  }
  const faceted = base.toNonIndexed();
  faceted.computeVertexNormals();
  faceted.computeBoundingSphere();
  return faceted;
};

const ballGeometry = (seed: number, crumple: number, facets: number): THREE.BufferGeometry => {
  const key = `${seed}:${crumple}:${facets}`;
  const hit = ballGeometries.get(key);
  if (hit !== undefined) {
    return hit;
  }
  const geometry = buildBall(seed, crumple, facets);
  ballGeometries.set(key, geometry);
  return geometry;
};

export interface PaperBallProps {
  x: number;
  z: number;
  radius: number;
  seed: number;
  spin: number;
  color: string;
  crumple: number;
  facets: number;
  roughness: number;
}

export const PaperBall = ({
  x,
  z,
  radius,
  seed,
  spin,
  color,
  crumple,
  facets,
  roughness,
}: PaperBallProps) => {
  const geometry = ballGeometry(seed, crumple, facets);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: 0,
        flatShading: true,
      }),
    [color, roughness],
  );
  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[x, radius * 0.9, z]}
      rotation={[spin * 0.7, spin, spin * 0.4]}
      scale={radius}
      castShadow
      receiveShadow
    />
  );
};

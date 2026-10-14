import * as THREE from 'three';

export const PHONE = {
  width: 1.465,
  height: 3,
  depth: 0.168,
  radius: 0.215,
  edge: 0.024,
  screenWidth: 1.345,
  screenHeight: 1.345 * (1950 / 900),
  screenRadius: 0.165,
  plateauSize: 0.64,
  plateauRadius: 0.17,
} as const;

const roundedShape = (width: number, height: number, radius: number): THREE.Shape => {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
  shape.lineTo(x + width, y + height - radius);
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
  shape.lineTo(x + radius, y + height);
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + radius);
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false);
  return shape;
};

const normalizeUv = (geometry: THREE.BufferGeometry, width: number, height: number) => {
  const position = geometry.getAttribute('position');
  const uv = geometry.getAttribute('uv');
  for (let index = 0; index < position.count; index++) {
    uv.setXY(
      index,
      (position.getX(index) + width / 2) / width,
      (position.getY(index) + height / 2) / height,
    );
  }
  uv.needsUpdate = true;
  return geometry;
};

const cache = new Map<string, THREE.BufferGeometry>();

const memo = (key: string, build: () => THREE.BufferGeometry): THREE.BufferGeometry => {
  const hit = cache.get(key);
  if (hit !== undefined) {
    return hit;
  }
  const geometry = build();
  cache.set(key, geometry);
  return geometry;
};

export const roundedPlane = (width: number, height: number, radius: number) =>
  memo(`plane:${width}:${height}:${radius}`, () =>
    normalizeUv(new THREE.ShapeGeometry(roundedShape(width, height, radius), 32), width, height),
  );

const roundedSlab = (width: number, height: number, radius: number, depth: number, bevel: number) =>
  memo(`slab:${width}:${height}:${radius}:${depth}:${bevel}`, () => {
    const geometry = new THREE.ExtrudeGeometry(
      roundedShape(width - bevel * 2, height - bevel * 2, Math.max(0.001, radius - bevel)),
      {
        depth: Math.max(0.0001, depth - bevel * 2),
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 8,
        curveSegments: 48,
      },
    );
    geometry.translate(0, 0, -(depth - bevel * 2) / 2);
    geometry.computeVertexNormals();
    return geometry;
  });

export const bodyGeometry = () =>
  roundedSlab(PHONE.width, PHONE.height, PHONE.radius, PHONE.depth, PHONE.edge);

export const frontGlassGeometry = () =>
  roundedPlane(PHONE.width - 0.03, PHONE.height - 0.03, PHONE.radius - 0.015);

export const screenGeometry = () =>
  roundedPlane(PHONE.screenWidth, PHONE.screenHeight, PHONE.screenRadius);

export const plateauGeometry = () =>
  roundedSlab(PHONE.plateauSize, PHONE.plateauSize, PHONE.plateauRadius, 0.04, 0.012);

export const capsuleGeometry = (width: number, height: number) =>
  roundedPlane(width, height, Math.min(width, height) / 2 - 0.0001);

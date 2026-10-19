import { useMemo } from 'react';
import * as THREE from 'three';
import type { UnveilCloth, UnveilTiming } from '@/schemas';
import { CABLE_COLUMNS, clothPoint, fillCloth } from './cloth-shape';
import { CLOTH, hookAt, type Vec3 } from './flight';

const UP = new THREE.Vector3(0, 1, 0);

export const Rod = ({
  from,
  to,
  radius,
  color,
}: {
  from: Vec3;
  to: Vec3;
  radius: number;
  color: string;
}) => {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const direction = end.clone().sub(start);
  const span = direction.length();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(UP, direction.normalize());
  const middle = start.add(end).multiplyScalar(0.5);
  return (
    <mesh position={middle} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, span, 6, 1]} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
    </mesh>
  );
};

const useClothGeometry = (): THREE.PlaneGeometry =>
  useMemo(() => new THREE.PlaneGeometry(1, 1, CLOTH.columns, CLOTH.rows), []);

export const Cloth = ({
  frame,
  cloth,
  timing,
  cableColor,
}: {
  frame: number;
  cloth: UnveilCloth;
  timing: UnveilTiming;
  cableColor: string;
}) => {
  const geometry = useClothGeometry();
  const sheenColor = useMemo(
    () => new THREE.Color(cloth.color).lerp(new THREE.Color('#ffffff'), 0.35),
    [cloth.color],
  );
  const attribute = geometry.getAttribute('position') as THREE.BufferAttribute;
  const positions = attribute.array as Float32Array;
  fillCloth(positions, frame, cloth, timing);
  attribute.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const hook = hookAt(frame, timing);
  return (
    <group>
      <mesh geometry={geometry} castShadow frustumCulled={false}>
        <meshPhysicalMaterial
          color={cloth.color}
          roughness={0.78}
          sheen={cloth.sheen}
          sheenRoughness={0.45}
          sheenColor={sheenColor}
          side={THREE.DoubleSide}
        />
      </mesh>
      {CABLE_COLUMNS.map((u) => (
        <Rod
          key={u}
          from={hook}
          to={clothPoint(positions, u, 0)}
          radius={0.045}
          color={cableColor}
        />
      ))}
    </group>
  );
};

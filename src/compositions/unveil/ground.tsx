import { useMemo } from 'react';
import * as THREE from 'three';
import type { UnveilGround } from '@/schemas';

const ROAD_X = 15;

const VERTEX = `
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT = `
uniform vec3 uRoad;
uniform vec3 uVerge;
uniform vec3 uHaze;
uniform float uRoadX;
uniform float uShowRoad;
varying vec3 vWorld;

float hash(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float band(float value, float center, float halfWidth, float blur) {
  return 1.0 - smoothstep(halfWidth, halfWidth + blur, abs(value - center));
}

void main() {
  float distanceToCamera = length(vWorld - cameraPosition);
  float blur = 0.04 + distanceToCamera * 0.0016;
  float mottle = noise(vWorld.xz * 0.05) * 0.6 + noise(vWorld.xz * 0.21) * 0.4;
  vec3 color = uVerge * (0.78 + mottle * 0.4);
  float across = vWorld.x - uRoadX;
  float onRoad = band(across, 0.0, 11.5, blur) * uShowRoad;
  vec3 asphalt = uRoad * (0.92 + noise(vWorld.xz * 0.4) * 0.12);
  color = mix(color, asphalt, onRoad);
  float dashes = step(fract(vWorld.z / 14.0), 0.42);
  float lanes = 0.0;
  lanes += band(abs(across), 3.8, 0.09, blur) * dashes;
  lanes += band(abs(across), 7.6, 0.09, blur) * dashes;
  lanes += band(abs(across), 10.9, 0.11, blur);
  lanes = clamp(lanes, 0.0, 1.0) * uShowRoad;
  color = mix(color, vec3(0.86, 0.86, 0.82), lanes * 0.85);
  float median = band(across, 0.0, 0.35, blur) * uShowRoad;
  color = mix(color, vec3(0.72, 0.72, 0.7), median);
  float haze = 1.0 - exp(-distanceToCamera * 0.0042);
  color = mix(color, uHaze, clamp(haze, 0.0, 1.0));
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

const seeded = (seed: number) => {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

interface Placement {
  position: [number, number, number];
  scale: [number, number, number];
}

const TREE_COUNT = 520;
const BUILDING_COUNT = 90;

const treePlacements = (): Placement[] => {
  const random = seeded(7);
  return Array.from({ length: TREE_COUNT }, () => {
    const side = random() < 0.5 ? -1 : 1;
    const offset = 14 + random() * 70;
    const z = -12 - random() * 520;
    const size = 1.8 + random() * 2.4;
    return {
      position: [ROAD_X + side * offset, size * 0.7, z],
      scale: [size * (1 + random() * 0.6), size * (0.8 + random() * 0.5), size],
    };
  });
};

const buildingPlacements = (): Placement[] => {
  const random = seeded(19);
  return Array.from({ length: BUILDING_COUNT }, () => {
    const height = 6 + random() ** 2 * 48;
    const width = 6 + random() * 14;
    return {
      position: [ROAD_X - 330 + random() * 660, height / 2, -470 - random() * 160],
      scale: [width, height, 6 + random() * 10],
    };
  });
};

const fillInstances = (mesh: THREE.InstancedMesh | null, placements: Placement[]): void => {
  if (mesh === null) {
    return;
  }
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  placements.forEach((placement, index) => {
    matrix.compose(
      new THREE.Vector3(...placement.position),
      quaternion,
      new THREE.Vector3(...placement.scale),
    );
    mesh.setMatrixAt(index, matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
};

export const Ground = ({ ground, haze }: { ground: UnveilGround; haze: string }) => {
  const { material, uniforms } = useMemo(() => {
    const values = {
      uRoad: { value: new THREE.Color() },
      uVerge: { value: new THREE.Color() },
      uHaze: { value: new THREE.Color() },
      uRoadX: { value: ROAD_X },
      uShowRoad: { value: 1 },
    };
    return {
      uniforms: values,
      material: new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: values,
      }),
    };
  }, []);
  uniforms.uRoad.value.set(ground.road);
  uniforms.uVerge.value.set(ground.verge);
  uniforms.uHaze.value.set(haze);
  uniforms.uShowRoad.value = ground.showRoad ? 1 : 0;
  const trees = useMemo(treePlacements, []);
  const buildings = useMemo(buildingPlacements, []);
  return (
    <group>
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2400, 2400, 1, 1]} />
      </mesh>
      <instancedMesh
        args={[undefined, undefined, TREE_COUNT]}
        ref={(mesh) => fillInstances(mesh, trees)}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color={ground.trees} roughness={0.95} />
      </instancedMesh>
      <instancedMesh
        args={[undefined, undefined, BUILDING_COUNT]}
        ref={(mesh) => fillInstances(mesh, buildings)}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={ground.skyline} roughness={0.9} />
      </instancedMesh>
    </group>
  );
};

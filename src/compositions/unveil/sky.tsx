import { useMemo } from 'react';
import * as THREE from 'three';
import type { UnveilSky } from '@/schemas';

const VERTEX = `
varying vec3 vDirection;
void main() {
  vDirection = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = `
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uHaze;
uniform float uCover;
uniform float uTime;
varying vec3 vDirection;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    total += noise(p) * amplitude;
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return total;
}

void main() {
  vec3 direction = normalize(vDirection);
  float height = max(direction.y, 0.0);
  vec3 color = mix(uHorizon, uZenith, pow(height, 0.5));
  if (direction.y > 0.0) {
    vec2 layer = direction.xz / (direction.y + 0.06) * 0.95 + vec2(uTime * 0.0022, uTime * 0.0006);
    vec2 warp = vec2(fbm(layer * 0.9), fbm(layer * 0.9 + 5.2));
    float shape = fbm(layer * 2.4 + warp * 1.4);
    float threshold = 0.78 - uCover * 0.42;
    float density = smoothstep(threshold, threshold + 0.09, shape);
    float lit = fbm(layer * 2.4 + warp * 1.4 + vec2(0.05, 0.08));
    float shade = clamp(0.62 + (shape - lit) * 5.0 + density * 0.3, 0.0, 1.0);
    vec3 cloud = mix(vec3(0.72, 0.77, 0.85), vec3(1.0), shade);
    density *= smoothstep(0.0, 0.16, direction.y);
    color = mix(color, cloud, density * 0.95);
  }
  color = mix(uHaze, color, smoothstep(-0.02, 0.09, direction.y));
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

export const Sky = ({ sky, frame }: { sky: UnveilSky; frame: number }) => {
  const { material, uniforms } = useMemo(() => {
    const values = {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uHaze: { value: new THREE.Color() },
      uCover: { value: 0 },
      uTime: { value: 0 },
    };
    return {
      uniforms: values,
      material: new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: values,
      }),
    };
  }, []);
  uniforms.uZenith.value.set(sky.zenith);
  uniforms.uHorizon.value.set(sky.horizon);
  uniforms.uHaze.value.set(sky.haze);
  uniforms.uCover.value = sky.clouds;
  uniforms.uTime.value = frame * sky.cloudDrift;
  return (
    <mesh material={material} renderOrder={-1} frustumCulled={false}>
      <sphereGeometry args={[900, 64, 32]} />
    </mesh>
  );
};

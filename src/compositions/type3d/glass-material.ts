import { useMemo } from 'react';
import * as THREE from 'three';

const VERTEX = `
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-viewPosition.xyz);
  gl_Position = projectionMatrix * viewPosition;
}
`;

const FRAGMENT = `
uniform vec3 body;
uniform vec3 rim;
uniform float rimStrength;
uniform float highlight;
uniform float opacity;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec3 normal = normalize(vNormal);
  float facing = max(dot(normal, vView), 0.0);
  float edge = pow(1.0 - facing, 2.6) * rimStrength;
  float shade = 0.72 + 0.38 * max(dot(normal, normalize(vec3(-0.35, 0.65, 0.68))), 0.0);
  vec3 light = normalize(vec3(-0.45, 0.6, 0.65));
  float gloss = pow(max(dot(reflect(-light, normal), vView), 0.0), 18.0) * highlight;
  vec3 color = body * shade + rim * edge + vec3(gloss);
  gl_FragColor = vec4(color * opacity, opacity);
}
`;

const toSrgbVector = (hex: string): THREE.Vector3 => {
  const value = Number.parseInt(hex.slice(1, 7), 16);
  return new THREE.Vector3(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  );
};

export interface GlassLook {
  body: string;
  rim: string;
  rimStrength: number;
  highlight: number;
}

export const useGlassMaterial = (look: GlassLook, opacity: number): THREE.ShaderMaterial => {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          body: { value: new THREE.Vector3() },
          rim: { value: new THREE.Vector3() },
          rimStrength: { value: 0 },
          highlight: { value: 0 },
          opacity: { value: 1 },
        },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: true,
        blending: THREE.CustomBlending,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendSrcAlpha: THREE.OneFactor,
        blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
      }),
    [],
  );
  const uniforms = material.uniforms as Record<
    'body' | 'rim' | 'rimStrength' | 'highlight' | 'opacity',
    { value: THREE.Vector3 | number }
  >;
  uniforms.body.value = toSrgbVector(look.body);
  uniforms.rim.value = toSrgbVector(look.rim);
  uniforms.rimStrength.value = look.rimStrength;
  uniforms.highlight.value = look.highlight;
  uniforms.opacity.value = opacity;
  return material;
};

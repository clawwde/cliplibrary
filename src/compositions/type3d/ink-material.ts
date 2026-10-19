import { useMemo } from 'react';
import * as THREE from 'three';

const VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = `
uniform sampler2D map;
uniform float opacity;
uniform float dim;
varying vec2 vUv;
void main() {
  vec4 texel = texture2D(map, vUv);
  gl_FragColor = vec4(texel.rgb * dim, texel.a) * opacity;
}
`;

const createInkMaterial = (
  map: THREE.Texture,
  side: THREE.Side = THREE.FrontSide,
): THREE.ShaderMaterial =>
  new THREE.ShaderMaterial({
    uniforms: { map: { value: map }, opacity: { value: 1 }, dim: { value: 1 } },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    side,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
  });

export const useInkMaterial = (
  map: THREE.Texture,
  opacity: number,
  side: THREE.Side = THREE.FrontSide,
  dim = 1,
): THREE.ShaderMaterial => {
  const material = useMemo(() => createInkMaterial(map, side), [map, side]);
  const uniforms = material.uniforms as { opacity: { value: number }; dim: { value: number } };
  uniforms.opacity.value = opacity;
  uniforms.dim.value = dim;
  return material;
};

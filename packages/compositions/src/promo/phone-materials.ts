import type { PhoneFinish } from '@cliplibrary/schemas';
import * as THREE from 'three';

interface FinishPalette {
  frame: string;
  back: string;
  plateau: string;
  ring: string;
}

const FINISHES: Record<PhoneFinish, FinishPalette> = {
  natural: { frame: '#b8b3aa', back: '#c8c4bb', plateau: '#bdb8af', ring: '#a9a49b' },
  black: { frame: '#3a3a3d', back: '#28282b', plateau: '#2f2f33', ring: '#4a4a4e' },
  white: { frame: '#d8d8d4', back: '#ececea', plateau: '#e2e2df', ring: '#c9c9c5' },
  blue: { frame: '#3f4b5e', back: '#46526a', plateau: '#3e4960', ring: '#56637a' },
  desert: { frame: '#bea893', back: '#d2bca6', plateau: '#c7b19c', ring: '#ad9884' },
};

export interface PhoneMaterials {
  frame: THREE.MeshPhysicalMaterial;
  back: THREE.MeshPhysicalMaterial;
  plateau: THREE.MeshPhysicalMaterial;
  ring: THREE.MeshPhysicalMaterial;
  frontGlass: THREE.MeshPhysicalMaterial;
  glare: THREE.MeshStandardMaterial;
  lensGlass: THREE.MeshPhysicalMaterial;
  blackGloss: THREE.MeshPhysicalMaterial;
  antenna: THREE.MeshStandardMaterial;
  hole: THREE.MeshBasicMaterial;
  flash: THREE.MeshStandardMaterial;
}

const cache = new Map<string, PhoneMaterials>();

const build = (finish: PhoneFinish, reflections: number): PhoneMaterials => {
  const palette = FINISHES[finish];
  return {
    frame: new THREE.MeshPhysicalMaterial({
      color: palette.frame,
      metalness: 1,
      roughness: 0.3,
      anisotropy: 0.7,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.25 * reflections,
    }),
    back: new THREE.MeshPhysicalMaterial({
      color: palette.back,
      metalness: 0.05,
      roughness: 0.58,
      clearcoat: 0.35,
      clearcoatRoughness: 0.6,
      envMapIntensity: 0.8 * reflections,
    }),
    plateau: new THREE.MeshPhysicalMaterial({
      color: palette.plateau,
      metalness: 0.1,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.1 * reflections,
    }),
    ring: new THREE.MeshPhysicalMaterial({
      color: palette.ring,
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: 1.3 * reflections,
    }),
    frontGlass: new THREE.MeshPhysicalMaterial({
      color: '#030304',
      metalness: 0.1,
      roughness: 0.04,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.2 * reflections,
    }),
    glare: new THREE.MeshStandardMaterial({
      color: '#000000',
      metalness: 1,
      roughness: 0.04,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      envMapIntensity: 0.22 * reflections,
    }),
    lensGlass: new THREE.MeshPhysicalMaterial({
      color: '#07080e',
      metalness: 0.4,
      roughness: 0.02,
      clearcoat: 1,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [180, 420],
      envMapIntensity: 1.6 * reflections,
    }),
    blackGloss: new THREE.MeshPhysicalMaterial({
      color: '#0b0b0d',
      metalness: 0.2,
      roughness: 0.12,
      clearcoat: 1,
      envMapIntensity: reflections,
    }),
    antenna: new THREE.MeshStandardMaterial({
      color: palette.frame,
      metalness: 0.1,
      roughness: 0.7,
    }),
    hole: new THREE.MeshBasicMaterial({ color: '#050505' }),
    flash: new THREE.MeshStandardMaterial({
      color: '#f3ead2',
      emissive: '#3a3324',
      roughness: 0.3,
    }),
  };
};

export const phoneMaterials = (finish: PhoneFinish, reflections: number): PhoneMaterials => {
  const key = `${finish}:${reflections.toFixed(2)}`;
  const hit = cache.get(key);
  if (hit !== undefined) {
    return hit;
  }
  const materials = build(finish, reflections);
  cache.set(key, materials);
  return materials;
};

import { useMemo } from 'react';
import * as THREE from 'three';
import { useInkMaterial } from './ink-material';
import { useWordTexture, type WordArt } from './word-art';

const SEGMENTS = 48;

const bentPlane = (width: number, height: number, bend: number): THREE.PlaneGeometry => {
  const geometry = new THREE.PlaneGeometry(width, height, SEGMENTS, 1);
  if (Math.abs(bend) < 1e-4) {
    return geometry;
  }
  const radius = width / bend;
  const positions = geometry.getAttribute('position');
  if (positions !== undefined) {
    for (let index = 0; index < positions.count; index++) {
      const x = positions.getX(index);
      positions.setX(index, radius * Math.sin(x / radius));
      positions.setZ(index, radius * (Math.cos(x / radius) - 1));
    }
    positions.needsUpdate = true;
  }
  return geometry;
};

export interface WordPlaneProps {
  art: WordArt;
  height: number;
  opacity?: number;
  bend?: number;
  renderOrder?: number;
  side?: THREE.Side;
}

export const WordPlane = ({
  art,
  height,
  opacity = 1,
  bend = 0,
  renderOrder = 0,
  side = THREE.FrontSide,
}: WordPlaneProps) => {
  const { texture, aspect, frameX, frameY } = useWordTexture(art);
  const material = useInkMaterial(texture, opacity, side);
  const roundedBend = Math.round(bend * 1000) / 1000;
  const geometry = useMemo(
    () => bentPlane(aspect * frameX, frameY, roundedBend * frameX),
    [aspect, frameX, frameY, roundedBend],
  );
  if (opacity <= 0.001 || height <= 0) {
    return null;
  }
  return <mesh geometry={geometry} material={material} renderOrder={renderOrder} scale={height} />;
};

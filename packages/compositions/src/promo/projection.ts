import type { PromoStage } from '@cliplibrary/schemas';
import * as THREE from 'three';
import { type CameraFraming, stageCamera, type Vec3 } from './stage';

export interface ScreenPoint {
  x: number;
  y: number;
  pixelsPerUnit: number;
}

const camera = new THREE.PerspectiveCamera();
const point = new THREE.Vector3();

export const projectToScreen = (
  world: Vec3,
  stage: PromoStage,
  frame: number,
  size: { width: number; height: number },
  framing: CameraFraming = {},
): ScreenPoint => {
  const { position, aim } = stageCamera(stage, frame, framing);
  camera.fov = stage.fieldOfView;
  camera.aspect = size.width / size.height;
  camera.near = 1;
  camera.far = 120;
  camera.position.set(...position);
  camera.lookAt(...aim);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  point.set(...world).project(camera);
  const distance = camera.position.distanceTo(new THREE.Vector3(...world));
  const pixelsPerUnit =
    size.height / (2 * distance * Math.tan(THREE.MathUtils.degToRad(stage.fieldOfView) / 2));
  return {
    x: ((point.x + 1) / 2) * size.width,
    y: ((1 - point.y) / 2) * size.height,
    pixelsPerUnit,
  };
};

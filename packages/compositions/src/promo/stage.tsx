import type { PromoCardId, PromoStage } from '@cliplibrary/schemas';
import { Environment, Lightformer } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { useVideoConfig } from 'remotion';
import type * as THREE from 'three';
import { DoubleSide } from 'three';
import { cardUrl } from './screen-assets';
import { useTexture } from './use-texture';

type Vec3 = [number, number, number];

const CameraRig = ({ position, target, fov }: { position: Vec3; target: Vec3; fov: number }) => {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  camera.position.set(...position);
  camera.fov = fov;
  camera.near = 0.1;
  camera.far = 200;
  camera.updateProjectionMatrix();
  camera.lookAt(...target);
  return null;
};

const Studio = ({ reflections, dark }: { reflections: number; dark: boolean }) => (
  <Environment resolution={512} frames={1}>
    <Lightformer
      form="rect"
      intensity={3.2 * reflections}
      position={[0, 7, 3]}
      rotation={[Math.PI / 2.2, 0, 0]}
      scale={[16, 3, 1]}
    />
    <Lightformer
      form="rect"
      intensity={2.6 * reflections}
      position={[-7, 0.5, 2]}
      rotation={[0, Math.PI / 2.3, 0]}
      scale={[1.2, 12, 1]}
    />
    <Lightformer
      form="rect"
      intensity={2.2 * reflections}
      position={[7, 0.5, 2]}
      rotation={[0, -Math.PI / 2.3, 0]}
      scale={[1.2, 12, 1]}
    />
    <Lightformer
      form="rect"
      intensity={1.4 * reflections}
      position={[0, 0, -9]}
      rotation={[0, Math.PI, 0]}
      scale={[12, 8, 1]}
    />
    <Lightformer
      form="rect"
      intensity={(dark ? 0.2 : 0.7) * reflections}
      position={[0, -7, 2]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[16, 4, 1]}
    />
    <Lightformer form="circle" intensity={1.6 * reflections} position={[3, 3, 9]} scale={2.4} />
  </Environment>
);

export interface StageProps {
  stage: PromoStage;
  dark?: boolean;
  target?: Vec3;
  cameraOffset?: Vec3;
  distanceScale?: number;
  backdropZ?: number;
  children: ReactNode;
}

export const Stage = ({
  stage,
  dark = false,
  target = [0, 0, 0],
  cameraOffset = [0, 0, 0],
  distanceScale = 1,
  backdropZ = -1.8,
  children,
}: StageProps) => {
  const { width, height } = useVideoConfig();
  const position: Vec3 = [
    cameraOffset[0],
    cameraOffset[1],
    stage.cameraDistance * distanceScale + cameraOffset[2],
  ];
  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows="variance"
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      camera={{ fov: stage.fieldOfView, position }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <CameraRig position={position} target={target} fov={stage.fieldOfView} />
      <ambientLight intensity={dark ? 0.25 : 0.55} />
      <directionalLight
        position={[-2.5, 4, 12]}
        intensity={stage.keyLight}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={stage.shadowSoftness}
        shadow-blurSamples={24}
        shadow-bias={-0.0004}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <directionalLight position={[5, 2, -6]} intensity={dark ? 1.6 : 0.8} color="#ffffff" />
      <Studio reflections={stage.reflections} dark={dark} />
      <mesh position={[0, 0, backdropZ]} receiveShadow>
        <planeGeometry args={[160, 100]} />
        <shadowMaterial transparent opacity={stage.shadow} color={dark ? '#000000' : '#15151a'} />
      </mesh>
      {children}
    </ThreeCanvas>
  );
};

export const FloatingCard = ({
  card,
  width = 2.2,
  opacity = 1,
}: {
  card: PromoCardId;
  width?: number;
  opacity?: number;
}) => {
  const map = useTexture(cardUrl(card));
  return (
    <mesh>
      <planeGeometry args={[width, width * (340 / 720)]} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={opacity}
        toneMapped={false}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
};

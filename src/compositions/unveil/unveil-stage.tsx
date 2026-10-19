import { Environment, Lightformer } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { ThreeCanvas } from '@remotion/three';
import type { ReactNode } from 'react';
import { getRemotionEnvironment, useVideoConfig } from 'remotion';
import type * as THREE from 'three';
import type { UnveilSky } from '@/schemas';
import type { CameraShot } from './flight';

const CameraRig = ({ shot, fov }: { shot: CameraShot; fov: number }) => {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  camera.position.set(...shot.position);
  camera.fov = fov;
  camera.near = 1;
  camera.far = 2000;
  camera.updateProjectionMatrix();
  camera.lookAt(...shot.target);
  return null;
};

const Daylight = ({ sky }: { sky: UnveilSky }) => (
  <Environment resolution={256} frames={1}>
    <color attach="background" args={[sky.horizon]} />
    <Lightformer
      form="rect"
      intensity={1.6}
      color={sky.zenith}
      position={[0, 20, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[60, 60, 1]}
    />
    <Lightformer form="circle" intensity={6} position={[30, 40, 40]} scale={8} />
    <Lightformer
      form="rect"
      intensity={0.5}
      color="#6d7f5a"
      position={[0, -20, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[60, 60, 1]}
    />
  </Environment>
);

export const UnveilStage = ({
  shot,
  fov,
  sky,
  children,
}: {
  shot: CameraShot;
  fov: number;
  sky: UnveilSky;
  children: ReactNode;
}) => {
  const { width, height } = useVideoConfig();
  const pixelRatio = getRemotionEnvironment().isRendering ? 2 : 1;
  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows="percentage"
      dpr={pixelRatio}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{ fov, position: shot.position }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <CameraRig shot={shot} fov={fov} />
      <fog attach="fog" args={[sky.haze, 160, 1100]} />
      <hemisphereLight args={[sky.horizon, '#5d6b4c', 0.85]} />
      <directionalLight
        position={[45, 70, 55]}
        intensity={sky.sun}
        color="#fff4e2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0006}
        shadow-normalBias={0.04}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={40}
        shadow-camera-bottom={-25}
        shadow-camera-near={1}
        shadow-camera-far={220}
      />
      <Daylight sky={sky} />
      {children}
    </ThreeCanvas>
  );
};

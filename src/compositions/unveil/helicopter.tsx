import * as THREE from 'three';
import type { UnveilHelicopter } from '@/schemas';
import type { Vec3 } from './flight';

const BLADES = [0, 1, 2, 3] as const;
const GHOSTS = [0, 1, 2, 3] as const;
const ROTOR_STEP = 0.16;
const SKID_SIDES = [-1, 1] as const;
const STRUT_X = [-1.2, 1.6] as const;

const Paint = ({ color, gloss = 0.32 }: { color: string; gloss?: number | undefined }) => (
  <meshStandardMaterial color={color} roughness={gloss} metalness={0.15} />
);

const Blob = ({
  position,
  scale,
  color,
  gloss,
}: {
  position: Vec3;
  scale: Vec3;
  color: string;
  gloss?: number | undefined;
}) => (
  <mesh position={position} scale={scale} castShadow>
    <sphereGeometry args={[1, 32, 20]} />
    <Paint color={color} gloss={gloss} />
  </mesh>
);

const MainRotor = ({ angle, trim }: { angle: number; trim: string }) => (
  <group position={[0.2, 2.15, 0]}>
    <mesh>
      <cylinderGeometry args={[0.32, 0.38, 0.32, 16]} />
      <Paint color={trim} />
    </mesh>
    {GHOSTS.map((ghost) => (
      <group key={ghost} rotation={[0, angle - (ghost / GHOSTS.length) * ROTOR_STEP, 0]}>
        {BLADES.map((blade) => (
          <mesh key={blade} rotation={[0.03, (blade * Math.PI) / 2, 0]} position={[0, 0.05, 0]}>
            <boxGeometry args={[11.4, 0.05, 0.34]} />
            <meshStandardMaterial
              color={trim}
              roughness={0.5}
              transparent
              depthWrite={false}
              opacity={0.55 * (1 - ghost / GHOSTS.length)}
            />
          </mesh>
        ))}
      </group>
    ))}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
      <circleGeometry args={[5.75, 64]} />
      <meshBasicMaterial
        color={trim}
        transparent
        opacity={0.06}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  </group>
);

const TailRotor = ({ angle, trim }: { angle: number; trim: string }) => (
  <group position={[-7.15, 1.55, 0.3]}>
    <group rotation={[0, 0, angle * 1.6]}>
      {[0, 1].map((blade) => (
        <mesh key={blade} rotation={[0, 0, (blade * Math.PI) / 2]}>
          <boxGeometry args={[1.8, 0.14, 0.04]} />
          <meshStandardMaterial color={trim} roughness={0.5} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
    <mesh>
      <circleGeometry args={[0.92, 32]} />
      <meshBasicMaterial
        color={trim}
        transparent
        opacity={0.12}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  </group>
);

export const Helicopter = ({
  frame,
  helicopter,
}: {
  frame: number;
  helicopter: UnveilHelicopter;
}) => {
  const angle = frame * ROTOR_STEP * helicopter.rotorSpeed;
  const { body, trim, glass } = helicopter;
  return (
    <group scale={helicopter.scale}>
      <Blob position={[0.6, 0, 0]} scale={[2.6, 1.45, 1.35]} color={body} />
      <Blob position={[0.5, -0.42, 0]} scale={[2.55, 0.42, 1.37]} color={trim} gloss={0.4} />
      <Blob position={[-0.2, 1.05, 0]} scale={[1.7, 0.6, 0.85]} color={body} />
      <mesh position={[2.05, 0.28, 0]} scale={[1.25, 0.98, 1.12]}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color={glass} roughness={0.12} metalness={0.55} />
      </mesh>
      <mesh position={[-4.1, 0.5, 0]} rotation={[0, 0, Math.PI / 2 + 0.07]} castShadow>
        <cylinderGeometry args={[0.2, 0.48, 6.2, 20]} />
        <Paint color={body} />
      </mesh>
      <mesh position={[-6.9, 1.35, 0]} rotation={[0, 0, -0.38]}>
        <boxGeometry args={[1.05, 1.7, 0.14]} />
        <Paint color={trim} />
      </mesh>
      <mesh position={[-6.1, 0.72, 0]}>
        <boxGeometry args={[0.7, 0.08, 2.1]} />
        <Paint color={body} />
      </mesh>
      <mesh position={[0.2, 1.7, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.6, 10]} />
        <Paint color={trim} />
      </mesh>
      <MainRotor angle={angle} trim={trim} />
      <TailRotor angle={angle} trim={trim} />
      {SKID_SIDES.map((side) => (
        <group key={side}>
          <mesh position={[0.4, -1.85, side * 1.15]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 5.4, 8]} />
            <Paint color={trim} />
          </mesh>
          {STRUT_X.map((x) => (
            <mesh key={x} position={[x, -1.35, side * 0.95]} rotation={[side * 0.4, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.1, 8]} />
              <Paint color={trim} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

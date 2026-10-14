import { RoundedBox } from '@react-three/drei';
import { capsuleGeometry, PHONE, plateauGeometry } from './phone-geometry';
import type { PhoneMaterials } from './phone-materials';

const LENSES: [number, number][] = [
  [-0.142, 0.142],
  [-0.142, -0.142],
  [0.142, 0],
];

const Lens = ({ x, y, materials }: { x: number; y: number; materials: PhoneMaterials }) => (
  <group position={[x, y, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
    <mesh position={[0, 0.018, 0]} material={materials.ring} castShadow>
      <cylinderGeometry args={[0.118, 0.122, 0.036, 64]} />
    </mesh>
    <mesh position={[0, 0.0365, 0]} material={materials.blackGloss}>
      <cylinderGeometry args={[0.1, 0.1, 0.002, 64]} />
    </mesh>
    <mesh position={[0, 0.038, 0]} material={materials.lensGlass}>
      <cylinderGeometry args={[0.074, 0.074, 0.002, 64]} />
    </mesh>
    <mesh position={[0, 0.0395, 0]} material={materials.blackGloss}>
      <cylinderGeometry args={[0.028, 0.028, 0.001, 32]} />
    </mesh>
  </group>
);

export const CameraPlateau = ({ materials }: { materials: PhoneMaterials }) => (
  <group
    position={[PHONE.width / 2 - 0.39, PHONE.height / 2 - 0.39, -PHONE.depth / 2]}
    rotation={[0, Math.PI, 0]}
  >
    <mesh position={[0, 0, 0.012]} geometry={plateauGeometry()} material={materials.plateau} />
    {LENSES.map(([x, y]) => (
      <Lens key={`${x}:${y}`} x={x} y={y} materials={materials} />
    ))}
    <mesh position={[0.142, 0.205, 0.0335]} material={materials.flash}>
      <circleGeometry args={[0.036, 40]} />
    </mesh>
    <mesh position={[0.142, -0.205, 0.0335]} material={materials.blackGloss}>
      <circleGeometry args={[0.03, 40]} />
    </mesh>
    <mesh position={[0.02, 0.0, 0.0335]} material={materials.hole}>
      <circleGeometry args={[0.008, 16]} />
    </mesh>
  </group>
);

const SIDE_BUTTONS: { side: 1 | -1; y: number; length: number }[] = [
  { side: 1, y: 0.52, length: 0.42 },
  { side: -1, y: 0.93, length: 0.14 },
  { side: -1, y: 0.6, length: 0.26 },
  { side: -1, y: 0.27, length: 0.26 },
];

export const SideButtons = ({ materials }: { materials: PhoneMaterials }) => (
  <>
    {SIDE_BUTTONS.map((button) => (
      <RoundedBox
        key={`${button.side}:${button.y}`}
        args={[0.024, button.length, 0.052]}
        radius={0.01}
        smoothness={4}
        position={[button.side * (PHONE.width / 2 + 0.004), button.y, 0]}
        material={materials.frame}
        castShadow
      />
    ))}
  </>
);

const ANTENNA_Y = [PHONE.height / 2 - 0.34, -(PHONE.height / 2 - 0.34)];

export const AntennaBands = ({ materials }: { materials: PhoneMaterials }) => (
  <>
    {ANTENNA_Y.flatMap((y) =>
      [1, -1].map((side) => (
        <mesh
          key={`${y}:${side}`}
          position={[side * (PHONE.width / 2 + 0.0006), y, 0]}
          rotation={[0, (side * Math.PI) / 2, 0]}
          material={materials.antenna}
        >
          <planeGeometry args={[PHONE.depth - PHONE.edge * 2, 0.022]} />
        </mesh>
      )),
    )}
  </>
);

const GRILLE = [0, 1, 2, 3, 4, 5];

export const BottomPorts = ({ materials }: { materials: PhoneMaterials }) => (
  <group position={[0, -PHONE.height / 2 - 0.0006, 0]} rotation={[Math.PI / 2, 0, 0]}>
    <mesh geometry={capsuleGeometry(0.2, 0.062)} material={materials.hole} />
    {GRILLE.flatMap((index) =>
      [1, -1].map((side) => (
        <mesh
          key={`${index}:${side}`}
          position={[side * (0.2 + index * 0.045), 0, 0]}
          material={materials.hole}
        >
          <circleGeometry args={[0.012, 12]} />
        </mesh>
      )),
    )}
  </group>
);

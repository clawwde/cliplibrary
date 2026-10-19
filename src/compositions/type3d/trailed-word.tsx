import type { Vec3 } from './type-canvas';
import type { WordArt } from './word-art';
import { WordPlane } from './word-plane';

export interface Pose {
  position: Vec3;
  rotation: Vec3;
  opacity: number;
  scale?: number;
}

const TRAIL_SAMPLES = 8;
const TRAIL_SPACING = 0.22;
const FULL_TRAIL_SPEED = 0.3;

const distance = (a: Vec3, b: Vec3): number => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

export const TrailedWord = ({
  art,
  height,
  bend = 0,
  frame,
  pose,
  trail,
}: {
  art: WordArt;
  height: number;
  bend?: number;
  frame: number;
  pose: (at: number) => Pose;
  trail: number;
}) => {
  const now = pose(frame);
  const speed = distance(now.position, pose(frame - 1).position);
  const streak = trail * Math.min(1, speed / FULL_TRAIL_SPEED);
  const samples = streak > 0.02 ? TRAIL_SAMPLES : 0;
  const ghosts = Array.from({ length: samples }, (_, index) => {
    const step = index + 1;
    const ghost = pose(frame - step * TRAIL_SPACING);
    return { step, ghost, opacity: ghost.opacity * streak * 0.22 * (1 - step / (samples + 1)) };
  });
  return (
    <>
      {ghosts.reverse().map(({ step, ghost, opacity }) => (
        <group
          key={step}
          position={ghost.position}
          rotation={ghost.rotation}
          scale={ghost.scale ?? 1}
        >
          <WordPlane art={art} height={height} bend={bend} opacity={opacity} />
        </group>
      ))}
      <group position={now.position} rotation={now.rotation} scale={now.scale ?? 1}>
        <WordPlane art={art} height={height} bend={bend} opacity={now.opacity} />
      </group>
    </>
  );
};

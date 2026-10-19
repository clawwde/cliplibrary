import * as THREE from 'three';
import type { ArmLook } from '../promo/desk/arm';
import { HandModel, useHandScene } from '../promo/desk/hand-model';
import { applyHandPose, type HandPose, mixPose } from '../promo/desk/hand-rig';
import { type PalmFrame, palmBasis } from '../promo/desk/wipe-choreography';

export interface HandsLook {
  skin: string;
  roughness: number;
  detail: number;
  rubSpeed: number;
  rubReach: number;
  gripCurl: number;
  thumbCurl: number;
  fingerLean: number;
  watch: boolean;
  watchColor: string;
}

export interface HandBlend {
  rub: number;
  hold: number;
  ballRadius: number;
  grip: PalmFrame;
}

const ARM: ArmLook = {
  style: 'bare',
  sleeveColor: '#4a5263',
  length: 0.8,
  looseness: 0.4,
  knit: 0.004,
  band: false,
  bandColor: '#b9bcc1',
};

const FOREARM = 2.6;
const ELBOW_BIAS = new THREE.Vector3(0.25, -0.9, 0.7);

const elbowFor = (palm: PalmFrame): THREE.Vector3 =>
  new THREE.Vector3(0, 1, 0)
    .applyQuaternion(palm.quaternion)
    .negate()
    .add(ELBOW_BIAS)
    .normalize()
    .multiplyScalar(FOREARM)
    .add(palm.position);

const pose = (curl: number, thumbCurl: number, thumbReach: number, spread: number): HandPose => ({
  curl: { index: curl * 0.85, middle: curl, ring: curl * 1.08, pinky: curl * 1.18 },
  spread,
  thumbCurl,
  thumbReach,
  wristBend: 0,
  wristTwist: 0,
});

const framed = (position: THREE.Vector3, normal: THREE.Vector3, fingers: THREE.Vector3) => ({
  position,
  quaternion: palmBasis(normal, fingers),
});

const rubFrame = (frame: number, look: HandsLook, side: number): PalmFrame => {
  const fingers = new THREE.Vector3(-0.15, 0.8, -0.55).normalize();
  const phase = (frame / look.rubSpeed) * Math.PI * 2;
  const stroke = Math.sin(phase) * side * look.rubReach;
  const circle = Math.cos(phase) * look.rubReach * 0.45;
  return framed(
    new THREE.Vector3(0.14, -0.75, 0.35 + circle).addScaledVector(fingers, stroke),
    new THREE.Vector3(-1, 0, 0.12),
    fingers,
  );
};

const ballFrame = (frame: number, ballRadius: number, side: number): PalmFrame => {
  const sway = Math.sin(frame / 13 + side * 1.3) * 0.06;
  return framed(
    new THREE.Vector3(ballRadius * 0.75 + 0.1 + sway * 0.4, -0.3 + sway, 0.05 - sway * 0.5),
    new THREE.Vector3(-0.85, 0.45, 0.1),
    new THREE.Vector3(-0.35, 0.55, -0.75),
  );
};

const blendFrames = (from: PalmFrame, to: PalmFrame, amount: number): PalmFrame => ({
  position: from.position.clone().lerp(to.position, amount),
  quaternion: from.quaternion.clone().slerp(to.quaternion, amount),
});

const Hand = ({
  palm,
  handPose,
  look,
  arm,
}: {
  palm: PalmFrame;
  handPose: HandPose;
  look: HandsLook;
  arm: ArmLook;
}) => {
  const hand = useHandScene();
  applyHandPose(hand.rig, handPose);
  return (
    <HandModel
      hand={hand}
      palm={palm}
      skin={look.skin}
      roughness={look.roughness}
      detail={look.detail}
      arm={arm}
      elbow={elbowFor(palm)}
    />
  );
};

const handPlacement = (
  frame: number,
  look: HandsLook,
  blend: HandBlend,
  side: number,
): { palm: PalmFrame; handPose: HandPose } => {
  const rub = rubFrame(frame, look, side);
  const ball = ballFrame(frame, blend.ballRadius, side);
  const early = blendFrames(rub, ball, 1 - blend.rub);
  const palm = blendFrames(early, blend.grip, blend.hold);
  const rubPose = pose(0.08, 0.15, 0.1, 0.05);
  const ballPose = pose(0.7, 0.55, 0.45, 0.2);
  const holdPose = pose(look.gripCurl, look.thumbCurl, 0.55, 0.35);
  return {
    palm,
    handPose: mixPose(mixPose(rubPose, ballPose, 1 - blend.rub), holdPose, blend.hold),
  };
};

export const holdFrame = (
  anchor: THREE.Vector3,
  normal: THREE.Vector3,
  up: THREE.Vector3,
  look: HandsLook,
  depth: number,
): PalmFrame => {
  const fingers = up
    .clone()
    .add(new THREE.Vector3(-look.fingerLean, 0, 0))
    .normalize();
  return framed(anchor.clone().addScaledVector(normal, -depth), normal, fingers);
};

export const PaperHands = ({
  frame,
  look,
  right,
  left,
}: {
  frame: number;
  look: HandsLook;
  right: HandBlend;
  left: HandBlend;
}) => {
  const rightHand = handPlacement(frame, look, right, 1);
  const leftHand = handPlacement(frame, look, left, -1);
  return (
    <>
      <Hand palm={rightHand.palm} handPose={rightHand.handPose} look={look} arm={ARM} />
      <group scale={[-1, 1, 1]}>
        <Hand
          palm={leftHand.palm}
          handPose={leftHand.handPose}
          look={look}
          arm={{ ...ARM, band: look.watch, bandColor: look.watchColor }}
        />
      </group>
    </>
  );
};

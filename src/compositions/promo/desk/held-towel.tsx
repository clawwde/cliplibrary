import type { ArmLook } from './arm';
import { Cloth, type ClothLook, clothPlacement } from './cloth';
import { HAND_UNITS, HandModel, palmToWorld, useHandScene } from './hand-model';
import { applyHandPose, type HandPose } from './hand-rig';
import { handCapsules, thumbEdgeShift } from './towel-contact';
import type { PalmFrame } from './wipe-choreography';

const EDGE_MARGIN = 0.04;

export interface HeldTowelProps {
  palm: PalmFrame;
  pose: HandPose;
  holdPalm: PalmFrame;
  holdPose: HandPose;
  skin: string;
  roughness: number;
  detail: number;
  arm: ArmLook;
  cloth: ClothLook | null;
  press: number;
  held: number;
  gap: number;
}

export const HeldTowel = ({
  palm,
  pose,
  holdPalm,
  holdPose,
  skin,
  roughness,
  detail,
  arm,
  cloth,
  press,
  held,
  gap,
}: HeldTowelProps) => {
  const hand = useHandScene();
  let shiftX = 0;
  if (cloth !== null) {
    applyHandPose(hand.rig, holdPose);
    const holdPlacement = clothPlacement(
      holdPalm,
      cloth.offsetX + cloth.holdOffsetX,
      cloth.offsetY + cloth.holdOffsetY,
      gap,
    );
    const toCloth = holdPlacement.clone().invert().multiply(palmToWorld(holdPalm));
    shiftX = thumbEdgeShift(
      handCapsules(hand.rig, toCloth, HAND_UNITS),
      cloth.size / 2,
      EDGE_MARGIN,
    );
  }
  applyHandPose(hand.rig, pose);
  const handPlacement = palmToWorld(palm);
  return (
    <>
      <HandModel
        hand={hand}
        palm={palm}
        skin={skin}
        roughness={roughness}
        detail={detail}
        arm={arm}
      />
      {cloth === null ? null : (
        <Cloth
          palm={palm}
          look={cloth}
          press={press}
          held={held}
          gap={gap}
          shiftX={shiftX}
          capsules={(placement) =>
            handCapsules(hand.rig, placement.clone().invert().multiply(handPlacement), HAND_UNITS)
          }
        />
      )}
    </>
  );
};

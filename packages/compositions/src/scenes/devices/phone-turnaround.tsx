import {
  type PhoneTurnaroundProps,
  type PromoPhone,
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { facingBrightness, PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { glide, settle, TAU, track, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const RISE_FRAMES = 66;

export const PhoneTurnaround = ({
  phone,
  position,
  scale,
  turnAt,
  rise: riseDistance,
  turnFrames,
  secondScreen,
  secondTurnAt,
  secondTurnFrames,
  travelX,
  endYaw,
  look,
  stage,
  motion,
}: PhoneTurnaroundProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const turn = Math.round(durationInFrames * turnAt);
  const rise = tween(frame, [0, RISE_FRAMES], [0, 1], settle);
  const turnStart = Math.max(0, Math.min(RISE_FRAMES - 48, turn - 72));
  const turned = Math.max(turnStart + turnFrames, turn + turnFrames);
  const twice = secondScreen !== 'none';
  const secondFrom = Math.max(turned + 1, secondTurnAt);
  const secondEnd = secondFrom + secondTurnFrames;
  const settleYaw = twice
    ? track(
        frame,
        [
          [turned, 0],
          [secondFrom, 0.35],
          [secondEnd, TAU + endYaw + 0.25],
        ],
        glide,
      )
    : tween(frame, [turned, Math.max(durationInFrames, turned + 1)], [0, 0.47]);
  const rotateY =
    tween(frame, [0, RISE_FRAMES], [Math.PI + 1.1, Math.PI], settle) +
    tween(frame, [turnStart, turned], [0, Math.PI - 0.25]) +
    settleYaw;
  const second = twice ? tween(frame, [secondFrom, secondEnd], [0, 1]) : 0;
  const calm = 1 - second;
  const growEnd = twice ? secondEnd : durationInFrames;
  const grow = scale * (0.85 + rise * 0.15) * tween(frame, [RISE_FRAMES, growEnd], [1, 1.05]);
  const shown: PromoPhone =
    twice && frame >= secondFrom + secondTurnFrames / 2
      ? { ...phone, screen: secondScreen }
      : phone;
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={{ ...stage, cameraDrift: stage.cameraDrift * calm }} dark={isDarkLook(look)}>
        <group
          position={[
            position.x + travelX * second,
            position.y + (1 - rise) * -riseDistance + Math.sin(frame / 30) * motion.float * calm,
            position.z,
          ]}
          rotation={[0.05 + (1 - rise) * 0.6, rotateY - TAU, 0.03]}
          scale={grow}
        >
          <PhoneModel
            phone={shown}
            reflections={stage.reflections}
            brightness={facingBrightness(rotateY)}
          />
        </group>
      </Stage>
    </PromoLayer>
  );
};

export const phoneTurnaroundScene: SceneModule = {
  id: 'phone-turnaround',
  component: PhoneTurnaround,
  render: (key) => (
    <Composition
      key={key}
      id="phone-turnaround"
      component={PhoneTurnaround}
      schema={phoneTurnaroundSchema}
      defaultProps={phoneTurnaroundDefaults}
      durationInFrames={phoneTurnaroundMeta.durationInFrames}
      fps={phoneTurnaroundMeta.fps}
      width={phoneTurnaroundMeta.width}
      height={phoneTurnaroundMeta.height}
    />
  ),
};

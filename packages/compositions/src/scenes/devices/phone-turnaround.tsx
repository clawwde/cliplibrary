import {
  type PhoneTurnaroundProps,
  type PromoPhone,
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { glide, settle, TAU, track, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const RISE_FRAMES = 66;
const DRIFT_FROM = 40;

const yawKey = (yaw: number): number => yaw + Math.PI + 0.3;

export const PhoneTurnaround = ({
  phone,
  position,
  scale,
  turnAt,
  rise,
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
  const turnStart = Math.max(DRIFT_FROM + 8, Math.round(durationInFrames * turnAt) - 24);
  const turnEnd = turnStart + turnFrames;
  const twice = secondScreen !== 'none';
  const secondFrom = Math.max(turnEnd + 1, secondTurnAt);
  const secondEnd = secondFrom + secondTurnFrames;
  const lift = tween(frame, [0, RISE_FRAMES], [0, 1], settle);
  const keys: [number, number][] = twice
    ? [
        [DRIFT_FROM, 0],
        [turnStart, 0.6],
        [turnEnd, yawKey(-0.25)],
        [secondFrom, yawKey(0.1)],
        [secondEnd, yawKey(TAU + endYaw)],
      ]
    : [
        [DRIFT_FROM, 0],
        [turnStart, 0.6],
        [turnEnd, Math.PI + 0.05],
        [Math.max(turnEnd + 1, durationInFrames), Math.PI + 0.52],
      ];
  const rotateY =
    tween(frame, [0, RISE_FRAMES], [Math.PI + 1.1, Math.PI - 0.3], settle) +
    track(frame, keys, glide);
  const second = twice ? tween(frame, [secondFrom, secondEnd], [0, 1]) : 0;
  const calm = twice ? 1 - second : 1;
  const growEnd = twice ? secondEnd : durationInFrames;
  const grow = scale * (0.85 + lift * 0.15) * tween(frame, [RISE_FRAMES, growEnd], [1, 1.05]);
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
            position.y - (1 - lift) * rise + Math.sin(frame / 30) * motion.float * calm,
            position.z,
          ]}
          rotation={[0.05 + (1 - lift) * 0.6, rotateY - TAU, 0.03]}
          scale={grow}
        >
          <PhoneModel phone={shown} reflections={stage.reflections} />
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

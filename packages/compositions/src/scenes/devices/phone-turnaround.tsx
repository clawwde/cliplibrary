import {
  type PhoneTurnaroundProps,
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { facingBrightness, PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { settle, TAU, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const RISE_FRAMES = 66;

export const PhoneTurnaround = ({
  phone,
  position,
  scale,
  turnAt,
  rise: riseDistance,
  look,
  stage,
  motion,
}: PhoneTurnaroundProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const turn = Math.round(durationInFrames * turnAt);
  const rise = tween(frame, [0, RISE_FRAMES], [0, 1], settle);
  const turnStart = Math.max(0, Math.min(RISE_FRAMES - 48, turn - 72));
  const turned = Math.max(turnStart + 60, turn + 60);
  const rotateY =
    tween(frame, [0, RISE_FRAMES], [Math.PI + 1.1, Math.PI], settle) +
    tween(frame, [turnStart, turned], [0, Math.PI - 0.25]) +
    tween(frame, [turned, Math.max(durationInFrames, turned + 1)], [0, 0.47]);
  const grow =
    scale * (0.85 + rise * 0.15) * tween(frame, [RISE_FRAMES, durationInFrames], [1, 1.05]);
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={stage} dark={isDarkLook(look)}>
        <group
          position={[
            position.x,
            position.y + (1 - rise) * -riseDistance + Math.sin(frame / 30) * motion.float,
            position.z,
          ]}
          rotation={[0.05 + (1 - rise) * 0.6, rotateY - TAU, 0.03]}
          scale={grow}
        >
          <PhoneModel
            phone={phone}
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

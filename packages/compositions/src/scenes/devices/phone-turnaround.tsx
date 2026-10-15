import {
  type PhoneTurnaroundProps,
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { settle, TAU, track, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const RISE_FRAMES = 66;

export const PhoneTurnaround = ({
  phone,
  position,
  scale,
  turnAt,
  look,
  stage,
  motion,
}: PhoneTurnaroundProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const turn = Math.round(durationInFrames * turnAt);
  const rise = tween(frame, [0, RISE_FRAMES], [0, 1], settle);
  const turned = Math.max(RISE_FRAMES + 50, turn + 50);
  const rotateY =
    tween(frame, [0, RISE_FRAMES], [Math.PI + 1.1, Math.PI - 0.3], settle) +
    track(frame, [
      [RISE_FRAMES, 0],
      [turned, Math.PI + 0.05],
      [Math.max(durationInFrames, turned + 1), Math.PI + 0.52],
    ]);
  const grow =
    scale * (0.85 + rise * 0.15) * tween(frame, [RISE_FRAMES, durationInFrames], [1, 1.05]);
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={stage} dark={isDarkLook(look)}>
        <group
          position={[
            position.x,
            position.y + (1 - rise) * -7.5 + Math.sin(frame / 30) * motion.float,
            position.z,
          ]}
          rotation={[0.05 + (1 - rise) * 0.6, rotateY - TAU, 0.03]}
          scale={grow}
        >
          <PhoneModel phone={phone} reflections={stage.reflections} />
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

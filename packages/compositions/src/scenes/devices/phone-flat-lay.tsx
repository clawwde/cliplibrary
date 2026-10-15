import {
  type PhoneFlatLayProps,
  phoneFlatLayDefaults,
  phoneFlatLayMeta,
  phoneFlatLaySchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { PHONE } from '../../promo/phone-geometry';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { RibbonField } from '../../promo/set-pieces';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const REST_GAP = 0.01;

export const PhoneFlatLay = ({
  phone,
  position,
  scale,
  phoneTurn,
  surface,
  camera,
  look,
  stage,
  motion,
}: PhoneFlatLayProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const progress = tween(frame, [0, camera.frames], [0, 1], settle);
  const tilt = camera.tiltFrom + (camera.tiltTo - camera.tiltFrom) * progress;
  const turn = camera.turnFrom + (camera.turnTo - camera.turnFrom) * progress;
  const rest = surface.show ? surface.thickness + surface.step + surface.amplitude + REST_GAP : 0;
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage
        stage={stage}
        dark={isDarkLook(look)}
        backdropZ={-40}
        keyPosition={[camera.lightX, camera.lightY, camera.lightZ]}
      >
        <group rotation={[-tilt, 0, turn]}>
          {surface.show ? (
            <group rotation={[0, 0, surface.angle]}>
              <RibbonField
                count={surface.count}
                width={surface.width}
                length={surface.length}
                thickness={surface.thickness}
                step={surface.step}
                amplitude={surface.amplitude}
                waves={surface.waves}
                color={surface.color}
                roughness={surface.roughness}
                reflections={stage.reflections}
              />
            </group>
          ) : null}
          <group
            position={[position.x, position.y, rest + (PHONE.depth / 2) * scale + position.z]}
            rotation={[0, 0, phoneTurn]}
            scale={scale}
          >
            <PhoneModel phone={phone} reflections={stage.reflections} />
          </group>
        </group>
      </Stage>
    </PromoLayer>
  );
};

export const phoneFlatLayScene: SceneModule = {
  id: 'phone-flat-lay',
  component: PhoneFlatLay,
  render: (key) => (
    <Composition
      key={key}
      id="phone-flat-lay"
      component={PhoneFlatLay}
      schema={phoneFlatLaySchema}
      defaultProps={phoneFlatLayDefaults}
      durationInFrames={phoneFlatLayMeta.durationInFrames}
      fps={phoneFlatLayMeta.fps}
      width={phoneFlatLayMeta.width}
      height={phoneFlatLayMeta.height}
    />
  ),
};

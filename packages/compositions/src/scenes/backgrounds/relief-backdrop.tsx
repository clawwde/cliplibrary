import {
  type ReliefBackdropProps,
  reliefBackdropDefaults,
  reliefBackdropMeta,
  reliefBackdropSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { ReliefWall } from '../../promo/set-pieces';
import { Stage } from '../../promo/stage';
import { cameraPush, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const reliefSwing = (frame: number, at: number, frames: number, angle: number): number =>
  angle * Math.sin(Math.PI * tween(frame, [at, at + frames], [0, 1], smooth));

export const ReliefBackdrop = ({
  wallColor,
  roughness,
  rings,
  camera,
  look,
  stage,
  motion,
}: ReliefBackdropProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const push = cameraPush(frame, camera.pushIn, camera.pushFrames);
  const swing = reliefSwing(frame, camera.orbitAt, camera.orbitFrames, camera.orbitAngle);
  return (
    <PromoLayer look={{ ...look, showBackdrop: false }} motion={motion}>
      <Stage
        stage={stage}
        dark={isDarkLook(look)}
        distanceScale={push}
        backdropZ={-40}
        keyPosition={[camera.lightX, camera.lightY, camera.lightZ]}
      >
        <group rotation={[0, swing, 0]}>
          <ReliefWall
            layout={rings}
            bevel={rings.bevel}
            color={wallColor}
            roughness={roughness}
            reflections={stage.reflections}
            showWall={look.showBackdrop}
          />
        </group>
      </Stage>
    </PromoLayer>
  );
};

export const reliefBackdropScene: SceneModule = {
  id: 'relief-backdrop',
  component: ReliefBackdrop,
  render: (key) => (
    <Composition
      key={key}
      id="relief-backdrop"
      component={ReliefBackdrop}
      schema={reliefBackdropSchema}
      defaultProps={reliefBackdropDefaults}
      durationInFrames={reliefBackdropMeta.durationInFrames}
      fps={reliefBackdropMeta.fps}
      width={reliefBackdropMeta.width}
      height={reliefBackdropMeta.height}
    />
  ),
};

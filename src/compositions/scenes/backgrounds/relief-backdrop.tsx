import { Composition, useCurrentFrame } from 'remotion';
import {
  type ReliefBackdropProps,
  reliefBackdropDefaults,
  reliefBackdropMeta,
  reliefBackdropSchema,
} from '@/schemas';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { ReliefWall } from '../../promo/set-pieces';
import { Stage } from '../../promo/stage';
import { cameraPush, swingAngle } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const MATTE = 0.3;

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
  const swing = swingAngle(
    frame,
    camera.orbitAt,
    camera.orbitFrames,
    camera.orbitAngle,
    camera.orbitPeak,
  );
  return (
    <PromoLayer look={{ ...look, showBackdrop: false }} motion={motion}>
      <Stage
        stage={stage}
        dark={isDarkLook(look)}
        distanceScale={push}
        backdropZ={-40}
        keyPosition={[camera.lightX, camera.lightY, camera.lightZ]}
        shadowExtent={3}
        far={600}
      >
        <group position={[0, 0, camera.orbitPivot]} rotation={[0, swing, 0]}>
          <group position={[0, 0, -camera.orbitPivot]}>
            <ReliefWall
              layout={rings}
              bevel={rings.bevel}
              color={wallColor}
              roughness={roughness}
              reflections={stage.reflections * MATTE}
              showWall={look.showBackdrop}
            />
          </group>
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

import { useMemo } from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import {
  type LaptopWipeRevealProps,
  laptopWipeRevealDefaults,
  laptopWipeRevealMeta,
  laptopWipeRevealSchema,
} from '@/schemas';
import { useCanvasFont, useCanvasTexture } from '../../promo/desk/canvas-texture';
import { Cloth } from '../../promo/desk/cloth';
import { cameraPosition, DeskRoom, DeskStage } from '../../promo/desk/desk-stage';
import { drawScreen, SCREEN_CANVAS } from '../../promo/desk/desk-textures';
import { HandModel } from '../../promo/desk/hand-model';
import { mixPose } from '../../promo/desk/hand-rig';
import { LAPTOP } from '../../promo/desk/laptop-geometry';
import { LaptopModel } from '../../promo/desk/laptop-model';
import { LensOverlay } from '../../promo/desk/lens';
import { Plant } from '../../promo/desk/plant';
import { choreograph, shaderPoints, type WipeTiming } from '../../promo/desk/wipe-choreography';
import { createWipeMaterial, updateWipeMaterial } from '../../promo/desk/wipe-material';
import { displayFont, displayFontReady } from '../../promo/fonts';
import { PromoLayer } from '../../promo/promo-layer';
import type { SceneModule } from '../../scene-module';

const ASPECT = LAPTOP.screenWidth / LAPTOP.screenHeight;

const Screen = ({
  screen,
  wipe,
  progress,
  reveal,
}: Pick<LaptopWipeRevealProps, 'screen' | 'wipe'> & { progress: number; reveal: number }) => {
  useCanvasFont(`600 ${screen.size}px "${displayFont}"`, displayFontReady);
  const content = useCanvasTexture(
    SCREEN_CANVAS.width,
    SCREEN_CANVAS.height,
    (context) => drawScreen(context, { ...screen, font: displayFont }),
    JSON.stringify(screen),
  );
  const wipeMaterial = useMemo(() => createWipeMaterial(content), [content]);
  const points = useMemo(() => shaderPoints(wipe, ASPECT), [wipe]);
  updateWipeMaterial(wipeMaterial, {
    cover: screen.cover,
    smudge: screen.smudge,
    haze: screen.haze,
    points,
    count: progress * (points.length - 1),
    radius: wipe.radius,
    softness: wipe.softness,
    streaks: wipe.streaks,
    reveal: wipe.revealAll ? reveal : 0,
    brightness: screen.brightness,
    aspect: ASPECT,
  });
  return (
    <mesh material={wipeMaterial.material}>
      <planeGeometry args={[LAPTOP.screenWidth, LAPTOP.screenHeight]} />
    </mesh>
  );
};

const LaptopWipeReveal = (props: LaptopWipeRevealProps) => {
  const { screen, wipe, timing, cloth, hand, arm, hold, laptop, room, camera, light } = props;
  const frame = useCurrentFrame() * props.motion.speed;
  const eye = new THREE.Vector3(...cameraPosition(camera, frame));
  const laptopTransform = new THREE.Matrix4()
    .makeTranslation(laptop.x, 0, 0)
    .multiply(new THREE.Matrix4().makeRotationY(laptop.turn));
  const localEye = eye.clone().applyMatrix4(laptopTransform.clone().invert());
  const motion = choreograph({
    frame,
    timing: timing satisfies WipeTiming,
    path: wipe,
    hold: { ...hold, x: hold.x - laptop.x },
    lidAngle: laptop.lidAngle,
    camera: localEye,
    contactGap: hand.contactGap + 0.02,
    enterFrom: new THREE.Vector3(hand.enterX, hand.enterY, hand.enterZ),
  });
  const wipePose = {
    curl: {
      index: hand.wipeCurl,
      middle: hand.wipeCurl,
      ring: hand.wipeCurl,
      pinky: hand.wipeCurl,
    },
    spread: hand.spread,
    thumbCurl: 0.1,
    thumbReach: -0.2,
    wristBend: hand.wristBend,
    wristTwist: hand.wristTwist,
  };
  const holdPose = {
    curl: {
      index: hand.holdCurl * 0.8,
      middle: hand.holdCurl,
      ring: hand.holdCurl * 1.1,
      pinky: hand.holdCurl * 1.2,
    },
    spread: hand.spread * 0.6,
    thumbCurl: hand.thumbHold,
    thumbReach: 0.4,
    wristBend: hand.holdWristBend,
    wristTwist: hand.wristTwist,
  };
  const pose = mixPose(wipePose, holdPose, motion.turn);
  return (
    <PromoLayer look={props.look} motion={props.motion}>
      <DeskStage camera={camera} light={light} frame={frame}>
        {room.show ? (
          <DeskRoom
            wall={room.wall}
            desk={room.desk}
            deskRoughness={room.deskRoughness}
            wallDistance={room.wallDistance}
          />
        ) : null}
        {room.show && room.showPlant ? (
          <group position={[room.plantX, 0, room.plantZ]} scale={room.plantScale}>
            <Plant look={room} frame={frame} />
          </group>
        ) : null}
        <group matrixAutoUpdate={false} matrix={laptopTransform}>
          <LaptopModel
            look={laptop}
            screen={
              <Screen screen={screen} wipe={wipe} progress={motion.wipe} reveal={motion.reveal} />
            }
          />
          <HandModel
            palm={motion.palm}
            pose={pose}
            skin={hand.skin}
            roughness={hand.roughness}
            detail={hand.detail}
            arm={arm}
          />
          {cloth.show ? (
            <Cloth
              palm={motion.palm}
              look={cloth}
              press={motion.press}
              held={motion.turn}
              gap={hand.contactGap * 0.5}
            />
          ) : null}
        </group>
      </DeskStage>
      <LensOverlay grain={camera.grain} vignette={camera.vignette} />
    </PromoLayer>
  );
};

export const laptopWipeRevealScene: SceneModule = {
  id: 'laptop-wipe-reveal',
  component: LaptopWipeReveal,
  render: (key) => (
    <Composition
      key={key}
      id="laptop-wipe-reveal"
      component={LaptopWipeReveal}
      schema={laptopWipeRevealSchema}
      defaultProps={laptopWipeRevealDefaults}
      durationInFrames={laptopWipeRevealMeta.durationInFrames}
      fps={laptopWipeRevealMeta.fps}
      width={laptopWipeRevealMeta.width}
      height={laptopWipeRevealMeta.height}
    />
  ),
};

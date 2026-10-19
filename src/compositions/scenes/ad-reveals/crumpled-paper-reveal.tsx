import { CameraMotionBlur } from '@remotion/motion-blur';
import { Composition, getRemotionEnvironment, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import {
  type CrumpledPaperRevealProps,
  crumpledPaperRevealDefaults,
  crumpledPaperRevealMeta,
  crumpledPaperRevealSchema,
} from '@/schemas';
import { type CrumpleShape, crumplePoint } from '../../paper/crumple';
import { CrumpledSheet } from '../../paper/crumpled-sheet';
import { type HandBlend, holdFrame, PaperHands } from '../../paper/paper-hands';
import { DeskStage } from '../../promo/desk/desk-stage';
import { LensOverlay } from '../../promo/desk/lens';
import { PromoLayer } from '../../promo/promo-layer';
import { glide, settle, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const mirror = (vector: THREE.Vector3) => new THREE.Vector3(-vector.x, vector.y, vector.z);

const PROBE = 0.04;

const sheetFrame = (
  shape: CrumpleShape,
  state: { unfold: number; scale: number },
  transform: THREE.Matrix4,
  x: number,
  y: number,
) => {
  const at = (px: number, py: number) =>
    crumplePoint(shape, state, px, py, new THREE.Vector3()).applyMatrix4(transform);
  const anchor = at(x, y);
  const across = at(x + PROBE, y).sub(at(x - PROBE, y));
  const up = at(x, y + PROBE)
    .sub(anchor)
    .normalize();
  const normal = new THREE.Vector3().crossVectors(across, up).normalize();
  return { anchor, normal, up };
};

const PaperScene = ({ blurred, ...props }: CrumpledPaperRevealProps & { blurred: boolean }) => {
  const { print, paper, timing, hands, room, camera, light, lens } = props;
  const frame = useCurrentFrame() * props.motion.speed;
  const shape: CrumpleShape = paper;
  const appear = tween(
    frame,
    [timing.appearStart, timing.appearStart + timing.appearFrames],
    [0, 1],
    settle,
  );
  const unfold = tween(
    frame,
    [timing.unfoldStart, timing.unfoldStart + timing.unfoldFrames],
    [0, 1],
    smooth,
  );
  const push = tween(
    frame,
    [timing.pushStart, timing.pushStart + timing.pushFrames],
    [0, 1],
    glide,
  );
  const state = { unfold, scale: Math.max(0.001, appear) };
  const rest = THREE.MathUtils.smoothstep(unfold, 0, 1);
  const transform = new THREE.Matrix4().compose(
    new THREE.Vector3(0, THREE.MathUtils.lerp(-0.32, 0, rest), 0),
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.sin(frame / 21) * 0.3 * (1 - rest),
        (paper.spin + Math.sin(frame / 27) * 0.45) * (1 - rest) * (0.4 + 0.6 * appear),
        paper.tilt * rest + Math.sin(frame / 31) * 0.015,
      ),
    ),
    new THREE.Vector3(1, 1, 1),
  );
  const gripY = -paper.height / 2 + 0.02;
  const blendFor = (edgeX: number, mirrored: boolean): HandBlend => {
    const sheet = sheetFrame(shape, { ...state, unfold: 1 }, transform, edgeX, gripY);
    const anchor = sheet.anchor.clone().addScaledVector(sheet.up, hands.gripY);
    const grip = mirrored
      ? holdFrame(mirror(anchor), mirror(sheet.normal), mirror(sheet.up), hands, hands.gripDepth)
      : holdFrame(anchor, sheet.normal, sheet.up, hands, hands.gripDepth);
    return {
      rub: 1 - tween(frame, [timing.rubFrames * 0.7, timing.rubFrames + 16], [0, 1], smooth),
      hold: THREE.MathUtils.smoothstep(unfold, 0.12, 0.72),
      ballRadius: paper.ballRadius * appear,
      grip,
    };
  };
  const x = THREE.MathUtils.lerp(0, camera.endX, push);
  const y = THREE.MathUtils.lerp(camera.startY, camera.endY, push);
  const deskCamera = {
    x,
    y,
    z: THREE.MathUtils.lerp(camera.startDistance, camera.endDistance, push),
    targetX: x,
    targetY: y,
    targetZ: 0,
    fieldOfView: camera.fieldOfView,
    handheld: camera.handheld,
  };
  return (
    <DeskStage
      camera={deskCamera}
      light={light}
      frame={frame}
      lens={{ ...lens, screenGlow: 0 }}
      blurred={blurred}
      focus={[0, 0, 0]}
    >
      <mesh position={[0, 0, -room.wallDistance]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={room.wall} roughness={0.95} />
      </mesh>
      <group matrixAutoUpdate={false} matrix={transform}>
        <CrumpledSheet shape={shape} state={state} print={print} look={paper} />
      </group>
      {hands.show ? (
        <PaperHands
          frame={frame}
          look={hands}
          right={blendFor(hands.gripX, false)}
          left={blendFor(-hands.gripX, true)}
        />
      ) : null}
    </DeskStage>
  );
};

const CrumpledPaperReveal = (props: CrumpledPaperRevealProps) => {
  const { lens, camera } = props;
  const blurred = getRemotionEnvironment().isRendering && lens.motionBlur > 1;
  return (
    <PromoLayer look={props.look} motion={props.motion}>
      {blurred ? (
        <CameraMotionBlur samples={lens.motionBlur} shutterAngle={lens.shutterAngle}>
          <PaperScene {...props} blurred />
        </CameraMotionBlur>
      ) : (
        <PaperScene {...props} blurred={false} />
      )}
      <LensOverlay grain={camera.grain} vignette={camera.vignette} />
    </PromoLayer>
  );
};

export const crumpledPaperRevealScene: SceneModule = {
  id: 'crumpled-paper-reveal',
  component: CrumpledPaperReveal,
  render: (key) => (
    <Composition
      key={key}
      id="crumpled-paper-reveal"
      component={CrumpledPaperReveal}
      schema={crumpledPaperRevealSchema}
      defaultProps={crumpledPaperRevealDefaults}
      durationInFrames={crumpledPaperRevealMeta.durationInFrames}
      fps={crumpledPaperRevealMeta.fps}
      width={crumpledPaperRevealMeta.width}
      height={crumpledPaperRevealMeta.height}
    />
  ),
};

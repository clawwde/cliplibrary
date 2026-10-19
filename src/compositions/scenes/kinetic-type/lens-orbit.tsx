import { useMemo } from 'react';
import { Composition, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { type LensOrbitProps, lensOrbitDefaults, lensOrbitMeta, lensOrbitSchema } from '@/schemas';
import { PromoLayer } from '../../promo/promo-layer';
import { settle, smooth, TAU, tween } from '../../promo/timing';
import { highlightSet, normalize, wordsOf } from '../../promo/words';
import type { SceneModule } from '../../scene-module';
import { useGlassMaterial } from '../../type3d/glass-material';
import { useInkMaterial } from '../../type3d/ink-material';
import { driftCamera, TypeCanvas } from '../../type3d/type-canvas';
import { type GlobeWord, useGlobeTexture, useRingTexture } from '../../type3d/wrap-art';

const deg = (value: number) => (value / 180) * Math.PI;

const turnIndex = (
  frame: number,
  count: number,
  first: number,
  holdFrames: number,
  turnFrames: number,
): number => {
  let index = 0;
  for (let word = 1; word < count; word++) {
    const at = first + holdFrames * word + turnFrames * (word - 1);
    index += tween(frame, [at, at + turnFrames], [0, 1], smooth);
  }
  return index;
};

const Globe = ({
  words,
  props,
  spin,
  index,
  opacity,
}: {
  words: GlobeWord[];
  props: LensOrbitProps;
  spin: number;
  index: number;
  opacity: number;
}) => {
  const count = Math.max(1, words.length);
  const slots = words.map((_, word) => {
    const away = Math.abs(((((word - index) % count) + count + count / 2) % count) - count / 2);
    return 1 - props.edgeFade * tween(away, [0.3, 0.85], [0, 1], smooth);
  });
  const map = useGlobeTexture(words, props.weight, props.wordArc, props.wordBand);
  const glass = useGlassMaterial(props.glass, opacity);
  const ink = useInkMaterial(map, opacity, {
    edgeFade: props.edgeFade,
    slots,
    slotOffset: 0.25 - 0.5 / count,
  });
  const sphere = useMemo(() => new THREE.SphereGeometry(1, 128, 64), []);
  return (
    <group rotation={[0, spin, 0]} scale={props.radius}>
      <mesh geometry={sphere} material={glass} renderOrder={1} />
      <mesh geometry={sphere} material={ink} renderOrder={2} scale={1.004} />
    </group>
  );
};

const Ring = ({
  ring,
  weight,
  frame,
  opacity,
}: {
  ring: LensOrbitProps['ring'];
  weight: number;
  frame: number;
  opacity: number;
}) => {
  const aspect = (TAU * ring.radius) / ring.height;
  const map = useRingTexture(ring.text, ring.color, Math.min(weight, 700), aspect);
  const front = useInkMaterial(map, opacity);
  const back = useInkMaterial(map, opacity * ring.backOpacity, { side: THREE.BackSide });
  const band = useMemo(
    () => new THREE.CylinderGeometry(ring.radius, ring.radius, ring.height, 160, 1, true),
    [ring.radius, ring.height],
  );
  return (
    <group rotation={[deg(ring.tiltX), 0, deg(ring.tiltZ)]}>
      <group rotation={[0, deg(frame * ring.speed), 0]}>
        <mesh geometry={band} material={back} renderOrder={0} />
        <mesh geometry={band} material={front} renderOrder={3} />
      </group>
    </group>
  );
};

export const LensOrbit = (props: LensOrbitProps) => {
  const { look, motion, camera, delay, enterFrames, holdFrames, turnFrames, wobble } = props;
  const frame = useCurrentFrame() * motion.speed;
  const accented = highlightSet(props.highlight);
  const words = wordsOf(props.words.replace(/\n/g, ' ')).map((text) => ({
    text,
    color: accented.has(normalize(text)) ? look.accent : look.ink,
  }));
  const count = Math.max(1, words.length);
  const arrive = tween(frame, [delay, delay + enterFrames], [0, 1], settle);
  const reveal = tween(frame, [delay, delay + enterFrames * 0.55], [0, 1], smooth);
  const index = turnIndex(frame, count, delay + enterFrames, holdFrames, turnFrames);
  const spin = -(index / count) * TAU + (1 - arrive) * 1.1;
  const ringIn = tween(frame, [delay + 8, delay + enterFrames + 12], [0, 1], settle);
  const tilt = Math.sin(frame / 38) * wobble * 0.5;
  return (
    <PromoLayer look={look} motion={motion}>
      <TypeCanvas camera={driftCamera(frame, camera.distance, camera.fieldOfView, camera.drift)}>
        <group
          rotation={[tilt, 0, Math.cos(frame / 52) * wobble * 0.35]}
          scale={0.6 + 0.4 * arrive}
        >
          <Globe words={words} props={props} spin={spin} index={index} opacity={reveal} />
        </group>
        {props.ring.show ? (
          <group scale={0.82 + 0.18 * ringIn}>
            <Ring
              ring={props.ring}
              weight={props.weight}
              frame={frame - delay}
              opacity={tween(frame, [delay + 8, delay + enterFrames], [0, 1], smooth)}
            />
          </group>
        ) : null}
      </TypeCanvas>
    </PromoLayer>
  );
};

export const lensOrbitScene: SceneModule = {
  id: 'lens-orbit',
  component: LensOrbit,
  render: (key) => (
    <Composition
      key={key}
      id="lens-orbit"
      component={LensOrbit}
      schema={lensOrbitSchema}
      defaultProps={lensOrbitDefaults}
      durationInFrames={lensOrbitMeta.durationInFrames}
      fps={lensOrbitMeta.fps}
      width={lensOrbitMeta.width}
      height={lensOrbitMeta.height}
    />
  ),
};

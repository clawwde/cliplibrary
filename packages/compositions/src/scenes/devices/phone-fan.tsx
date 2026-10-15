import {
  type PhoneFanProps,
  phoneFanDefaults,
  phoneFanMeta,
  phoneFanSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { glide, TAU, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const ENTRY_ORDER = [1, 0, 2];

export const PhoneFan = ({
  phones,
  position,
  scale,
  spacing,
  fan,
  stagger,
  orbit,
  look,
  stage,
  motion,
}: PhoneFanProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const dolly = tween(raw, [0, durationInFrames], [1.1, 0.98], (t) => t);
  const sway = tween(raw, [0, durationInFrames], [-orbit, orbit], (t) => t);
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage
        stage={stage}
        dark={isDarkLook(look)}
        distanceScale={dolly}
        cameraOffset={[0, 0.3, 0]}
        target={[0, -0.35, 0]}
      >
        <group rotation={[0, sway, 0]} position={[position.x, position.y, position.z]}>
          {phones.map((entry, index) => {
            const delay = (ENTRY_ORDER[index] ?? index) * stagger;
            const arrive = tween(frame, [delay, delay + 72], [0, 1], glide);
            const offset = index - 1;
            const spin = (1 - arrive) * TAU * 0.12 * (offset === 0 ? 1 : Math.sign(offset));
            return (
              <group
                key={`${index}:${entry.screen}`}
                position={[
                  offset * spacing,
                  -(1 - arrive) * 8 + Math.sin(frame / 26 + index * 2) * motion.float,
                  offset === 0 ? 0.4 : -0.5,
                ]}
                rotation={[0.05 + (1 - arrive) * 0.35, -offset * fan + spin, 0]}
                scale={scale}
              >
                <PhoneModel phone={entry} reflections={stage.reflections} />
              </group>
            );
          })}
        </group>
      </Stage>
    </PromoLayer>
  );
};

export const phoneFanScene: SceneModule = {
  id: 'phone-fan',
  component: PhoneFan,
  render: (key) => (
    <Composition
      key={key}
      id="phone-fan"
      component={PhoneFan}
      schema={phoneFanSchema}
      defaultProps={phoneFanDefaults}
      durationInFrames={phoneFanMeta.durationInFrames}
      fps={phoneFanMeta.fps}
      width={phoneFanMeta.width}
      height={phoneFanMeta.height}
    />
  ),
};

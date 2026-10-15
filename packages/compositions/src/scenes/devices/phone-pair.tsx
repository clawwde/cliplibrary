import {
  type PhonePairProps,
  phonePairDefaults,
  phonePairMeta,
  phonePairSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { glide, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

export const PhonePair = ({
  phones,
  position,
  scale,
  gap,
  angle,
  stagger,
  look,
  stage,
  motion,
}: PhonePairProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const arrive = tween(frame, [0, 66], [0, 1], glide);
  const travel = Math.min(5, 2 + gap);
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={stage} dark={isDarkLook(look)}>
        {phones.map((entry, index) => {
          const side = index === 0 ? -1 : 1;
          return (
            <group
              key={`${index}:${entry.screen}`}
              position={[
                position.x + side * (gap + (1 - arrive) * travel),
                position.y +
                  (side * stagger) / 2 +
                  Math.sin(frame / 26 + index * 1.6) * motion.float,
                position.z + (index === 0 ? 0.3 : -0.5),
              ]}
              rotation={[0.05, -side * (angle + (1 - arrive) * 0.9), side * -0.04]}
              scale={scale}
            >
              <PhoneModel phone={entry} reflections={stage.reflections} />
            </group>
          );
        })}
      </Stage>
    </PromoLayer>
  );
};

export const phonePairScene: SceneModule = {
  id: 'phone-pair',
  component: PhonePair,
  render: (key) => (
    <Composition
      key={key}
      id="phone-pair"
      component={PhonePair}
      schema={phonePairSchema}
      defaultProps={phonePairDefaults}
      durationInFrames={phonePairMeta.durationInFrames}
      fps={phonePairMeta.fps}
      width={phonePairMeta.width}
      height={phonePairMeta.height}
    />
  ),
};

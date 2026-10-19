import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type PhoneScrollProps,
  phoneScrollDefaults,
  phoneScrollMeta,
  phoneScrollSchema,
} from '@/schemas';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const easeInOutSmooth = (t: number) => t * t * (3 - 2 * t);

export const PhoneScroll = ({
  phone,
  position,
  scale,
  lean,
  scrollAmount,
  look,
  stage,
  motion,
}: PhoneScrollProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const side = position.x < 0 ? -1 : 1;
  const arrive = tween(frame, [0, 60], [0, 1], settle);
  const scroll = tween(frame, [16, durationInFrames], [0, scrollAmount], easeInOutSmooth);
  return (
    <PromoLayer look={look} motion={motion} focusX={50 + side * 18}>
      <Stage stage={stage} dark={isDarkLook(look)}>
        <group
          position={[position.x, position.y - (1 - arrive) * 6, position.z]}
          rotation={[
            -0.16 + (1 - arrive) * 0.8,
            side * (-lean + (1 - arrive) * 0.6) + Math.sin(frame / 45) * 0.03,
            side * 0.08,
          ]}
          scale={scale}
        >
          <PhoneModel phone={phone} reflections={stage.reflections} scroll={scroll} />
        </group>
      </Stage>
    </PromoLayer>
  );
};

export const phoneScrollScene: SceneModule = {
  id: 'phone-scroll',
  component: PhoneScroll,
  render: (key) => (
    <Composition
      key={key}
      id="phone-scroll"
      component={PhoneScroll}
      schema={phoneScrollSchema}
      defaultProps={phoneScrollDefaults}
      durationInFrames={phoneScrollMeta.durationInFrames}
      fps={phoneScrollMeta.fps}
      width={phoneScrollMeta.width}
      height={phoneScrollMeta.height}
    />
  ),
};

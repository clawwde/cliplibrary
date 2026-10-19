import { Composition, useCurrentFrame } from 'remotion';
import {
  type FloatingCardsProps,
  floatingCardsDefaults,
  floatingCardsMeta,
  floatingCardsSchema,
} from '@/schemas';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { FloatingCard, Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

export const FloatingCards = ({
  cards,
  delay,
  stagger,
  look,
  stage,
  motion,
}: FloatingCardsProps) => {
  const frame = useCurrentFrame() * motion.speed;
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={{ ...stage, shadow: 0 }} dark={isDarkLook(look)}>
        {cards.map((card, index) => {
          const start = delay + index * stagger;
          const pop = tween(frame, [start, start + 32], [0, 1], settle);
          return (
            <group
              key={`${index}:${card.kind}`}
              position={[
                card.x,
                card.y - (1 - pop) * 0.4 + Math.sin(frame / 24 + index * 1.7) * motion.float,
                card.z,
              ]}
              rotation={[0.03, card.turn, 0]}
              scale={0.6 + pop * 0.4}
            >
              <FloatingCard card={card.kind} width={card.size} opacity={pop} />
            </group>
          );
        })}
      </Stage>
    </PromoLayer>
  );
};

export const floatingCardsScene: SceneModule = {
  id: 'floating-cards',
  component: FloatingCards,
  render: (key) => (
    <Composition
      key={key}
      id="floating-cards"
      component={FloatingCards}
      schema={floatingCardsSchema}
      defaultProps={floatingCardsDefaults}
      durationInFrames={floatingCardsMeta.durationInFrames}
      fps={floatingCardsMeta.fps}
      width={floatingCardsMeta.width}
      height={floatingCardsMeta.height}
    />
  ),
};

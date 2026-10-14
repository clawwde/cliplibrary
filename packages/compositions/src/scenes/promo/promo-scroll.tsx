import {
  type PromoScrollProps,
  promoScrollDefaults,
  promoScrollMeta,
  promoScrollSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { PhoneModel } from '../../promo/phone-model';
import { FloatingCard, Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { BodyCopy, Eyebrow, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const CARD_SLOTS: { offset: [number, number, number]; turn: number }[] = [
  { offset: [-1.75, 1.75, 1.1], turn: 0.28 },
  { offset: [-1.6, -1.75, 1.5], turn: 0.22 },
  { offset: [2.15, 0.35, 0.9], turn: -0.4 },
];

export const PromoScroll = ({
  eyebrow,
  headline,
  highlight,
  body,
  textSide,
  phone,
  phoneScale,
  scrollAmount,
  cards,
  cardSize,
  look,
  stage,
  motion,
}: PromoScrollProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const side = textSide === 'left' ? 1 : -1;
  const arrive = tween(frame, [0, 46], [0, 1], settle);
  const scroll = tween(frame, [34, durationInFrames - 6], [0, scrollAmount]);
  const phoneX = side * 2.7;
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} focusX={50 + side * 18} />
      <Stage stage={stage}>
        <group
          position={[phoneX, -0.05 - (1 - arrive) * 6, 0]}
          rotation={[
            -0.16 + (1 - arrive) * 0.8,
            side * (-0.34 + (1 - arrive) * 1.2) + Math.sin(frame / 45) * 0.03,
            side * 0.08,
          ]}
          scale={phoneScale}
        >
          <PhoneModel phone={phone} reflections={stage.reflections} scroll={scroll} />
        </group>
        {cards.map((card, index) => {
          const slot = CARD_SLOTS[index];
          if (slot === undefined) {
            return null;
          }
          const pop = tween(frame, [40 + index * 14, 68 + index * 14], [0, 1], settle);
          return (
            <group
              key={`${index}:${card}`}
              position={[
                phoneX + side * slot.offset[0],
                slot.offset[1] + Math.sin(frame / 24 + index * 1.7) * motion.float,
                slot.offset[2],
              ]}
              rotation={[0.03, side * slot.turn, 0]}
              scale={pop}
            >
              <FloatingCard card={card} width={cardSize} />
            </group>
          );
        })}
      </Stage>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: textSide === 'left' ? 'flex-start' : 'flex-end',
          padding: '0 150px',
        }}
      >
        <div style={{ width: 700, display: 'flex', flexDirection: 'column', gap: 30 }}>
          <FadeIn start={12}>
            <Eyebrow text={eyebrow} color={look.muted} accent={look.accent} />
          </FadeIn>
          <Headline
            text={headline}
            highlight={highlight}
            size={96}
            color={look.ink}
            accent={look.accent}
            start={18}
          />
          <FadeIn start={44}>
            <BodyCopy text={body} color={look.muted} width={520} />
          </FadeIn>
        </div>
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoScrollScene: SceneModule = {
  id: 'promo-scroll',
  component: PromoScroll,
  render: (key) => (
    <Composition
      key={key}
      id="promo-scroll"
      component={PromoScroll}
      schema={promoScrollSchema}
      defaultProps={promoScrollDefaults}
      durationInFrames={promoScrollMeta.durationInFrames}
      fps={promoScrollMeta.fps}
      width={promoScrollMeta.width}
      height={promoScrollMeta.height}
    />
  ),
};

import {
  type PromoHeroProps,
  promoHeroDefaults,
  promoHeroMeta,
  promoHeroSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { PhoneModel } from '../../promo/phone-model';
import { FloatingCard, Stage } from '../../promo/stage';
import { settle, TAU, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { BodyCopy, Eyebrow, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

export const PromoHero = ({
  eyebrow,
  headline,
  highlight,
  body,
  textSide,
  phone,
  phoneScale,
  spinTurns,
  tilt,
  card,
  look,
  stage,
  motion,
}: PromoHeroProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const side = textSide === 'left' ? 1 : -1;
  const arrive = tween(frame, [0, 64], [0, 1], settle);
  const x = side * (2.55 + (1 - arrive) * 4.5);
  const y = (1 - arrive) * -5.5 + Math.sin(frame / 32) * motion.float;
  const rotateY =
    -side * tilt - (1 - arrive) * side * spinTurns * TAU + Math.sin(frame / 48) * 0.03;
  const rotateX = 0.04 + (1 - arrive) * 0.45;
  const rotateZ = (1 - arrive) * -0.25 * side;
  const dolly = tween(raw, [0, durationInFrames], [1.04, 0.97], (t) => t);
  const cardIn = tween(frame, [70, 100], [0, 1], settle);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} focusX={50 + side * 18} />
      <Stage stage={stage} distanceScale={dolly}>
        <group position={[x, y, 0]} rotation={[rotateX, rotateY, rotateZ]} scale={phoneScale}>
          <PhoneModel phone={phone} reflections={stage.reflections} />
        </group>
        {card.show ? (
          <group
            position={[x - side * 1.75, -1.15 + Math.sin(frame / 24) * motion.float * 0.8, 1.25]}
            rotation={[0.04, -side * 0.28, 0]}
            scale={cardIn}
          >
            <FloatingCard card={card.kind} width={card.size} />
          </group>
        ) : null}
      </Stage>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: textSide === 'left' ? 'flex-start' : 'flex-end',
          padding: '0 170px',
        }}
      >
        <div style={{ width: 760, display: 'flex', flexDirection: 'column', gap: 34 }}>
          <FadeIn start={12}>
            <Eyebrow text={eyebrow} color={look.muted} accent={look.accent} />
          </FadeIn>
          <Headline
            text={headline}
            highlight={highlight}
            size={112}
            color={look.ink}
            accent={look.accent}
            start={18}
          />
          <FadeIn start={46}>
            <BodyCopy text={body} color={look.muted} />
          </FadeIn>
        </div>
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoHeroScene: SceneModule = {
  id: 'promo-hero',
  component: PromoHero,
  render: (key) => (
    <Composition
      key={key}
      id="promo-hero"
      component={PromoHero}
      schema={promoHeroSchema}
      defaultProps={promoHeroDefaults}
      durationInFrames={promoHeroMeta.durationInFrames}
      fps={promoHeroMeta.fps}
      width={promoHeroMeta.width}
      height={promoHeroMeta.height}
    />
  ),
};

import {
  type PromoTrioProps,
  promoTrioDefaults,
  promoTrioMeta,
  promoTrioSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, TAU, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const ENTRY_ORDER = [1, 0, 2];

export const PromoTrio = ({
  headline,
  highlight,
  phones,
  phoneScale,
  spacing,
  fan,
  stagger,
  orbit,
  look,
  stage,
  motion,
}: PromoTrioProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const dolly = tween(raw, [0, durationInFrames], [1.1, 0.98], (t) => t);
  const sway = tween(raw, [0, durationInFrames], [-orbit, orbit], (t) => t);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      <Stage stage={stage} distanceScale={dolly} cameraOffset={[0, 0.3, 0]} target={[0, -0.35, 0]}>
        <group rotation={[0, sway, 0]}>
          {phones.map((entry, index) => {
            const delay = (ENTRY_ORDER[index] ?? index) * stagger;
            const arrive = tween(frame, [delay, delay + 72], [0, 1], settle);
            const offset = index - 1;
            const spin = (1 - arrive) * TAU * 0.12 * (offset === 0 ? 1 : Math.sign(offset));
            return (
              <group
                key={`${index}:${entry.screen}`}
                position={[
                  offset * spacing,
                  -1.05 - (1 - arrive) * 6 + Math.sin(frame / 26 + index * 2) * motion.float,
                  offset === 0 ? 0.4 : -0.5,
                ]}
                rotation={[0.05 + (1 - arrive) * 0.35, -offset * fan + spin, 0]}
                scale={phoneScale}
              >
                <PhoneModel phone={entry} reflections={stage.reflections} />
              </group>
            );
          })}
        </group>
      </Stage>
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 84 }}>
        <Headline
          text={headline}
          highlight={highlight}
          size={88}
          color={look.ink}
          accent={look.accent}
          align="center"
          start={32}
        />
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoTrioScene: SceneModule = {
  id: 'promo-trio',
  component: PromoTrio,
  render: (key) => (
    <Composition
      key={key}
      id="promo-trio"
      component={PromoTrio}
      schema={promoTrioSchema}
      defaultProps={promoTrioDefaults}
      durationInFrames={promoTrioMeta.durationInFrames}
      fps={promoTrioMeta.fps}
      width={promoTrioMeta.width}
      height={promoTrioMeta.height}
    />
  ),
};

import {
  type PromoDuoProps,
  promoDuoDefaults,
  promoDuoMeta,
  promoDuoSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { Eyebrow, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

export const PromoDuo = ({
  eyebrow,
  headline,
  highlight,
  phones,
  phoneScale,
  gap,
  angle,
  look,
  stage,
  motion,
}: PromoDuoProps) => {
  const raw = useCurrentFrame();
  const frame = raw * motion.speed;
  const arrive = tween(frame, [0, 48], [0, 1], settle);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      <Stage stage={stage} dark>
        {phones.map((entry, index) => {
          const side = index === 0 ? -1 : 1;
          return (
            <group
              key={`${index}:${entry.screen}`}
              position={[
                side * (gap + (1 - arrive) * 7),
                (index === 0 ? -0.1 : 0.2) + Math.sin(frame / 26 + index * 1.6) * motion.float,
                index === 0 ? 0.3 : -0.5,
              ]}
              rotation={[0.05, -side * (angle + (1 - arrive) * 2.4), side * -0.04]}
              scale={phoneScale}
            >
              <PhoneModel phone={entry} reflections={stage.reflections} />
            </group>
          );
        })}
      </Stage>
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 70 }}>
        <FadeIn start={16}>
          <Eyebrow text={eyebrow} color={look.muted} accent={look.accent} />
        </FadeIn>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 76 }}>
        <Headline
          text={headline}
          highlight={highlight}
          size={76}
          color={look.ink}
          accent={look.accent}
          align="center"
          start={24}
        />
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const promoDuoScene: SceneModule = {
  id: 'promo-duo',
  component: PromoDuo,
  render: (key) => (
    <Composition
      key={key}
      id="promo-duo"
      component={PromoDuo}
      schema={promoDuoSchema}
      defaultProps={promoDuoDefaults}
      durationInFrames={promoDuoMeta.durationInFrames}
      fps={promoDuoMeta.fps}
      width={promoDuoMeta.width}
      height={promoDuoMeta.height}
    />
  ),
};

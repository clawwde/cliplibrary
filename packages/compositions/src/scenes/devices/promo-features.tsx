import {
  type PromoFeaturesProps,
  type PromoPhone,
  promoFeaturesDefaults,
  promoFeaturesMeta,
  promoFeaturesSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { bodyFont } from '../../promo/fonts';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, smooth, TAU, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { BodyCopy, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const SWAP = 44;

const sideOf = (beat: number): 1 | -1 => (beat % 2 === 0 ? 1 : -1);

interface PhonePose {
  x: number;
  rotateY: number;
  beat: number;
  mix: number;
}

const poseAt = (
  frame: number,
  beatLength: number,
  count: number,
  offset: number,
  spinTurns: number,
): PhonePose => {
  let pose: PhonePose = { x: offset * sideOf(0), rotateY: -0.36 * sideOf(0), beat: 0, mix: 0 };
  for (let beat = 0; beat < count - 1; beat++) {
    const start = (beat + 1) * beatLength - SWAP / 2;
    if (frame < start) {
      break;
    }
    const progress = tween(frame, [start, start + SWAP], [0, 1], smooth);
    const from = sideOf(beat);
    const to = sideOf(beat + 1);
    const side = from + (to - from) * progress;
    const done = progress >= 1;
    pose = {
      x: offset * side,
      rotateY: -0.36 * side + progress * TAU * Math.round(spinTurns) * from,
      beat: done ? beat + 1 : beat,
      mix: done ? 0 : tween(progress, [0.3, 0.7], [0, 1]),
    };
  }
  return pose;
};

const phoneFor = (
  feature: PromoFeaturesProps['features'][number] | undefined,
  finish: PromoFeaturesProps['finish'],
): PromoPhone => ({
  screen: feature?.screen ?? 'home',
  customScreen: feature?.customScreen ?? '',
  finish,
});

export const PromoFeatures = ({
  label,
  features,
  finish,
  phoneScale,
  offset,
  spinTurns,
  look,
  stage,
  motion,
}: PromoFeaturesProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const count = features.length;
  const beatLength = durationInFrames / count;
  const pose = poseAt(frame, beatLength, count, offset, spinTurns);
  const arrive = tween(frame, [0, 60], [0, 1], settle);
  const phone = phoneFor(features[pose.beat], finish);
  const nextPhone = pose.mix > 0 ? phoneFor(features[pose.beat + 1], finish) : undefined;
  const sway = Math.sin(frame / 36) * 0.13;
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} focusX={50 + sideOf(pose.beat) * 16} />
      <Stage stage={stage}>
        <group
          position={[pose.x, (1 - arrive) * -5 + Math.sin(frame / 28) * motion.float * 1.6, 0]}
          rotation={[0.06 + (1 - arrive) * 0.35, pose.rotateY + sway + (1 - arrive) * -0.7, 0]}
          scale={phoneScale}
        >
          <PhoneModel
            phone={phone}
            nextPhone={nextPhone}
            screenMix={pose.mix}
            reflections={stage.reflections}
          />
        </group>
      </Stage>
      {features.map((feature, beat) => {
        const start = beat === 0 ? 6 : beat * beatLength - SWAP / 2 + 20;
        const end = beat < count - 1 ? (beat + 1) * beatLength - SWAP / 2 - 6 : undefined;
        return (
          <div
            key={`${beat}:${feature.title}`}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: sideOf(beat) === 1 ? 170 : 1090,
              width: 660,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 28,
            }}
          >
            <FadeIn start={start} end={end}>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontSize: 19,
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: look.muted,
                }}
              >
                <span style={{ color: look.accent }}>{String(beat + 1).padStart(2, '0')}</span>
                {`  /  ${label}`}
              </div>
            </FadeIn>
            <Headline
              text={feature.title}
              size={104}
              color={look.ink}
              accent={look.accent}
              start={start + 4}
              end={end}
            />
            <FadeIn start={start + 14} end={end}>
              <BodyCopy text={feature.body} color={look.muted} width={540} />
            </FadeIn>
          </div>
        );
      })}
    </TransitionFrame>
  );
};

export const promoFeaturesScene: SceneModule = {
  id: 'promo-features',
  component: PromoFeatures,
  render: (key) => (
    <Composition
      key={key}
      id="promo-features"
      component={PromoFeatures}
      schema={promoFeaturesSchema}
      defaultProps={promoFeaturesDefaults}
      durationInFrames={promoFeaturesMeta.durationInFrames}
      fps={promoFeaturesMeta.fps}
      width={promoFeaturesMeta.width}
      height={promoFeaturesMeta.height}
    />
  ),
};

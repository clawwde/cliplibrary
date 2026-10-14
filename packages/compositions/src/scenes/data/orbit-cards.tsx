import {
  type OrbitCardsProps,
  orbitCardsDefaults,
  orbitCardsMeta,
  orbitCardsSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/SpaceGrotesk';
import {
  AbsoluteFill,
  Composition,
  Easing,
  interpolate,
  random,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import { GridBackdrop } from '../../kit/grid-backdrop';
import { lerp, ramp } from '../../kit/motion';
import { RiseChars } from '../../kit/rise-chars';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '700'],
  subsets: ['latin'],
});

const RADIUS = 760;
const CAMERA_PUSH = 420;
const CARD_WIDTH = 400;
const CARD_HEIGHT = 250;

type CardData = OrbitCardsProps['cards'][number];

const barsFor = (index: number) =>
  Array.from({ length: 8 }, (_, bar) => 2 + bar * 0.8 + random(`bars-${index}-${bar}`) * 2);

const normalize = (degrees: number) => ((((degrees + 180) % 360) + 360) % 360) - 180;

const Metric = ({ card, index }: { card: CardData; index: number }) => (
  <div
    style={{
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 28,
      padding: 28,
      boxSizing: 'border-box',
      background: 'linear-gradient(160deg, #181b29, #0e1019)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: `0 0 60px ${card.color}33`,
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: '#8b90a7' }}>
      {card.title}
    </div>
    <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1 }}>{card.value}</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 48 }}>
      {barsFor(index).map((bar, barIndex) => (
        <div
          key={barIndex}
          style={{
            flex: 1,
            height: `${bar * 10}%`,
            background: card.color,
            opacity: 0.35 + barIndex * 0.08,
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  </div>
);

export const OrbitCards = ({ headline, background, cards }: OrbitCardsProps) => {
  const frame = useCurrentFrame();
  const spin = interpolate(frame, [0, 95], [300, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const collapse = ramp(frame, 95, 140, Easing.inOut(Easing.cubic));
  const tilt = lerp(-14, 0, collapse);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <GridBackdrop color={background} line="rgba(255,255,255,0.05)" />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', perspective: 2600 }}>
        <div
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt}deg)`,
          }}
        >
          {cards.map((card, index) => {
            const angle = normalize(index * 45 + spin);
            const radians = (angle * Math.PI) / 180;
            const column = index % 4;
            const row = Math.floor(index / 4);
            const x = lerp(RADIUS * Math.sin(radians), (column - 1.5) * 440, collapse);
            const y = lerp(0, (row - 0.5) * 290 - 120, collapse);
            const z = lerp(RADIUS * Math.cos(radians) - RADIUS + CAMERA_PUSH, 0, collapse);
            const rotation = lerp(angle, 0, collapse);
            const depthFade = 0.4 + 0.6 * ((Math.cos(radians) + 1) / 2);
            const opacity = lerp(depthFade, 1, collapse) * ramp(frame, index * 3, index * 3 + 15);
            return (
              <div
                key={card.title}
                style={{
                  position: 'absolute',
                  left: -CARD_WIDTH / 2,
                  top: -CARD_HEIGHT / 2,
                  opacity,
                  backfaceVisibility: 'hidden',
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotation}deg)`,
                }}
              >
                <Metric card={card} index={index} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <Sequence name="Headline" from={140}>
        <RiseChars
          text={headline}
          start={0}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 90,
            fontSize: 110,
            fontWeight: 700,
            color: '#fff',
          }}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const orbitCardsScene: SceneModule = {
  id: 'orbit-cards',
  component: OrbitCards,
  render: (key) => (
    <Composition
      key={key}
      id="orbit-cards"
      component={OrbitCards}
      schema={orbitCardsSchema}
      defaultProps={orbitCardsDefaults}
      durationInFrames={orbitCardsMeta.durationInFrames}
      fps={orbitCardsMeta.fps}
      width={orbitCardsMeta.width}
      height={orbitCardsMeta.height}
    />
  ),
};

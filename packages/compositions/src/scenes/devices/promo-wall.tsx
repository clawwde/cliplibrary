import {
  type PromoWallProps,
  promoWallDefaults,
  promoWallMeta,
  promoWallSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { PhoneModel } from '../../promo/phone-model';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import { BodyCopy, FadeIn, Headline } from '../../promo/typography';
import type { SceneModule } from '../../scene-module';

const COLUMN_GAP = 1.95;
const ROW_GAP = 3.7;

export const PromoWall = ({
  headline,
  highlight,
  subline,
  showCaption,
  screens,
  rows,
  columns,
  tilt,
  twist,
  drift,
  finish,
  look,
  stage,
  motion,
}: PromoWallProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const rowCount = Math.max(1, Math.round(rows));
  const columnCount = Math.max(1, Math.round(columns));
  const middle = (columnCount - 1) / 2;
  const travel = tween(raw, [0, durationInFrames], [-drift, drift], (t) => t);
  const veil = tween(frame, [40, 70], [0, 1]);
  return (
    <TransitionFrame motion={motion}>
      <Backdrop look={look} />
      <Stage stage={stage} backdropZ={-7}>
        <group rotation={[tilt, 0.18, twist]} position={[0, 0, -1]}>
          {Array.from({ length: rowCount }, (_, row) => {
            const direction = row % 2 === 0 ? 1 : -1;
            const y = ((rowCount - 1) / 2 - row) * ROW_GAP;
            return Array.from({ length: columnCount }, (_cell, column) => {
              const delay = (Math.abs(column - middle) + row) * 2.5;
              const arrive = tween(frame, [delay, delay + 56], [0, 1], settle);
              const screen = screens[(row * 5 + column) % screens.length] ?? 'home';
              return (
                <group
                  key={`${row}:${column}`}
                  position={[
                    (column - middle) * COLUMN_GAP + direction * travel,
                    y - (1 - arrive) * 2.2,
                    (1 - arrive) * -3,
                  ]}
                  rotation={[(1 - arrive) * 0.45, (1 - arrive) * 0.3, 0]}
                  scale={0.9 + arrive * 0.1}
                >
                  <PhoneModel
                    phone={{ screen, customScreen: '', finish }}
                    reflections={stage.reflections}
                  />
                </group>
              );
            });
          })}
        </group>
      </Stage>
      {showCaption ? (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <AbsoluteFill
            style={{
              opacity: veil,
              background: `radial-gradient(38% 34% at 50% 50%, ${look.background}f2 0%, ${look.background}c0 45%, ${look.background}00 100%)`,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
            <Headline
              text={headline}
              highlight={highlight}
              size={124}
              color={look.ink}
              accent={look.accent}
              align="center"
              start={46}
            />
            <FadeIn start={62}>
              <BodyCopy text={subline} color={look.muted} width={900} align="center" size={32} />
            </FadeIn>
          </div>
        </AbsoluteFill>
      ) : null}
    </TransitionFrame>
  );
};

export const promoWallScene: SceneModule = {
  id: 'promo-wall',
  component: PromoWall,
  render: (key) => (
    <Composition
      key={key}
      id="promo-wall"
      component={PromoWall}
      schema={promoWallSchema}
      defaultProps={promoWallDefaults}
      durationInFrames={promoWallMeta.durationInFrames}
      fps={promoWallMeta.fps}
      width={promoWallMeta.width}
      height={promoWallMeta.height}
    />
  ),
};

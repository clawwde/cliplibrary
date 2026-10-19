import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { type PhoneWallProps, phoneWallDefaults, phoneWallMeta, phoneWallSchema } from '@/schemas';
import { PhoneModel } from '../../promo/phone-model';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { Stage } from '../../promo/stage';
import { settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const COLUMN_GAP = 1.95;
const ROW_GAP = 3.7;

export const PhoneWall = ({
  screens,
  finish,
  rows,
  columns,
  tilt,
  twist,
  drift,
  look,
  stage,
  motion,
}: PhoneWallProps) => {
  const raw = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const frame = raw * motion.speed;
  const rowCount = Math.max(1, Math.round(rows));
  const columnCount = Math.max(1, Math.round(columns));
  const middle = (columnCount - 1) / 2;
  const travel = tween(raw, [0, durationInFrames], [-drift, drift], (t) => t);
  return (
    <PromoLayer look={look} motion={motion}>
      <Stage stage={stage} dark={isDarkLook(look)} backdropZ={-7}>
        <group rotation={[tilt, 0.18, twist]} position={[0, 0, -1]}>
          {Array.from({ length: rowCount }, (_row, row) => {
            const direction = row % 2 === 0 ? 1 : -1;
            const y = ((rowCount - 1) / 2 - row) * ROW_GAP;
            return Array.from({ length: columnCount }, (_cell, column) => {
              const delay = (Math.abs(column - middle) + row) * 2.5;
              const arrive = tween(frame, [0, 56 + delay], [0, 1], settle);
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
    </PromoLayer>
  );
};

export const phoneWallScene: SceneModule = {
  id: 'phone-wall',
  component: PhoneWall,
  render: (key) => (
    <Composition
      key={key}
      id="phone-wall"
      component={PhoneWall}
      schema={phoneWallSchema}
      defaultProps={phoneWallDefaults}
      durationInFrames={phoneWallMeta.durationInFrames}
      fps={phoneWallMeta.fps}
      width={phoneWallMeta.width}
      height={phoneWallMeta.height}
    />
  ),
};

import {
  SPLIT_FLAP_COLUMNS,
  type SplitFlapProps,
  splitFlapDefaults,
  splitFlapMeta,
  splitFlapSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/BarlowCondensed';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { ramp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['700'], subsets: ['latin'] });

const SET = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const STEP_FRAMES = 2;
const CELL_WIDTH = 124;
const CELL_HEIGHT = 176;

const charAt = (index: number): string => SET[index] ?? ' ';

const Half = ({ char, bottom, color }: { char: string; bottom?: boolean; color: string }) => (
  <div
    style={{
      height: CELL_HEIGHT / 2,
      overflow: 'hidden',
      color,
      background: bottom
        ? 'linear-gradient(#17171a, #1e1e22)'
        : 'linear-gradient(#26262b, #1b1b1f)',
      borderRadius: bottom ? '0 0 12px 12px' : '12px 12px 0 0',
    }}
  >
    <div
      style={{
        height: CELL_HEIGHT,
        lineHeight: `${CELL_HEIGHT}px`,
        textAlign: 'center',
        fontSize: 158,
        transform: bottom ? `translateY(${-CELL_HEIGHT / 2}px)` : undefined,
      }}
    >
      {char}
    </div>
  </div>
);

const Cell = ({ char, start, color }: { char: string; start: number; color: string }) => {
  const frame = useCurrentFrame();
  const target = Math.max(0, SET.indexOf(char));
  const first = Math.max(0, target - 16);
  const steps = target - first;
  const elapsed = (frame - start) / STEP_FRAMES;

  let previous = ' ';
  let current = ' ';
  let phase = 1;
  if (frame >= start && elapsed >= steps) {
    previous = charAt(target);
    current = charAt(target);
  } else if (frame >= start) {
    const step = Math.floor(elapsed);
    previous = charAt(first + step);
    current = charAt(first + step + 1);
    phase = elapsed - step;
  }

  const topAngle = phase < 0.5 ? -phase * 180 : -90;
  const bottomAngle = phase < 0.5 ? 90 : 90 - (phase - 0.5) * 180;

  return (
    <div style={{ position: 'relative', width: CELL_WIDTH, height: CELL_HEIGHT, perspective: 700 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Half char={current} color={color} />
      </div>
      <div style={{ position: 'absolute', top: CELL_HEIGHT / 2, left: 0, right: 0 }}>
        <Half char={previous} bottom color={color} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transformOrigin: 'bottom',
          transform: `rotateX(${topAngle}deg)`,
          opacity: phase < 0.5 ? 1 : 0,
        }}
      >
        <Half char={previous} color={color} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: CELL_HEIGHT / 2,
          left: 0,
          right: 0,
          transformOrigin: 'top',
          transform: `rotateX(${bottomAngle}deg)`,
          opacity: phase < 0.5 ? 0 : 1,
        }}
      >
        <Half char={current} bottom color={color} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: CELL_HEIGHT / 2 - 1,
          left: 0,
          right: 0,
          height: 3,
          background: '#050506',
        }}
      />
    </div>
  );
};

export const SplitFlap = ({ header, headerColor, rows }: SplitFlapProps) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: 'radial-gradient(circle at 50% 40%, #1c1a16, #09090a 70%)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          color: headerColor,
          fontSize: 40,
          letterSpacing: 10,
          marginBottom: 20,
          opacity: ramp(frame, 0, 15),
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            background: headerColor,
            opacity: frame % 30 < 15 ? 1 : 0.2,
          }}
        />
        {header}
      </div>
      {rows.map((row, rowIndex) => (
        <div key={row.text} style={{ display: 'flex', gap: 10 }}>
          {row.text
            .toUpperCase()
            .padEnd(SPLIT_FLAP_COLUMNS, ' ')
            .split('')
            .map((char, column) => (
              <Cell
                key={column}
                char={char}
                color={row.color}
                start={10 + column * 3 + rowIndex * 14}
              />
            ))}
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const splitFlapScene: SceneModule = {
  id: 'split-flap',
  component: SplitFlap,
  render: (key) => (
    <Composition
      key={key}
      id="split-flap"
      component={SplitFlap}
      schema={splitFlapSchema}
      defaultProps={splitFlapDefaults}
      durationInFrames={splitFlapMeta.durationInFrames}
      fps={splitFlapMeta.fps}
      width={splitFlapMeta.width}
      height={splitFlapMeta.height}
    />
  ),
};

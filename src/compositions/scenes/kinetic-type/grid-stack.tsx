import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { type GridStackProps, gridStackDefaults, gridStackMeta, gridStackSchema } from '@/schemas';
import { PromoLayer } from '../../promo/promo-layer';
import { accelerate, settle, smooth, tween } from '../../promo/timing';
import { highlightSet, normalize, wordsOf } from '../../promo/words';
import type { SceneModule } from '../../scene-module';
import { type Pose, TrailedWord } from '../../type3d/trailed-word';
import { driftCamera, TypeCanvas, viewHeight } from '../../type3d/type-canvas';
import { WarpGrid } from '../../type3d/warp-grid';
import { wordAspect } from '../../type3d/word-art';

const RISE = 2.8;
const SINK = 5;
const LIFT = 2.2;
const PUSH = 4.5;
const EXIT_STAGGER = 1;

interface StackWord {
  text: string;
  color: string;
  height: number;
  width: number;
  y: number;
}

const stackBeat = (
  line: string,
  { stackWidth, maxWordHeight, maxStackHeight, gap, weight }: GridStackProps,
  color: (word: string) => string,
): StackWord[] => {
  const natural = wordsOf(line).map((text) => {
    const aspect = wordAspect({ text, color: color(text), weight });
    return { text, aspect, height: Math.min(stackWidth / aspect, maxWordHeight) };
  });
  const gaps = natural
    .slice(1)
    .map((word, index) => gap * Math.min(natural[index]?.height ?? word.height, word.height));
  const total =
    natural.reduce((sum, word) => sum + word.height, 0) +
    gaps.reduce((sum, value) => sum + value, 0);
  const fit = Math.min(1, maxStackHeight / total);
  let cursor = (total * fit) / 2;
  return natural.map((word, index) => {
    const height = word.height * fit;
    const y = cursor - height / 2;
    cursor -= height + (gaps[index] ?? 0) * fit;
    return { text: word.text, color: color(word.text), height, width: height * word.aspect, y };
  });
};

const Stack = (props: GridStackProps & { frame: number }) => {
  const { text, highlight, look, frame, delay, beatFrames, enterFrames, exitFrames, stagger } =
    props;
  const accented = highlightSet(highlight);
  const color = (word: string) => (accented.has(normalize(word)) ? look.accent : look.ink);
  const beats = text
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => stackBeat(line, props, color));
  return (
    <>
      {beats.map((words, beat) => {
        const start = delay + beat * beatFrames;
        const isLast = beat === beats.length - 1;
        const leaveAt = start + beatFrames - exitFrames - (words.length - 1) * EXIT_STAGGER + 4;
        if (frame < start - 1 || (!isLast && frame > start + beatFrames + 8)) {
          return null;
        }
        const side = beat % 2 === 0 ? 1 : -1;
        const sway = tween(frame, [start, start + beatFrames + exitFrames], [1.25, 0.8], smooth);
        const pose =
          (word: StackWord, index: number) =>
          (at: number): Pose => {
            const arrive = tween(
              at,
              [start + index * stagger, start + index * stagger + enterFrames],
              [0, 1],
              settle,
            );
            const leaveStart = leaveAt + index * EXIT_STAGGER;
            const leave = isLast
              ? 0
              : tween(at, [leaveStart, leaveStart + exitFrames], [0, 1], accelerate);
            const fadeOut = isLast
              ? 0
              : tween(at, [leaveStart + exitFrames * 0.5, leaveStart + exitFrames], [0, 1], smooth);
            return {
              position: [
                0,
                word.y - (1 - arrive) * RISE + leave * LIFT,
                -(1 - arrive) * SINK + leave * PUSH,
              ],
              rotation: [(1 - arrive) * 1.05 - leave * 0.5, 0, 0],
              opacity:
                tween(
                  at,
                  [start + index * stagger + 2, start + index * stagger + enterFrames * 0.6],
                  [0, 1],
                  smooth,
                ) *
                (1 - fadeOut),
            };
          };
        return (
          <group
            key={`${beat}:${words.map((word) => word.text).join(' ')}`}
            rotation={[
              0,
              ((side * props.turn * sway) / 180) * Math.PI,
              ((side * props.tilt) / 180) * Math.PI,
            ]}
          >
            {words.map((word, index) => (
              <TrailedWord
                key={`${index}:${word.text}`}
                art={{ text: word.text, color: word.color, weight: props.weight }}
                height={word.height}
                bend={(props.bend * word.width) / props.stackWidth}
                frame={frame}
                pose={pose(word, index)}
                trail={props.trail}
              />
            ))}
          </group>
        );
      })}
    </>
  );
};

export const GridStack = (props: GridStackProps) => {
  const { grid, camera, look, motion } = props;
  const frame = useCurrentFrame() * motion.speed;
  const { width, height } = useVideoConfig();
  const span = viewHeight(camera.distance - grid.depth, camera.fieldOfView) * 1.4;
  return (
    <PromoLayer look={look} motion={motion}>
      <TypeCanvas camera={driftCamera(frame, camera.distance, camera.fieldOfView, camera.drift)}>
        {grid.show && look.showBackdrop ? (
          <WarpGrid
            width={(span * width) / height}
            height={span}
            spacing={grid.spacing}
            bulge={grid.bulge}
            lineWidth={grid.lineWidth}
            color={grid.color}
            opacity={1}
            z={grid.depth + Math.sin(frame / 46) * 0.35}
          />
        ) : null}
        <Stack {...props} frame={frame} />
      </TypeCanvas>
    </PromoLayer>
  );
};

export const gridStackScene: SceneModule = {
  id: 'grid-stack',
  component: GridStack,
  render: (key) => (
    <Composition
      key={key}
      id="grid-stack"
      component={GridStack}
      schema={gridStackSchema}
      defaultProps={gridStackDefaults}
      durationInFrames={gridStackMeta.durationInFrames}
      fps={gridStackMeta.fps}
      width={gridStackMeta.width}
      height={gridStackMeta.height}
    />
  ),
};

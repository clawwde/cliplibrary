import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { type WordFieldProps, wordFieldDefaults, wordFieldMeta, wordFieldSchema } from '@/schemas';
import { PromoLayer } from '../../promo/promo-layer';
import { settle, smooth, TAU, tween } from '../../promo/timing';
import { highlightSet, normalize } from '../../promo/words';
import type { SceneModule } from '../../scene-module';
import { driftCamera, TypeCanvas } from '../../type3d/type-canvas';
import { wordAspect } from '../../type3d/word-art';
import { WordPlane } from '../../type3d/word-plane';
import { seeded } from '../../unveil/random';

const deg = (value: number) => (value / 180) * Math.PI;

interface FieldWord {
  text: string;
  color: string;
  x: number;
  y: number;
  height: number;
  order: number;
  phase: number;
}

const layoutField = (props: WordFieldProps, color: (word: string) => string): FieldWord[] => {
  const list = props.words
    .split('\n')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
  if (list.length === 0) {
    return [];
  }
  const random = seeded(props.seed);
  const cellWidth = props.width / props.columns;
  const cellDepth = props.depth / props.rows;
  const cells = Array.from({ length: props.columns * props.rows }, (_, index) => {
    const row = Math.floor(index / props.columns);
    const column = index % props.columns;
    const text = list[(index * 7 + row) % list.length] ?? '';
    const aspect = wordAspect({ text, color: color(text), weight: props.weight });
    const wanted = props.minSize + (props.maxSize - props.minSize) * random();
    const height = Math.min(wanted, (cellWidth * 0.92) / aspect);
    const stagger = row % 2 === 0 ? 0 : 0.5;
    const x =
      (column + 0.5 + stagger - props.columns / 2) * cellWidth +
      (random() - 0.5) * props.jitter * (cellWidth - height * aspect);
    const y =
      (row + 0.5 - props.rows / 2) * cellDepth + (random() - 0.5) * props.jitter * cellDepth * 0.5;
    return {
      text,
      color: color(text),
      x,
      y,
      height,
      phase: random() * TAU,
      distance: Math.hypot(x, y * 1.2) + random() * 0.8,
    };
  });
  const ranked = [...cells].sort((a, b) => a.distance - b.distance);
  return cells.map((cell) => ({ ...cell, order: ranked.indexOf(cell) }));
};

const Field = ({ props, frame }: { props: WordFieldProps; frame: number }) => {
  const accented = highlightSet(props.highlight);
  const color = (word: string) =>
    accented.has(normalize(word)) ? props.look.accent : props.look.ink;
  const words = layoutField(props, color);
  return (
    <>
      {words.map((word, index) => {
        const start = props.delay + word.order * props.stagger;
        const arrive = tween(frame, [start, start + props.riseFrames], [0, 1], settle);
        const opacity = tween(frame, [start, start + props.riseFrames * 0.55], [0, 1], smooth);
        const bob = Math.sin(frame / 34 + word.phase) * props.float * arrive;
        return (
          <group
            key={`${index}:${word.text}`}
            position={[word.x, word.y, (1 - arrive) * -props.rise + bob]}
            rotation={[(1 - arrive) * -0.9, 0, 0]}
          >
            <WordPlane
              art={{ text: word.text, color: word.color, weight: props.weight }}
              height={word.height}
              opacity={opacity}
            />
          </group>
        );
      })}
    </>
  );
};

export const WordField = (props: WordFieldProps) => {
  const { look, motion, camera } = props;
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const turn = props.turn + props.spin * tween(frame, [0, durationInFrames], [-0.5, 0.5], smooth);
  return (
    <PromoLayer look={look} motion={motion}>
      <TypeCanvas camera={driftCamera(frame, camera.distance, camera.fieldOfView, camera.drift)}>
        <group rotation={[-deg(props.tilt), 0, 0]}>
          <group rotation={[0, 0, deg(turn)]}>
            <Field props={props} frame={frame} />
          </group>
        </group>
      </TypeCanvas>
    </PromoLayer>
  );
};

export const wordFieldScene: SceneModule = {
  id: 'word-field',
  component: WordField,
  render: (key) => (
    <Composition
      key={key}
      id="word-field"
      component={WordField}
      schema={wordFieldSchema}
      defaultProps={wordFieldDefaults}
      durationInFrames={wordFieldMeta.durationInFrames}
      fps={wordFieldMeta.fps}
      width={wordFieldMeta.width}
      height={wordFieldMeta.height}
    />
  ),
};

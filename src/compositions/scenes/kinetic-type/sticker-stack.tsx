import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type StickerStackProps,
  stickerStackDefaults,
  stickerStackMeta,
  stickerStackSchema,
} from '@/schemas';
import { PromoLayer } from '../../promo/promo-layer';
import { settle, smooth, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';
import { driftCamera, TypeCanvas } from '../../type3d/type-canvas';
import { type WordArt, wordAspect } from '../../type3d/word-art';
import { WordPlane } from '../../type3d/word-plane';
import { seeded } from '../../unveil/random';

const ROW_SIZES = [2, 3];
const BADGE_SCALE = 1.05;

interface Sticker {
  art: WordArt;
  height: number;
  width: number;
  x: number;
  y: number;
  angle: number;
  kick: number;
}

const stickerArt = (text: string, index: number, props: StickerStackProps): WordArt => {
  const badge = text.length <= 2;
  const accent = props.look.accent;
  const shadow = props.shadow;
  if (badge) {
    return index % 2 === 0
      ? {
          text,
          color: props.paperInk,
          weight: props.weight,
          shape: 'circle',
          fill: props.paper,
          shadow,
        }
      : {
          text,
          color: props.accentInk,
          weight: props.weight,
          shape: 'circle',
          fill: accent,
          shadow,
        };
  }
  switch (index % 3) {
    case 0:
      return {
        text,
        color: props.accentInk,
        weight: props.weight,
        shape: 'pill',
        fill: accent,
        shadow,
      };
    case 1:
      return {
        text,
        color: props.paperInk,
        weight: props.weight,
        shape: 'pill',
        fill: props.paper,
        shadow,
      };
    default:
      return {
        text,
        color: props.paper,
        weight: props.weight,
        shape: 'pill',
        fill: props.look.background,
        stroke: props.paper,
        shadow,
      };
  }
};

const stickerRows = (stickers: string): string[][] => {
  const texts = stickers
    .split('\n')
    .map((text) => text.trim())
    .filter((text) => text.length > 0);
  const rows: string[][] = [];
  let cursor = 0;
  while (cursor < texts.length) {
    const size = ROW_SIZES[rows.length % ROW_SIZES.length] ?? 2;
    rows.push(texts.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
};

const layoutStickers = (props: StickerStackProps): Sticker[] => {
  const random = seeded(props.seed);
  const rows = stickerRows(props.stickers);
  let index = 0;
  const placed = rows.flatMap((row, rowIndex) => {
    const items = row.map((text) => {
      const art = stickerArt(text, index, props);
      index += 1;
      const height = props.size * (art.shape === 'circle' ? BADGE_SCALE : 1);
      return { art, height, width: height * wordAspect(art) };
    });
    const used = items.reduce((sum, item) => sum + item.width, 0);
    const gap = Math.max(0, (props.width - used) / Math.max(1, items.length));
    const shift = (rowIndex % 2 === 0 ? -1 : 1) * gap * 0.25 * props.jitter;
    let x = -props.width / 2 + gap / 2 + shift;
    return items.map((item) => {
      const center = x + item.width / 2 + (random() - 0.5) * gap * props.jitter;
      x += item.width + gap;
      return {
        art: item.art,
        height: item.height,
        width: item.width,
        x: center,
        y: -rowIndex * props.rowPitch + (random() - 0.5) * props.rowPitch * 0.3 * props.jitter,
        angle: ((random() - 0.5) * 2 * props.spin * Math.PI) / 180,
        kick: ((random() < 0.5 ? -1 : 1) * props.kick * Math.PI) / 180,
      };
    });
  });
  const left = Math.min(...placed.map((sticker) => sticker.x - sticker.width / 2));
  const right = Math.max(...placed.map((sticker) => sticker.x + sticker.width / 2));
  const middle = placed.length > 0 ? (left + right) / 2 : 0;
  return placed.map((sticker) => ({ ...sticker, x: sticker.x - middle }));
};

const Pile = ({ props, frame }: { props: StickerStackProps; frame: number }) => {
  const stickers = layoutStickers(props);
  return (
    <>
      {stickers.map((sticker, index) => {
        const start = props.delay + index * props.stagger;
        if (frame < start) {
          return null;
        }
        const arrive = tween(frame, [start, start + props.slapFrames], [0, 1], settle);
        const opacity = tween(frame, [start, start + props.slapFrames * 0.55], [0, 1], smooth);
        return (
          <group
            key={`${index}:${sticker.art.text}`}
            position={[sticker.x, sticker.y, index * 0.012 + (1 - arrive) * props.drop]}
            rotation={[0, 0, sticker.angle + (1 - arrive) * sticker.kick]}
          >
            <WordPlane
              art={sticker.art}
              height={sticker.height}
              opacity={opacity}
              renderOrder={index}
            />
          </group>
        );
      })}
    </>
  );
};

export const StickerStack = (props: StickerStackProps) => {
  const { look, motion, camera } = props;
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const rows = stickerRows(props.stickers).length;
  const middle = -((rows - 1) * props.rowPitch) / 2;
  const travel = tween(frame, [0, durationInFrames], [0.5, -0.5], smooth) * props.pan;
  return (
    <PromoLayer look={look} motion={motion}>
      <TypeCanvas
        camera={driftCamera(frame, camera.distance, camera.fieldOfView, camera.drift, [
          0,
          middle + travel,
          0,
        ])}
      >
        <Pile props={props} frame={frame} />
      </TypeCanvas>
    </PromoLayer>
  );
};

export const stickerStackScene: SceneModule = {
  id: 'sticker-stack',
  component: StickerStack,
  render: (key) => (
    <Composition
      key={key}
      id="sticker-stack"
      component={StickerStack}
      schema={stickerStackSchema}
      defaultProps={stickerStackDefaults}
      durationInFrames={stickerStackMeta.durationInFrames}
      fps={stickerStackMeta.fps}
      width={stickerStackMeta.width}
      height={stickerStackMeta.height}
    />
  ),
};

import {
  type SplitGridProps,
  splitGridDefaults,
  splitGridMeta,
  splitGridSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { bodyFont } from '../../promo/fonts';
import { withAlpha } from '../../promo/glow';
import { PromoLayer } from '../../promo/promo-layer';
import { settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

export const SplitGrid = ({
  columns,
  rows,
  lineWidth,
  lineOpacity,
  showLabels,
  labelSize,
  delay,
  openFrames,
  stagger,
  look,
  motion,
}: SplitGridProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { width, height } = useVideoConfig();
  const color = withAlpha(look.ink, lineOpacity);
  const vertical = Array.from(
    { length: columns - 1 },
    (_, index) => (width * (index + 1)) / columns,
  );
  const horizontal = Array.from({ length: rows - 1 }, (_, index) => (height * (index + 1)) / rows);
  const openAt = (order: number) =>
    tween(frame, [delay + order * stagger, delay + order * stagger + openFrames], [0, 1], settle);
  const labelsAt = delay + openFrames * 0.6 + (vertical.length + horizontal.length) * stagger;
  return (
    <PromoLayer look={look} motion={motion}>
      <AbsoluteFill>
        {vertical.map((x, index) => (
          <div
            key={`v${x}`}
            style={{
              position: 'absolute',
              left: x - lineWidth / 2,
              top: 0,
              width: lineWidth,
              height,
              background: color,
              transform: `scaleY(${openAt(index).toFixed(5)})`,
            }}
          />
        ))}
        {horizontal.map((y, index) => (
          <div
            key={`h${y}`}
            style={{
              position: 'absolute',
              top: y - lineWidth / 2,
              left: 0,
              height: lineWidth,
              width,
              background: color,
              transform: `scaleX(${openAt(vertical.length + index).toFixed(5)})`,
            }}
          />
        ))}
        {showLabels
          ? Array.from({ length: rows * columns }, (_, cell) => (
              <div
                key={`cell${cell}`}
                style={{
                  position: 'absolute',
                  left: ((cell % columns) * width) / columns + labelSize * 2,
                  top: (Math.floor(cell / columns) * height) / rows + labelSize * 1.6,
                  fontFamily: bodyFont,
                  fontSize: labelSize,
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  color: look.muted,
                  opacity: tween(
                    frame,
                    [labelsAt + cell * 3, labelsAt + cell * 3 + 14],
                    [0, 1],
                    settle,
                  ),
                }}
              >
                {String(cell + 1).padStart(2, '0')}
              </div>
            ))
          : null}
      </AbsoluteFill>
    </PromoLayer>
  );
};

export const splitGridScene: SceneModule = {
  id: 'split-grid',
  component: SplitGrid,
  render: (key) => (
    <Composition
      key={key}
      id="split-grid"
      component={SplitGrid}
      schema={splitGridSchema}
      defaultProps={splitGridDefaults}
      durationInFrames={splitGridMeta.durationInFrames}
      fps={splitGridMeta.fps}
      width={splitGridMeta.width}
      height={splitGridMeta.height}
    />
  ),
};

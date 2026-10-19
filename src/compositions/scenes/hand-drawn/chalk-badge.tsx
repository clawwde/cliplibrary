import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type ChalkBadgeProps,
  chalkBadgeDefaults,
  chalkBadgeMeta,
  chalkBadgeSchema,
} from '@/schemas';
import { Badge } from '../../connectors/badge';
import { Caption } from '../../connectors/caption';
import { ChalkLayer } from '../../connectors/chalk-board';
import { badgePhase } from '../../connectors/phase';
import type { SceneModule } from '../../scene-module';

const FILTER_ID = 'chalk-badge-ink';

export const ChalkBadge = ({
  badge,
  x,
  y,
  scale,
  delay,
  timing,
  caption,
  captionSize,
  captionColor,
  captionFrames,
  chalk,
  look,
  motion,
}: ChalkBadgeProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { width, height, durationInFrames } = useVideoConfig();
  const { draw, erase } = badgePhase(frame, delay, timing);
  return (
    <ChalkLayer look={look} motion={motion} chalk={chalk} filterId={FILTER_ID}>
      <Caption
        text={caption}
        size={captionSize}
        color={captionColor}
        frame={frame}
        start={0}
        end={durationInFrames * motion.speed - captionFrames * caption.length * 0.5 - 2}
        letterFrames={captionFrames}
      />
      <Badge
        badge={badge}
        chalk={chalk}
        draw={draw}
        erase={erase}
        x={(x / 100) * width}
        y={(y / 100) * height}
        scale={scale}
        id="chalk-badge"
        filterId={FILTER_ID}
      />
    </ChalkLayer>
  );
};

export const chalkBadgeScene: SceneModule = {
  id: 'chalk-badge',
  component: ChalkBadge,
  render: (key) => (
    <Composition
      key={key}
      id="chalk-badge"
      component={ChalkBadge}
      schema={chalkBadgeSchema}
      defaultProps={chalkBadgeDefaults}
      durationInFrames={chalkBadgeMeta.durationInFrames}
      fps={chalkBadgeMeta.fps}
      width={chalkBadgeMeta.width}
      height={chalkBadgeMeta.height}
    />
  ),
};

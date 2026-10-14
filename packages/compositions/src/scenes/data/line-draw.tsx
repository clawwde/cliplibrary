import {
  type LineDrawProps,
  lineDrawDefaults,
  lineDrawMeta,
  lineDrawSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Sora';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['600', '800'], subsets: ['latin'] });

const W = 1000;
const H = 460;
const PAD_X = 36;
const PAD_Y = 48;

const buildPaths = (points: number[]) => {
  const n = points.length;
  const innerW = W - PAD_X * 2;
  const innerH = H - PAD_Y * 2;
  const x = (index: number) => PAD_X + (index / (n - 1)) * innerW;
  const y = (value: number) => PAD_Y + (1 - value / 100) * innerH;
  const line = points
    .map(
      (value, index) => `${index === 0 ? 'M' : 'L'} ${x(index).toFixed(1)} ${y(value).toFixed(1)}`,
    )
    .join(' ');
  const baseline = (H - PAD_Y).toFixed(1);
  const area = `${line} L ${x(n - 1).toFixed(1)} ${baseline} L ${x(0).toFixed(1)} ${baseline} Z`;
  return { line, area };
};

export const LineDraw = ({
  title,
  background,
  color,
  line,
  fill,
  points,
  thickness,
  speed,
  easing,
}: LineDrawProps) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  const paths = buildPaths(points);
  const titleIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill
      style={{ background, fontFamily, padding: 120, flexDirection: 'column', gap: 48 }}
    >
      <div
        style={{
          color,
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -2,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -24}px)`,
        }}
      >
        {title}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', flex: 1 }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={paths.area} fill={fill} opacity={interpolate(draw, [0.1, 1], [0, 0.22])} />
        <path
          d={paths.line}
          fill="none"
          stroke={line}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const lineDrawScene: SceneModule = {
  id: 'line-draw',
  component: LineDraw,
  render: (key) => (
    <Composition
      key={key}
      id="line-draw"
      component={LineDraw}
      schema={lineDrawSchema}
      defaultProps={lineDrawDefaults}
      durationInFrames={lineDrawMeta.durationInFrames}
      fps={lineDrawMeta.fps}
      width={lineDrawMeta.width}
      height={lineDrawMeta.height}
    />
  ),
};

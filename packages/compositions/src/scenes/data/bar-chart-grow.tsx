import {
  type BarChartGrowProps,
  barChartGrowDefaults,
  barChartGrowMeta,
  barChartGrowSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Inter';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500', '800'], subsets: ['latin'] });

type Bar = BarChartGrowProps['bars'][number];

const Column = ({
  bar,
  max,
  start,
  speed,
  color,
  easing,
}: {
  bar: Bar;
  max: number;
  start: number;
  speed: number;
  color: string;
  easing: BarChartGrowProps['easing'];
}) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [start, start + speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  const height = (bar.value / max) * 100 * grow;
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        gap: 18,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 800, color, opacity: grow }}>
        {Math.round(bar.value * grow)}
      </div>
      <div
        style={{
          width: '72%',
          height: `${height}%`,
          background: `linear-gradient(${bar.color}cc, ${bar.color})`,
          borderRadius: 16,
          boxShadow: `0 20px 50px ${bar.color}44`,
        }}
      />
      <div style={{ fontSize: 34, fontWeight: 500, color, opacity: 0.7 }}>{bar.label}</div>
    </div>
  );
};

export const BarChartGrow = ({
  title,
  background,
  color,
  bars,
  speed,
  stagger,
  easing,
}: BarChartGrowProps) => {
  const frame = useCurrentFrame();
  const max = Math.max(1, ...bars.map((bar) => bar.value));
  const titleIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill
      style={{ background, fontFamily, padding: 120, flexDirection: 'column', gap: 64 }}
    >
      <div
        style={{
          color,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -2,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * -24}px)`,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'flex-end' }}>
        {bars.map((bar, index) => (
          <Column
            key={index}
            bar={bar}
            max={max}
            start={index * stagger}
            speed={speed}
            color={color}
            easing={easing}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const barChartGrowScene: SceneModule = {
  id: 'bar-chart-grow',
  component: BarChartGrow,
  render: (key) => (
    <Composition
      key={key}
      id="bar-chart-grow"
      component={BarChartGrow}
      schema={barChartGrowSchema}
      defaultProps={barChartGrowDefaults}
      durationInFrames={barChartGrowMeta.durationInFrames}
      fps={barChartGrowMeta.fps}
      width={barChartGrowMeta.width}
      height={barChartGrowMeta.height}
    />
  ),
};

import {
  type DonutProgressProps,
  donutProgressDefaults,
  donutProgressMeta,
  donutProgressSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Manrope';
import { AbsoluteFill, Composition, interpolate, useCurrentFrame } from 'remotion';
import { resolveEasing } from '../../kit/easing';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['600', '800'], subsets: ['latin'] });

export const DonutProgress = ({
  label,
  background,
  track,
  ring,
  color,
  percent,
  thickness,
  speed,
  easing,
}: DonutProgressProps) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, speed], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: resolveEasing(easing),
  });
  const radius = 100 - thickness / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const shown = (percent / 100) * draw;
  return (
    <AbsoluteFill
      style={{ background, fontFamily, justifyContent: 'center', alignItems: 'center', gap: 56 }}
    >
      <div style={{ position: 'relative', width: 620, height: 620 }}>
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }} aria-hidden="true">
          <circle cx={100} cy={100} r={radius} fill="none" stroke={track} strokeWidth={thickness} />
          <circle
            cx={100}
            cy={100}
            r={radius}
            fill="none"
            stroke={ring}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - shown)}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color,
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: -4,
          }}
        >
          {Math.round(percent * draw)}%
        </div>
      </div>
      <div style={{ color, opacity: 0.75, fontSize: 48, fontWeight: 600 }}>{label}</div>
    </AbsoluteFill>
  );
};

export const donutProgressScene: SceneModule = {
  id: 'donut-progress',
  component: DonutProgress,
  render: (key) => (
    <Composition
      key={key}
      id="donut-progress"
      component={DonutProgress}
      schema={donutProgressSchema}
      defaultProps={donutProgressDefaults}
      durationInFrames={donutProgressMeta.durationInFrames}
      fps={donutProgressMeta.fps}
      width={donutProgressMeta.width}
      height={donutProgressMeta.height}
    />
  ),
};

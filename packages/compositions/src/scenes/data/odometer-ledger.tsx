import {
  type OdometerLedgerProps,
  odometerLedgerDefaults,
  odometerLedgerMeta,
  odometerLedgerSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';
import {
  AbsoluteFill,
  Composition,
  Easing,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { lerp, ramp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '800'],
  subsets: ['latin'],
});

const FONT_SIZE = 260;
const LINE_HEIGHT = FONT_SIZE * 1.1;
const CHAR_WIDTH = FONT_SIZE * 0.6;
const POINT_COUNT = 80;
const CHART_WIDTH = 1700;
const CHART_HEIGHT = 380;

const POINTS = Array.from({ length: POINT_COUNT }, (_, index) => {
  const t = index / (POINT_COUNT - 1);
  const value = 0.15 + 0.7 * t ** 1.3 + 0.06 * Math.sin(index * 0.7) + 0.04 * Math.sin(index * 1.9);
  return { x: t * CHART_WIDTH, y: CHART_HEIGHT - 10 - value * (CHART_HEIGHT - 30) };
});

const LINE_PATH = POINTS.map((point, index) => `${index ? 'L' : 'M'}${point.x} ${point.y}`).join(
  ' ',
);
const AREA_PATH = `${LINE_PATH} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`;

const Reel = ({ digit, index }: { digit: number; index: number }) => {
  const frame = useCurrentFrame();
  const progress = ramp(frame, 8 + index * 6, 78 + index * 6, Easing.out(Easing.cubic));
  const offset = progress * (20 + digit);
  return (
    <div style={{ height: LINE_HEIGHT, width: CHAR_WIDTH, overflow: 'hidden' }}>
      <div style={{ transform: `translateY(${-offset * LINE_HEIGHT}px)` }}>
        {Array.from({ length: 30 }, (_, value) => (
          <div
            key={value}
            style={{ height: LINE_HEIGHT, lineHeight: `${LINE_HEIGHT}px`, textAlign: 'center' }}
          >
            {value % 10}
          </div>
        ))}
      </div>
    </div>
  );
};

const Pill = ({
  label,
  value,
  start,
  background,
  color,
}: {
  label: string;
  value: string;
  start: number;
  background: string;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - start, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        background,
        color,
        borderRadius: 22,
        padding: '20px 34px',
        opacity: Math.min(1, enter),
        transform: `translateX(${(1 - enter) * 240}px)`,
        minWidth: 360,
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 3, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 58, fontWeight: 800 }}>{value}</div>
    </div>
  );
};

export const OdometerLedger = ({
  label,
  amount,
  paper,
  ink,
  accent,
  pills,
  ticker,
}: OdometerLedgerProps) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, 30, 130, Easing.inOut(Easing.cubic));
  const position = draw * (POINT_COUNT - 1);
  const lower = Math.floor(position);
  const upper = Math.min(POINT_COUNT - 1, lower + 1);
  const start = POINTS[lower] ?? POINTS[0];
  const end = POINTS[upper] ?? POINTS[0];
  const anchor = start ?? { x: 0, y: 0 };
  const next = end ?? anchor;
  const dotX = lerp(anchor.x, next.x, position - lower);
  const dotY = lerp(anchor.y, next.y, position - lower);

  return (
    <AbsoluteFill style={{ backgroundColor: paper, fontFamily, color: ink }}>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 100,
          fontSize: 30,
          letterSpacing: 6,
          opacity: ramp(frame, 0, 20),
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 150,
          display: 'flex',
          fontSize: FONT_SIZE,
          fontWeight: 800,
        }}
      >
        {amount.split('').map((char, index) =>
          /\d/.test(char) ? (
            <Reel key={index} digit={Number(char)} index={index} />
          ) : (
            <div
              key={index}
              style={{
                width: CHAR_WIDTH,
                lineHeight: `${LINE_HEIGHT}px`,
                textAlign: 'center',
                opacity: ramp(frame, 4 + index * 6, 24 + index * 6),
              }}
            >
              {char}
            </div>
          ),
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 110,
          top: 110,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {pills.map((pill, index) => (
          <Pill
            key={pill.label}
            label={pill.label}
            value={pill.value}
            start={70 + index * 12}
            background={index === 0 ? accent : ink}
            color={index === 0 ? ink : paper}
          />
        ))}
      </div>
      <svg
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        style={{ position: 'absolute', left: 110, bottom: 130, overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ledger-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.35" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
          <clipPath id="ledger-reveal">
            <rect width={dotX} height={CHART_HEIGHT} />
          </clipPath>
        </defs>
        <path d={AREA_PATH} fill="url(#ledger-fill)" clipPath="url(#ledger-reveal)" />
        <path
          d={LINE_PATH}
          pathLength={1}
          fill="none"
          stroke={ink}
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        <circle
          cx={dotX}
          cy={dotY}
          r={16}
          fill={accent}
          stroke={ink}
          strokeWidth={5}
          opacity={ramp(frame, 32, 40)}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 72,
          background: ink,
          color: paper,
          overflow: 'hidden',
          fontSize: 28,
          lineHeight: '72px',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ transform: `translateX(${-frame * 5}px)` }}>{ticker.repeat(8)}</div>
      </div>
    </AbsoluteFill>
  );
};

export const odometerLedgerScene: SceneModule = {
  id: 'odometer-ledger',
  component: OdometerLedger,
  render: (key) => (
    <Composition
      key={key}
      id="odometer-ledger"
      component={OdometerLedger}
      schema={odometerLedgerSchema}
      defaultProps={odometerLedgerDefaults}
      durationInFrames={odometerLedgerMeta.durationInFrames}
      fps={odometerLedgerMeta.fps}
      width={odometerLedgerMeta.width}
      height={odometerLedgerMeta.height}
    />
  ),
};

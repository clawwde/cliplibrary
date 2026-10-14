import type { ProductDemoProps } from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/Inter';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const { fontFamily } = loadFont('normal', { weights: ['600', '800'], subsets: ['latin'] });

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const BARS = [38, 52, 45, 70, 62, 88, 96];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Title = ({ name, tagline }: { name: string; tagline: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 24 }}>
      <div
        style={{
          fontSize: 150,
          fontWeight: 800,
          color: '#fff',
          transform: `scale(${0.8 + pop * 0.2})`,
          opacity: pop,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 48,
          color: '#a5b4fc',
          opacity: interpolate(frame, [15, 35], [0, 1], clamp),
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
};

const Card = ({
  label,
  value,
  suffix,
  delay,
  dark,
}: {
  label: string;
  value: number;
  suffix: string;
  delay: number;
  dark: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  const count = interpolate(frame, [delay, delay + 50], [0, value], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        flex: 1,
        background: '#fff',
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 10px 40px rgba(30,27,75,0.12)',
        opacity: enter,
        transform: `translateY(${(1 - enter) * 40}px)`,
      }}
    >
      <div style={{ fontSize: 28, color: '#64748b' }}>{label}</div>
      <div style={{ fontSize: 84, fontWeight: 800, color: dark }}>
        {Math.round(count).toLocaleString()}
        {suffix}
      </div>
    </div>
  );
};

const Dashboard = ({
  heading,
  accent,
  dark,
}: {
  heading: string;
  accent: string;
  dark: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clickAt = 150;
  const cursorX = interpolate(frame, [90, clickAt], [1500, 1700], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(frame, [90, clickAt], [800, 112], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const press = interpolate(frame, [clickAt, clickAt + 4, clickAt + 8], [0, 1, 0], clamp);
  const toast = spring({ frame: frame - clickAt - 6, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: '#eef2ff', padding: 80, gap: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: dark }}>{heading}</div>
        <div
          style={{
            background: accent,
            color: '#fff',
            fontSize: 32,
            fontWeight: 600,
            padding: '18px 40px',
            borderRadius: 16,
            transform: `scale(${1 - press * 0.06})`,
          }}
        >
          Share report
        </div>
      </div>
      <div style={{ display: 'flex', gap: 40 }}>
        <Card label="Visitors" value={48210} suffix="" delay={10} dark={dark} />
        <Card label="Conversion" value={12} suffix="%" delay={20} dark={dark} />
        <Card label="Revenue" value={9840} suffix="" delay={30} dark={dark} />
      </div>
      <div
        style={{
          flex: 1,
          background: '#fff',
          borderRadius: 24,
          padding: 40,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 32,
          boxShadow: '0 10px 40px rgba(30,27,75,0.12)',
        }}
      >
        {BARS.map((height, index) => {
          const grow = spring({ frame: frame - 45 - index * 5, fps, config: { damping: 18 } });
          const day = DAYS[index] ?? `d${index}`;
          return (
            <div
              key={day}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                gap: 12,
                fontSize: 26,
                color: '#64748b',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${height * grow * 0.85}%`,
                  background: `linear-gradient(${accent}aa, ${accent})`,
                  borderRadius: 12,
                }}
              />
              {day}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 80,
          bottom: 80,
          background: dark,
          color: '#fff',
          fontSize: 32,
          padding: '24px 40px',
          borderRadius: 16,
          opacity: toast,
          transform: `translateY(${(1 - toast) * 30}px)`,
        }}
      >
        Link copied. Anyone can view.
      </div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        style={{ position: 'absolute', left: cursorX, top: cursorY }}
        aria-hidden="true"
      >
        <path d="M3 2l7 19 3-8 8-3z" fill="#111" stroke="#fff" strokeWidth="1.5" />
      </svg>
    </AbsoluteFill>
  );
};

const CallToAction = ({ callToAction, url }: { callToAction: string; url: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 32 }}>
      <div
        style={{
          fontSize: 110,
          fontWeight: 800,
          color: '#fff',
          transform: `scale(${0.85 + pop * 0.15})`,
          opacity: pop,
        }}
      >
        {callToAction}
      </div>
      <div
        style={{
          fontSize: 44,
          color: '#a5b4fc',
          opacity: interpolate(frame, [15, 35], [0, 1], clamp),
        }}
      >
        {url}
      </div>
    </AbsoluteFill>
  );
};

export const ProductDemo = ({
  name,
  tagline,
  heading,
  callToAction,
  url,
  accent,
  dark,
}: ProductDemoProps) => (
  <AbsoluteFill style={{ fontFamily, background: `linear-gradient(135deg, ${dark}, ${accent})` }}>
    <Sequence name="Title" from={0} durationInFrames={90}>
      <Title name={name} tagline={tagline} />
    </Sequence>
    <Sequence name="Dashboard" from={90} durationInFrames={180}>
      <Dashboard heading={heading} accent={accent} dark={dark} />
    </Sequence>
    <Sequence name="CallToAction" from={270} durationInFrames={90}>
      <CallToAction callToAction={callToAction} url={url} />
    </Sequence>
  </AbsoluteFill>
);

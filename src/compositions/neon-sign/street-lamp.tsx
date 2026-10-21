import type { NeonSignFlickerProps } from '@/schemas';

type Lamp = NeonSignFlickerProps['lamp'];

const HEAD_WIDTH = 56;
const ARM_RADIUS = 44;
const ARM_RISE = 7;
const TOP_MARGIN = 40;

interface LampGeometry {
  poleX: number;
  armY: number;
  headX: number;
  lensY: number;
}

const geometry = (lamp: Lamp): LampGeometry => {
  const poleX = lamp.poleWidth / 2;
  const armY = -lamp.poleHeight - ARM_RISE;
  return { poleX, armY, headX: poleX + lamp.reach, lensY: armY + 7 };
};

const fade = (color: string, amount: number): string =>
  `color-mix(in oklab, ${color} ${(amount * 100).toFixed(1)}%, transparent)`;

const LightCone = ({ lamp, glow, at }: { lamp: Lamp; glow: number; at: LampGeometry }) => {
  const spread = lamp.coneSpread;
  const lean = lamp.coneLean;
  const offset = Math.max(0, -lean);
  const half = HEAD_WIDTH * 0.3;
  const shape = `polygon(${spread + offset - half}px 0px, ${spread + offset + half}px 0px, ${offset + lean + spread * 2}px 100%, ${offset + lean}px 100%)`;
  const stops = [
    [0, 0.45],
    [0.15, 0.8],
    [0.35, 1],
    [0.55, 0.8],
    [0.75, 0.36],
    [0.9, 0.1],
    [1, 0],
  ]
    .map(([stop = 0, alpha = 0]) => `${fade(lamp.light, alpha)} ${(stop * 100).toFixed(0)}%`)
    .join(', ');
  return (
    <div
      style={{
        position: 'absolute',
        left: at.headX - spread - offset,
        top: at.lensY,
        width: spread * 2 + Math.abs(lean),
        height: lamp.coneLength,
        filter: `blur(${(spread * 0.3).toFixed(1)}px)`,
        opacity: Math.min(1, glow),
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: shape,
          background: `linear-gradient(180deg, ${stops})`,
        }}
      />
    </div>
  );
};

export const StreetLamp = ({ lamp, level }: { lamp: Lamp; level: number }) => {
  const glow = level * lamp.brightness;
  const at = geometry(lamp);
  const height = lamp.poleHeight + ARM_RISE + TOP_MARGIN;
  const y = (local: number): number => local + height;
  const armEnd = at.headX - HEAD_WIDTH * 0.42;
  const left = at.headX - HEAD_WIDTH * 0.5;
  const right = at.headX + HEAD_WIDTH * 0.5;
  const pole = [
    `M ${at.poleX} ${y(0)}`,
    `V ${y(at.armY + ARM_RADIUS)}`,
    `Q ${at.poleX} ${y(at.armY + 2)} ${at.poleX + ARM_RADIUS} ${y(at.armY)}`,
    `L ${armEnd} ${y(at.armY - 1)}`,
  ].join(' ');
  const head = [
    `M ${left} ${y(at.armY - 3)}`,
    `C ${left + 4} ${y(at.armY - 12)} ${at.headX + 6} ${y(at.armY - 13)} ${right} ${y(at.armY - 2)}`,
    `C ${right + 2} ${y(at.armY + 3)} ${right - 4} ${y(at.lensY + 1)} ${right - 10} ${y(at.lensY)}`,
    `L ${left + 8} ${y(at.lensY)}`,
    `C ${left + 2} ${y(at.lensY - 1)} ${left - 1} ${y(at.armY + 2)} ${left} ${y(at.armY - 3)}`,
    'Z',
  ].join(' ');
  return (
    <div style={{ position: 'absolute', left: 0, bottom: 0, width: 0, height: 0 }}>
      <LightCone lamp={lamp} glow={glow} at={at} />
      <div
        style={{
          position: 'absolute',
          left: at.headX - 46,
          top: at.lensY - 18,
          width: 92,
          height: 46,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${fade(lamp.light, 0.9)}, transparent)`,
          filter: 'blur(8px)',
          opacity: 0.6 * Math.min(1, glow),
        }}
      />
      <svg
        role="img"
        aria-label="Street lamp"
        width={right + 4}
        height={height}
        style={{ position: 'absolute', left: 0, top: -height, overflow: 'visible' }}
      >
        <defs>
          <linearGradient
            id="neon-sign-pole"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2={lamp.poleWidth}
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor={lamp.poleShade} />
            <stop offset="0.45" stopColor={lamp.pole} />
            <stop offset="1" stopColor={lamp.poleShade} />
          </linearGradient>
          <linearGradient id="neon-sign-head" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={lamp.head} />
            <stop offset="1" stopColor={lamp.poleShade} />
          </linearGradient>
        </defs>
        <path d={pole} fill="none" stroke="url(#neon-sign-pole)" strokeWidth={lamp.poleWidth} />
        <path d={head} fill="url(#neon-sign-head)" />
        <ellipse
          cx={at.headX + 1}
          cy={y(at.lensY) - 1}
          rx={HEAD_WIDTH * 0.3}
          ry={2.2}
          fill={lamp.light}
          opacity={0.15 + 0.35 * Math.min(1, glow)}
        />
      </svg>
    </div>
  );
};

import { useId } from 'react';

const WAVE =
  'M -4 44 C 10 44, 15 66, 28 66 C 41 66, 42 34, 55 34 C 68 34, 69 60, 81 60 C 92 60, 95 50, 104 47';

export const BrandMark = ({
  size,
  disc,
  discDeep,
  wave,
  draw = 1,
  discOpacity = 1,
}: {
  size: number;
  disc: string;
  discDeep?: string;
  wave: string;
  draw?: number;
  discOpacity?: number;
}) => {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const fill = discDeep === undefined ? disc : `url(#mark-fill-${id})`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`mark-clip-${id}`}>
          <circle cx={50} cy={50} r={50} />
        </clipPath>
        {discDeep === undefined ? null : (
          <radialGradient id={`mark-fill-${id}`} cx="30%" cy="22%" r="85%">
            <stop offset="0%" stopColor={disc} />
            <stop offset="100%" stopColor={discDeep} />
          </radialGradient>
        )}
      </defs>
      <circle cx={50} cy={50} r={50} fill={fill} opacity={discOpacity} />
      <g clipPath={`url(#mark-clip-${id})`}>
        <path
          d={WAVE}
          pathLength={1}
          fill="none"
          stroke={wave}
          strokeWidth={13}
          strokeLinecap="butt"
          strokeDasharray="1 1"
          strokeDashoffset={1 - draw}
        />
      </g>
    </svg>
  );
};

export const BrandLabel = ({
  kicker,
  name,
  size,
  color,
  font,
}: {
  kicker: string;
  name: string;
  size: number;
  color: string;
  font: string;
}) => (
  <div style={{ fontFamily: font, color, lineHeight: 1, whiteSpace: 'nowrap' }}>
    {kicker === '' ? null : (
      <div style={{ fontSize: size * 0.36, fontWeight: 600, letterSpacing: '0.04em' }}>
        {kicker}
      </div>
    )}
    <div
      style={{
        fontSize: size,
        fontWeight: 600,
        letterSpacing: '0.02em',
        marginTop: size * 0.06,
      }}
    >
      {name}
    </div>
  </div>
);

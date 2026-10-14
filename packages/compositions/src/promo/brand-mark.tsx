import { settle, smooth, tween } from './timing';

const RING = 2 * Math.PI * 38;

export const BrandMark = ({
  color,
  frame,
  size,
  start = 4,
}: {
  color: string;
  frame: number;
  size: number;
  start?: number;
}) => {
  const draw = tween(frame, [start, start + 36], [0, 1], smooth);
  const dot = tween(frame, [start + 22, start + 42], [0, 1], settle);
  const angle = -Math.PI / 4 + (1 - dot) * Math.PI * 1.2;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={RING}
        strokeDashoffset={RING * (1 - draw)}
        transform="rotate(-90 50 50)"
      />
      <circle
        cx={50 + Math.cos(angle) * 38}
        cy={50 + Math.sin(angle) * 38}
        r={9 * dot}
        fill={color}
      />
    </svg>
  );
};

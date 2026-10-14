import { AbsoluteFill } from 'remotion';

export const GridBackdrop = ({
  color,
  line,
  size = 60,
}: {
  color: string;
  line: string;
  size?: number;
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: color,
      backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }}
  >
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  </AbsoluteFill>
);

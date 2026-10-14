import type { CSSProperties } from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { clamp01 } from './motion';

export const RiseChars = ({
  text,
  start,
  stagger = 1.6,
  style,
}: {
  text: string;
  start: number;
  stagger?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        whiteSpace: 'pre',
        perspective: 900,
        ...style,
      }}
    >
      {text.split('').map((char, index) => {
        const raw = spring({
          frame: frame - start - index * stagger,
          fps,
          config: { damping: 16, stiffness: 120 },
        });
        const progress = clamp01(raw);
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity: progress,
              filter: `blur(${(1 - progress) * 12}px)`,
              transform: `translateY(${(1 - raw) * 60}px) rotateX(${(1 - progress) * 80}deg)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

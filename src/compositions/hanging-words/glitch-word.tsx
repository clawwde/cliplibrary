import type { CSSProperties } from 'react';

const STEPS = 3;

const stepped = (value: number): number =>
  value <= 0 ? 0 : value >= 1 ? 1 : Math.ceil(value * STEPS) / STEPS;

const unit = (value: number): number => Math.min(1, Math.max(0, value));

const letterReveal = (index: number, progress: number): CSSProperties => {
  const mode = index % 3;
  if (progress >= 1) {
    return {};
  }
  if (progress <= 0) {
    return { opacity: 0 };
  }
  if (mode === 1) {
    const local = unit((progress - 0.15) / 0.85);
    return { opacity: local * local };
  }
  if (mode === 0) {
    const local = unit((progress - 0.1) / 0.75);
    const shown = stepped(local);
    return {
      opacity: 0.55 + 0.45 * shown,
      clipPath: `inset(0 0 0 ${((1 - shown) * 62).toFixed(1)}%)`,
    };
  }
  const shown = stepped(unit(progress / 0.7));
  return {
    clipPath: `inset(0 0 ${((1 - shown) * 85).toFixed(1)}% ${((1 - shown) * 55).toFixed(1)}%)`,
  };
};

const letterExit = (index: number, progress: number): CSSProperties => {
  if (progress <= 0) {
    return {};
  }
  if (progress >= 1) {
    return { opacity: 0 };
  }
  const cut = progress * (0.75 + (index % 2) * 0.15);
  return {
    clipPath: `inset(${(cut * 100).toFixed(1)}% 0 0 0)`,
    transform: `translateY(${(progress * 14).toFixed(1)}%)`,
  };
};

export const GlitchWord = ({
  word,
  reveal,
  exit,
}: {
  word: string;
  reveal: number;
  exit: number;
}) => (
  <>
    {Array.from(word).map((letter, index) => (
      <span
        key={`${index}:${letter}`}
        style={{
          display: 'inline-block',
          whiteSpace: 'pre',
          ...letterReveal(index, reveal),
          ...letterExit(index, exit),
        }}
      >
        {letter}
      </span>
    ))}
  </>
);

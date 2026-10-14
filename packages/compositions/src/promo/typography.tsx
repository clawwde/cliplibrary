import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import { bodyFont, displayFont } from './fonts';
import { accelerate, settle, tween } from './timing';

interface RevealWindow {
  start: number;
  end?: number | undefined;
}

const revealState = (frame: number, { start, end }: RevealWindow, delay: number) => {
  const enter = tween(frame, [start + delay, start + delay + 26], [0, 1], settle);
  const exit =
    end === undefined
      ? 0
      : tween(frame, [end + delay * 0.4, end + delay * 0.4 + 14], [0, 1], accelerate);
  return { enter, exit };
};

const wordsOf = (line: string): string[] => line.split(' ').filter((word) => word.length > 0);

const normalize = (word: string): string => word.replace(/[.,!?;:]/g, '').toLowerCase();

export interface HeadlineProps extends RevealWindow {
  text: string;
  size: number;
  color: string;
  accent: string;
  highlight?: string;
  align?: 'left' | 'center' | 'right';
  weight?: number;
  stagger?: number;
}

export const Headline = ({
  text,
  size,
  color,
  accent,
  highlight = '',
  align = 'left',
  weight = 600,
  stagger = 5,
  start,
  end,
}: HeadlineProps) => {
  const frame = useCurrentFrame();
  const accented = new Set(wordsOf(highlight).map(normalize));
  return (
    <div
      style={{
        fontFamily: displayFont,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.02,
        letterSpacing: '-0.045em',
        color,
        textAlign: align,
      }}
    >
      {text.split('\n').map((line, lineIndex) => {
        const { enter, exit } = revealState(frame, { start, end }, lineIndex * stagger);
        return (
          <div
            key={`${lineIndex}:${line}`}
            style={{ overflow: 'hidden', paddingBottom: size * 0.14, marginBottom: -size * 0.14 }}
          >
            <div
              style={{
                transform: `translateY(${(1 - enter) * 105 - exit * 30}%)`,
                opacity: 1 - exit,
                filter: `blur(${(1 - enter) * 6 + exit * 8}px)`,
              }}
            >
              {wordsOf(line).map((word, wordIndex, all) => (
                <span
                  key={`${wordIndex}:${word}`}
                  style={{ color: accented.has(normalize(word)) ? accent : undefined }}
                >
                  {word}
                  {wordIndex < all.length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export interface FadeInProps extends RevealWindow {
  children: ReactNode;
  delay?: number;
  distance?: number;
  style?: CSSProperties;
}

export const FadeIn = ({ children, start, end, delay = 0, distance = 18, style }: FadeInProps) => {
  const frame = useCurrentFrame();
  const { enter, exit } = revealState(frame, { start, end }, delay);
  return (
    <div
      style={{
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * distance - exit * distance * 0.6}px)`,
        filter: `blur(${(1 - enter) * 4}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow = ({
  text,
  color,
  accent,
}: {
  text: string;
  color: string;
  accent: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: bodyFont,
      fontSize: 19,
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color,
    }}
  >
    <span style={{ width: 28, height: 2, borderRadius: 1, background: accent }} />
    {text}
  </div>
);

export const BodyCopy = ({
  text,
  color,
  size = 28,
  width = 560,
  align = 'left',
}: {
  text: string;
  color: string;
  size?: number;
  width?: number;
  align?: 'left' | 'center' | 'right';
}) => (
  <div
    style={{
      fontFamily: bodyFont,
      fontSize: size,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
      color,
      width,
      textAlign: align,
    }}
  >
    {text}
  </div>
);

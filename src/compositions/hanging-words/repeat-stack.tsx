import { AbsoluteFill } from 'remotion';
import type { HangingWordsProps } from '@/schemas';
import { heavyFont } from './fonts';
import { launchDistance, launchSpeed } from './physics';
import { Streak } from './streak';
import { TextLine } from './text-line';
import { CAP_CENTER } from './word-flash';

const SCROLL_DISTANCE = 1500;

const sequenceSlots = (sideLines: number) =>
  Array.from({ length: sideLines * 2 }, (_, order) => ({
    order,
    offset: order % 2 === 0 ? order / 2 + 1 : -(order + 1) / 2,
  }));

const SplitWord = ({
  word,
  index,
  show,
  accent,
  ring,
}: {
  word: string;
  index: number;
  show: 'all' | 'rest' | 'letter';
  accent: string;
  ring: { width: number; color: string } | undefined;
}) => (
  <>
    {Array.from(word).map((letter, at) => {
      const isAccent = at === index;
      const visible = show === 'all' || (show === 'rest' ? !isAccent : isAccent);
      return (
        <span
          key={`${at}:${letter}`}
          style={{
            visibility: visible ? 'visible' : 'hidden',
            color: isAccent ? accent : undefined,
            WebkitTextStroke:
              isAccent && ring !== undefined && ring.width > 0
                ? `${ring.width}px ${ring.color}`
                : undefined,
          }}
        >
          {letter}
        </span>
      );
    })}
  </>
);

export const RepeatStack = ({ props, frame }: { props: HangingWordsProps; frame: number }) => {
  const { stack, outro, flash, palette, look } = props;
  if (frame < stack.start || frame >= outro.expandStart) {
    return null;
  }
  const centerY = flash.baseline - stack.size * CAP_CENTER;
  const elapsed = frame - stack.scrollStart;
  const rise = launchDistance(elapsed, stack.scrollFrames, SCROLL_DISTANCE);
  const speed = launchSpeed(elapsed, stack.scrollFrames, SCROLL_DISTANCE);
  const scrolling = elapsed > 0;
  const total = Math.max(1, stack.sideLines * 2);
  const slotFrame = (order: number) =>
    stack.start + 1 + Math.floor((order * stack.fillFrames) / total);
  const inked = frame >= outro.inkAt;
  const ring = { width: stack.ringStroke, color: palette.night };
  return (
    <AbsoluteFill>
      {frame < outro.inkAt ? (
        <Streak
          y={speed * 0.12}
          style={{ position: 'absolute', inset: 0, transform: `translateY(${-rise}px)` }}
        >
          {sequenceSlots(stack.sideLines)
            .filter((slot) => frame >= slotFrame(slot.order))
            .map((slot) => (
              <TextLine
                key={slot.order}
                centerY={centerY + slot.offset * stack.pitch}
                size={stack.size}
                font={heavyFont}
                weight={flash.weight}
                color={palette.light}
              >
                {stack.word}
              </TextLine>
            ))}
          <TextLine
            centerY={centerY}
            size={stack.size}
            font={heavyFont}
            weight={flash.weight}
            color={palette.light}
          >
            <SplitWord
              word={stack.word}
              index={stack.highlightIndex}
              show="all"
              accent={palette.highlight}
              ring={ring}
            />
          </TextLine>
        </Streak>
      ) : null}
      {scrolling ? (
        <TextLine
          centerY={centerY}
          size={stack.size}
          font={heavyFont}
          weight={flash.weight}
          color={palette.light}
        >
          <SplitWord
            word={stack.word}
            index={stack.highlightIndex}
            show="letter"
            accent={inked ? look.ink : palette.highlight}
            ring={inked ? undefined : ring}
          />
        </TextLine>
      ) : null}
    </AbsoluteFill>
  );
};

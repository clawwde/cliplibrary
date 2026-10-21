import type { MagnifierCaptionProps } from '@/schemas';
import { charOpacity, wordStart } from './choreography';

interface Glyph {
  char: string;
  order: number;
  id: string;
}

interface WordSlot {
  index: number;
  chars: Glyph[];
}

const lineWords = (text: string): WordSlot[][] => {
  let index = 0;
  return text.split('\n').map((line) =>
    line
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => {
        const slot = {
          index,
          chars: Array.from(word).map((char, order) => ({ char, order, id: `${index}-${order}` })),
        };
        index += 1;
        return slot;
      }),
  );
};

export const TypedCaption = ({
  frame,
  props,
  font,
}: {
  frame: number;
  props: MagnifierCaptionProps;
  font: string;
}) => {
  const { caption } = props;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: caption.top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: font,
        fontSize: caption.size,
        fontWeight: caption.weight,
        lineHeight: caption.lineHeight,
        color: caption.color,
        whiteSpace: 'pre',
      }}
    >
      {lineWords(caption.text).map((words) => (
        <div key={words.map((word) => `${word.index}`).join('-')}>
          {words.map((word, position) => {
            const start = wordStart(word.index, props.timing);
            return (
              <span key={word.index}>
                {position > 0 ? ' ' : ''}
                {word.chars.map((glyph) => (
                  <span
                    key={glyph.id}
                    style={{ opacity: charOpacity(frame, start, glyph.order, props) }}
                  >
                    {glyph.char}
                  </span>
                ))}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

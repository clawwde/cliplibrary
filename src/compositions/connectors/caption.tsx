import { CONNECTOR_FONTS } from './fonts';

export const Caption = ({
  text,
  size,
  color,
  frame,
  start,
  end,
  letterFrames,
}: {
  text: string;
  size: number;
  color: string;
  frame: number;
  start: number;
  end: number;
  letterFrames: number;
}) => {
  const letters = [...text];
  if (letters.length === 0) {
    return null;
  }
  const typed = (frame - start) / letterFrames;
  const deleted = (frame - end) / (letterFrames * 0.5);
  return (
    <div
      style={{
        position: 'absolute',
        top: size * 2.2,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        fontFamily: CONNECTOR_FONTS.bold,
        fontSize: size,
        letterSpacing: '0.14em',
        color,
        whiteSpace: 'pre',
      }}
    >
      {letters.map((letter, index) => {
        const visible = index < typed && letters.length - 1 - index >= deleted;
        return (
          <span key={`${index.toString()}${letter}`} style={{ opacity: visible ? 1 : 0 }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

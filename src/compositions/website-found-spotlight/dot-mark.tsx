import { useId } from 'react';
import { roundedFont } from '../promo/fonts';

export const DotMark = ({
  letter,
  size,
  dots,
  frame,
}: {
  letter: string;
  size: number;
  dots: string;
  frame: string;
}) => {
  const pattern = `dot-mark-${useId().replace(/:/g, '')}`;
  const stroke = size * 0.055;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <pattern id={pattern} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.3" fill={dots} />
        </pattern>
      </defs>
      <path
        d="M 30 8 H 92 V 46"
        fill="none"
        stroke={frame}
        strokeWidth={(stroke / size) * 100}
        strokeLinecap="butt"
      />
      <path
        d="M 8 60 V 92 H 52"
        fill="none"
        stroke={frame}
        strokeWidth={(stroke / size) * 100}
        strokeLinecap="butt"
      />
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fontFamily={roundedFont}
        fontWeight={800}
        fontSize="84"
        fill={`url(#${pattern})`}
      >
        {letter}
      </text>
      <circle cx="92" cy="62" r="4" fill={frame} />
    </svg>
  );
};

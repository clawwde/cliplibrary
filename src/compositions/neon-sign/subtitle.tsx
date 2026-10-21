import type { NeonSignFlickerProps } from '@/schemas';
import { roundedFont } from '../promo/fonts';
import { StreetLamp } from './street-lamp';

const POLE_LETTER = /^I/i;

const LampPost = ({
  lamp,
  level,
  replacesLetter,
  size,
}: {
  lamp: NeonSignFlickerProps['lamp'];
  level: number;
  replacesLetter: boolean;
  size: number;
}) => (
  <span
    style={{
      position: 'relative',
      display: 'inline-block',
      width: lamp.poleWidth,
      height: 0,
      marginRight: replacesLetter ? size * 0.08 : size * 0.3,
    }}
  >
    <StreetLamp lamp={lamp} level={level} />
  </span>
);

export const Subtitle = ({
  text,
  subtitle,
  lamp,
  lampLevel,
}: {
  text: string;
  subtitle: NeonSignFlickerProps['subtitle'];
  lamp: NeonSignFlickerProps['lamp'];
  lampLevel: number;
}) => {
  const lines = text.split('\n');
  const first = lines[0] ?? '';
  const replacesLetter = lamp.show && POLE_LETTER.test(first);
  return (
    <div
      style={{
        position: 'absolute',
        left: subtitle.left,
        top: subtitle.top,
        fontFamily: roundedFont,
        fontWeight: subtitle.weight,
        fontSize: subtitle.size,
        lineHeight: subtitle.lineHeight,
        letterSpacing: `${subtitle.tracking}em`,
        color: subtitle.color,
        whiteSpace: 'pre',
        textShadow: `0 ${subtitle.size * 0.06}px ${subtitle.size * 0.14}px rgba(0,0,0,${subtitle.shadow})`,
      }}
    >
      {lines.map((line, index) => (
        <div key={`${index}:${line}`}>
          {index === 0 && lamp.show ? (
            <LampPost
              lamp={lamp}
              level={lampLevel}
              replacesLetter={replacesLetter}
              size={subtitle.size}
            />
          ) : null}
          {index === 0 && replacesLetter ? line.slice(1) : line}
        </div>
      ))}
    </div>
  );
};

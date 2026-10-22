import type { RibbonWordsProps } from '@/schemas';
import { displayFont } from '../promo/fonts';
import {
  buildRibbon,
  type Curve,
  lengthToT,
  type RibbonLane,
  ribbonSway,
  tToLength,
} from './ribbon-path';
import { measureLine, splitHighlight } from './ribbon-text';
import { ribbonMotion } from './ribbon-timing';

export type StrandColors = {
  ribbon: string;
  text: string;
  accent: string;
};

type StrandProps = {
  props: RibbonWordsProps;
  lane: RibbonLane;
  text: string;
  delay: number;
  colors: StrandColors;
  frame: number;
  frameWidth: number;
  pathId: string;
};

const dash = (curve: Curve, from: number, to: number) => ({
  strokeDasharray: `${Math.max(0, to - from).toFixed(2)} ${(curve.length * 3).toFixed(0)}`,
  strokeDashoffset: (-from).toFixed(2),
});

export const RibbonStrand = ({
  props,
  lane,
  text,
  delay,
  colors,
  frame,
  frameWidth,
  pathId,
}: StrandProps) => {
  const { words, ribbon, highlight } = props;
  const outline = ribbon.style === 'outline';
  const still = buildRibbon(props, frameWidth, 0, lane, false);
  const live = buildRibbon(props, frameWidth, ribbonSway(props, frame), lane, outline);
  const timed = { ...props, timing: { ...props.timing, drawAt: props.timing.drawAt + delay } };
  const { head, tail, textCenter } = ribbonMotion(
    timed,
    { length: still.center.length, entry: still.entry, textWidth: measureLine(text, words) },
    frame,
  );
  const visible = head - tail > 0.5;
  const headT = lengthToT(live.center, head);
  const tailT = lengthToT(live.center, tail);
  const parts = splitHighlight(text, highlight);
  return (
    <>
      <defs>
        <path id={pathId} d={live.center.d} />
      </defs>
      {visible && live.sides === null ? (
        <path
          d={live.center.d}
          fill="none"
          stroke={colors.ribbon}
          strokeWidth={ribbon.width}
          strokeLinecap="butt"
          {...dash(live.center, tail, head)}
        />
      ) : null}
      {visible && live.sides !== null
        ? live.sides.map((side, index) => (
            <path
              key={index === 0 ? 'left' : 'right'}
              d={side.d}
              fill="none"
              stroke={colors.ribbon}
              strokeWidth={ribbon.outline}
              strokeLinecap="butt"
              {...dash(side, tToLength(side, tailT), tToLength(side, headT))}
            />
          ))
        : null}
      <text
        fontFamily={displayFont}
        fontSize={words.size}
        fontWeight={words.weight}
        letterSpacing={`${words.tracking}em`}
        fill={colors.text}
        textRendering="geometricPrecision"
        style={{ whiteSpace: 'pre' }}
      >
        <textPath href={`#${pathId}`} startOffset={textCenter.toFixed(2)} textAnchor="middle">
          {parts.map((part, index) => (
            <tspan
              key={`${index}-${part.text}`}
              dy={index === 0 ? (words.size * words.centering).toFixed(2) : undefined}
              fill={part.highlighted ? colors.accent : undefined}
            >
              {part.text}
            </tspan>
          ))}
        </textPath>
      </text>
    </>
  );
};

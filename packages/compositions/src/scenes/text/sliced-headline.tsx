import {
  type SlicedHeadlineProps,
  slicedHeadlineDefaults,
  slicedHeadlineMeta,
  slicedHeadlineSchema,
} from '@cliplibrary/schemas';
import { loadFont as loadNormal } from '@remotion/google-fonts/InstrumentSerif';
import type { ReactNode } from 'react';
import { AbsoluteFill, Composition, Easing, random, useCurrentFrame } from 'remotion';
import { ramp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadNormal('normal', { subsets: ['latin'] });
loadNormal('italic', { subsets: ['latin'] });

const SLICE_COUNT = 7;
const SLICE_OVERLAP = 0.4;
const EDGE_BLEED = 40;
const SLICE_STAGGER = 3;
const SLICE_DURATION = 34;

const Sliced = ({
  children,
  seed,
  start,
}: {
  children: ReactNode;
  seed: string;
  start: number;
}) => {
  const frame = useCurrentFrame();
  const settled = frame >= start + (SLICE_COUNT - 1) * SLICE_STAGGER + SLICE_DURATION;
  if (settled) {
    return <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{children}</div>;
  }
  return (
    <div style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      <div style={{ visibility: 'hidden' }}>{children}</div>
      {Array.from({ length: SLICE_COUNT }, (_, index) => {
        const progress = ramp(
          frame,
          start + index * SLICE_STAGGER,
          start + index * SLICE_STAGGER + SLICE_DURATION,
          Easing.out(Easing.exp),
        );
        const offset = (random(`${seed}-${index}`) - 0.5) * 2 * 1500;
        const topInset = index === 0 ? -EDGE_BLEED : (index / SLICE_COUNT) * 100 - SLICE_OVERLAP;
        const bottomInset =
          index === SLICE_COUNT - 1
            ? -EDGE_BLEED
            : (1 - (index + 1) / SLICE_COUNT) * 100 - SLICE_OVERLAP;
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(${topInset}% -50% ${bottomInset}% -50%)`,
              transform: `translateX(${offset * (1 - progress)}px)`,
              opacity: Math.min(1, progress * 3),
            }}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
};

const Band = ({
  direction,
  top,
  text,
  color,
}: {
  direction: 1 | -1;
  top?: boolean;
  text: string;
  color: string;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [top ? 'top' : 'bottom']: 0,
        height: 96,
        overflow: 'hidden',
        borderTop: top ? 0 : `1px solid ${color}55`,
        borderBottom: top ? `1px solid ${color}55` : 0,
        color,
        fontSize: 54,
        fontStyle: 'italic',
        lineHeight: '96px',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ transform: `translateX(${direction === 1 ? -frame * 4 : frame * 4 - 900}px)` }}>
        {text.repeat(12)}
      </div>
    </div>
  );
};

const Badge = ({ text, color, accent }: { text: string; color: string; accent: string }) => {
  const frame = useCurrentFrame();
  return (
    <svg
      width={260}
      height={260}
      viewBox="0 0 260 260"
      style={{
        position: 'absolute',
        right: 120,
        bottom: 170,
        opacity: ramp(frame, 70, 90),
        transform: `rotate(${frame * 1.5}deg)`,
      }}
      aria-hidden="true"
    >
      <defs>
        <path id="badge-circle" d="M130 130 m-100 0 a100 100 0 1 1 200 0 a100 100 0 1 1 -200 0" />
      </defs>
      <circle cx={130} cy={130} r={36} fill={accent} />
      <text fill={color} fontSize={27} letterSpacing={5} fontFamily={fontFamily}>
        <textPath href="#badge-circle">{text}</textPath>
      </text>
    </svg>
  );
};

export const SlicedHeadline = ({
  lead,
  accentWord,
  secondLine,
  band,
  badge,
  background,
  text,
  accent,
}: SlicedHeadlineProps) => {
  const frame = useCurrentFrame();
  const underline = ramp(frame, 75, 105, Easing.inOut(Easing.cubic));
  return (
    <AbsoluteFill style={{ backgroundColor: background, fontFamily, color: text }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(circle at 30% 45%, ${accent}30, transparent 55%)` }}
      />
      <Band direction={1} top text={band} color={text} />
      <AbsoluteFill
        style={{ justifyContent: 'center', paddingLeft: 140, fontSize: 250, lineHeight: 1.02 }}
      >
        <Sliced seed="line-one" start={4}>
          {lead}
          <i style={{ color: accent }}>{accentWord}</i>
        </Sliced>
        <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'flex-start' }}>
          <Sliced seed="line-two" start={20}>
            {secondLine}
          </Sliced>
          <svg
            viewBox="0 0 600 30"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              left: 0,
              bottom: -4,
              width: '100%',
              height: 34,
              overflow: 'visible',
            }}
            aria-hidden="true"
          >
            <path
              d="M5 20 C 120 4, 250 28, 380 12 S 560 20, 595 8"
              fill="none"
              stroke={accent}
              strokeWidth={8}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - underline}
            />
          </svg>
        </div>
      </AbsoluteFill>
      <Badge text={badge} color={text} accent={accent} />
      <Band direction={-1} text={band} color={text} />
    </AbsoluteFill>
  );
};

export const slicedHeadlineScene: SceneModule = {
  id: 'sliced-headline',
  component: SlicedHeadline,
  render: (key) => (
    <Composition
      key={key}
      id="sliced-headline"
      component={SlicedHeadline}
      schema={slicedHeadlineSchema}
      defaultProps={slicedHeadlineDefaults}
      durationInFrames={slicedHeadlineMeta.durationInFrames}
      fps={slicedHeadlineMeta.fps}
      width={slicedHeadlineMeta.width}
      height={slicedHeadlineMeta.height}
    />
  ),
};

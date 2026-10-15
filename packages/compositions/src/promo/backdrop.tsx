import type { PromoLook } from '@cliplibrary/schemas';
import { AbsoluteFill } from 'remotion';

const EASED_STOPS = [0, 0.04, 0.14, 0.3, 0.5, 0.7, 0.86, 0.96, 1];

const easedGradient = (from: string, to: string): string =>
  EASED_STOPS.map(
    (amount, index) =>
      `color-mix(in oklab, ${from}, ${to} ${(amount * 100).toFixed(1)}%) ${((index / (EASED_STOPS.length - 1)) * 100).toFixed(1)}%`,
  ).join(', ');

const RULE_WIDTH = 1.5;

const rules = (direction: 'bottom' | 'right', color: string, spacing: number): string =>
  `repeating-linear-gradient(to ${direction}, transparent 0px, transparent ${spacing - RULE_WIDTH}px, ${color} ${spacing - RULE_WIDTH}px, ${color} ${spacing}px)`;

const paperLayers = (look: PromoLook): string[] => {
  if (look.paper === 'plain') {
    return [];
  }
  const horizontal = rules('bottom', look.paperLine, look.paperSpacing);
  return look.paper === 'grid'
    ? [horizontal, rules('right', look.paperLine, look.paperSpacing)]
    : [horizontal];
};

const Paper = ({ look }: { look: PromoLook }) => {
  const layers = paperLayers(look);
  if (layers.length === 0 && !look.paperMargin) {
    return null;
  }
  return (
    <AbsoluteFill>
      {layers.length > 0 ? (
        <AbsoluteFill
          style={{
            backgroundImage: layers.join(', '),
            backgroundPosition: `0px ${Math.round(look.paperSpacing * 0.6)}px`,
          }}
        />
      ) : null}
      {look.paperMargin ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 168,
            width: 2,
            background: `color-mix(in oklab, ${look.accent} 45%, transparent)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export const Backdrop = ({
  look,
  focusX = 50,
  focusY = 44,
}: {
  look: PromoLook;
  focusX?: number;
  focusY?: number;
}) => {
  const glow = `rgba(255, 255, 255, ${(look.spotlight * 0.35).toFixed(3)})`;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 130% at ${focusX}% ${focusY - 2}%, ${easedGradient(look.background, look.backgroundEdge)})`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 70% at ${focusX}% ${focusY + 2}%, ${easedGradient(glow, 'rgba(255, 255, 255, 0)')})`,
        }}
      />
      <Paper look={look} />
      {look.grain > 0 ? (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, opacity: look.grain, mixBlendMode: 'overlay' }}
          aria-hidden="true"
        >
          <filter id="promo-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              seed={7}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#promo-grain)" />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

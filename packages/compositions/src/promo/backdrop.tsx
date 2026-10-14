import type { PromoLook } from '@cliplibrary/schemas';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const Backdrop = ({ look, focusX = 50 }: { look: PromoLook; focusX?: number }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 120% at ${focusX}% 42%, ${look.background} 0%, ${look.background} 38%, ${look.backgroundEdge} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(42% 52% at ${focusX}% 46%, rgba(255,255,255,${look.spotlight * 0.55}) 0%, rgba(255,255,255,0) 70%)`,
          mixBlendMode: 'soft-light',
        }}
      />
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
              seed={frame % 12}
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

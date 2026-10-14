import type { PromoLook, PromoMotion, PromoPlacement } from '@cliplibrary/schemas';
import type { CSSProperties, ReactNode } from 'react';
import { Backdrop } from './backdrop';
import { TransitionFrame } from './transition-frame';

const channel = (hex: string, start: number): number => {
  const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

export const isDarkLook = (look: PromoLook): boolean =>
  0.2126 * channel(look.background, 1) +
    0.7152 * channel(look.background, 3) +
    0.0722 * channel(look.background, 5) <
  0.25;

export const PromoLayer = ({
  look,
  motion,
  focusX = 50,
  children,
}: {
  look: PromoLook;
  motion: PromoMotion;
  focusX?: number;
  children: ReactNode;
}) => (
  <TransitionFrame motion={motion}>
    {look.showBackdrop ? <Backdrop look={look} focusX={focusX} /> : null}
    {children}
  </TransitionFrame>
);

const JUSTIFY: Record<PromoPlacement['vertical'], CSSProperties['justifyContent']> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const ALIGN: Record<PromoPlacement['horizontal'], CSSProperties['alignItems']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const placementFrame = (placement: PromoPlacement): CSSProperties => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: JUSTIFY[placement.vertical],
  alignItems: ALIGN[placement.horizontal],
  padding: `${placement.insetY}px ${placement.insetX}px`,
});

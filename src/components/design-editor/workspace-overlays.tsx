'use client';

import { Line, Rect } from 'react-konva';
import type { Box } from '@/design';

export const ACCENT = '#8b5cf6';

export interface Guides {
  vertical: number | null;
  horizontal: number | null;
}

export const NO_GUIDES: Guides = { vertical: null, horizontal: null };

interface WorkspaceOverlaysProps {
  hoverBox: Box | null;
  guides: Guides;
  marquee: Box | null;
  zoom: number;
}

export const WorkspaceOverlays = ({ hoverBox, guides, marquee, zoom }: WorkspaceOverlaysProps) => (
  <>
    {hoverBox === null ? null : (
      <Rect {...hoverBox} stroke={ACCENT} strokeWidth={1.5 / zoom} listening={false} />
    )}
    {guides.vertical === null ? null : (
      <Line
        points={[guides.vertical, -10000, guides.vertical, 10000]}
        stroke="#ec4899"
        strokeWidth={1 / zoom}
        dash={[4 / zoom, 4 / zoom]}
        listening={false}
      />
    )}
    {guides.horizontal === null ? null : (
      <Line
        points={[-10000, guides.horizontal, 10000, guides.horizontal]}
        stroke="#ec4899"
        strokeWidth={1 / zoom}
        dash={[4 / zoom, 4 / zoom]}
        listening={false}
      />
    )}
    {marquee === null ? null : (
      <Rect
        {...marquee}
        fill="rgba(139,92,246,0.08)"
        stroke={ACCENT}
        strokeWidth={1 / zoom}
        listening={false}
      />
    )}
  </>
);

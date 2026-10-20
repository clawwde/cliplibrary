import type { CSSProperties } from 'react';
import type { MindNode } from '@/schemas';

const SPARKLE_PATH =
  'M0 -8.5 C0.8 -2.6 2.6 -0.8 8.5 0 C2.6 0.8 0.8 2.6 0 8.5 C-0.8 2.6 -2.6 0.8 -8.5 0 C-2.6 -0.8 -0.8 -2.6 0 -8.5 Z';

const Sparkle = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="-10 -10 20 20"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d={SPARKLE_PATH} fill={color} />
  </svg>
);

export const NodePill = ({
  node,
  family,
  weight,
  titleSize,
  subtitleSize,
  ink,
  padding,
  style,
}: {
  node: MindNode;
  family: string;
  weight: number;
  titleSize: number;
  subtitleSize: number;
  ink: string;
  padding: number;
  style: CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: titleSize * 0.36,
      padding: `${padding * 0.5}px ${padding * 1.3}px ${padding * 0.5}px ${padding * 0.8}px`,
      borderRadius: titleSize * 0.9,
      color: ink,
      fontFamily: family,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    <div style={{ alignSelf: 'flex-start', paddingTop: titleSize * 0.16 }}>
      <Sparkle size={Math.round(titleSize * 0.72)} color={ink} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: titleSize, fontWeight: weight, lineHeight: 1.12 }}>{node.title}</div>
      <div
        style={{
          fontSize: subtitleSize,
          fontWeight: Math.max(300, weight - 100),
          lineHeight: 1.2,
          opacity: 0.82,
        }}
      >
        {node.subtitle}
      </div>
    </div>
  </div>
);

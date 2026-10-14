'use client';

import { CLIP_COMPONENTS } from '@cliplibrary/compositions';
import type { ClipId, ClipMeta } from '@cliplibrary/schemas';
import dynamic from 'next/dynamic';
import { type FC, useState } from 'react';

const Player = dynamic(() => import('@remotion/player').then((mod) => mod.Player), { ssr: false });

type DeviceKey = 'mobile' | 'square' | 'desktop' | 'full';

const DEVICES: { key: DeviceKey; label: string; maxWidth: number | null }[] = [
  { key: 'mobile', label: 'Mobile', maxWidth: 400 },
  { key: 'square', label: 'Square', maxWidth: 640 },
  { key: 'desktop', label: 'Desktop', maxWidth: 960 },
  { key: 'full', label: 'Full', maxWidth: null },
];

export const PreviewStage = ({
  clipId,
  meta,
  values,
}: {
  clipId: ClipId;
  meta: ClipMeta;
  values: Record<string, unknown>;
}) => {
  const [device, setDevice] = useState<DeviceKey>('desktop');
  const Component = CLIP_COMPONENTS[clipId] as FC<Record<string, unknown>>;
  const active = DEVICES.find((entry) => entry.key === device) ?? DEVICES[2];
  const maxWidth = active?.maxWidth ?? undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        height: '100%',
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 4,
          padding: 4,
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: 'var(--panel)',
        }}
      >
        {DEVICES.map((entry) => (
          <button
            key={entry.key}
            type="button"
            onClick={() => setDevice(entry.key)}
            style={{
              padding: '6px 12px',
              borderRadius: 7,
              border: 'none',
              fontSize: 13,
              background: entry.key === device ? 'var(--accent)' : 'transparent',
              color: entry.key === device ? 'var(--accent-contrast)' : 'var(--muted)',
            }}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div
        style={{
          width: '100%',
          maxWidth,
          margin: 'auto',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
        }}
      >
        <Player
          component={Component}
          inputProps={values}
          durationInFrames={meta.durationInFrames}
          fps={meta.fps}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          controls
          loop
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

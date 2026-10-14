'use client';

import { CLIP_COMPONENTS } from '@cliplibrary/compositions';
import type { ClipMeta } from '@cliplibrary/schemas';
import { Thumbnail } from '@remotion/player';
import Link from 'next/link';
import { type FC, useEffect, useState } from 'react';

export const ClipCard = ({ meta, values }: { meta: ClipMeta; values: Record<string, unknown> }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const Component = CLIP_COMPONENTS[meta.id] as FC<Record<string, unknown>>;

  return (
    <Link
      href={`/clips/${meta.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--panel-raised)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div style={{ aspectRatio: '16 / 9', background: '#000', position: 'relative' }}>
        {mounted ? (
          <Thumbnail
            component={Component}
            inputProps={values}
            durationInFrames={meta.durationInFrames}
            fps={meta.fps}
            compositionWidth={meta.width}
            compositionHeight={meta.height}
            frameToDisplay={meta.posterFrame}
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 15 }}>{meta.title}</span>
        <span style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>
          {meta.description}
        </span>
      </div>
    </Link>
  );
};

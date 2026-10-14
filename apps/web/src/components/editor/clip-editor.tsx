'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import type { ClipId, ClipMeta } from '@cliplibrary/schemas';
import { useState } from 'react';
import { ChatPanel } from '../chat/chat-panel';
import { PreviewStage } from './preview-stage';
import { PropertiesPanel } from './properties-panel';

type Values = Record<string, unknown>;

export const ClipEditor = ({
  clipId,
  meta,
  descriptors,
  initialValues,
}: {
  clipId: ClipId;
  meta: ClipMeta;
  descriptors: ControlDescriptor[];
  initialValues: Values;
}) => {
  const [values, setValues] = useState<Values>(initialValues);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px minmax(0, 1fr) 360px',
        gap: 0,
        height: 'calc(100vh - 150px)',
        minHeight: 540,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <aside
        style={{ borderRight: '1px solid var(--border)', minHeight: 0, background: 'var(--panel)' }}
      >
        <ChatPanel />
      </aside>

      <section style={{ minWidth: 0, minHeight: 0, overflow: 'auto' }}>
        <PreviewStage clipId={clipId} meta={meta} values={values} />
      </section>

      <aside
        style={{
          borderLeft: '1px solid var(--border)',
          minHeight: 0,
          overflowY: 'auto',
          background: 'var(--panel)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            background: 'var(--panel)',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 14 }}>{meta.title}</span>
          <button
            type="button"
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--accent-contrast)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Export
          </button>
        </div>
        <div style={{ padding: 16 }}>
          <PropertiesPanel descriptors={descriptors} values={values} onChange={setValues} />
        </div>
      </aside>
    </div>
  );
};

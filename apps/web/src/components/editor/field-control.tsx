'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import type { CSSProperties } from 'react';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' }
>;

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--panel-raised)',
  color: 'var(--text)',
  fontSize: 13,
  fontFamily: 'inherit',
};

const TextField = ({
  descriptor,
  value,
  onChange,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'text' }>;
  value: string;
  onChange: (next: string) => void;
}) =>
  descriptor.multiline ? (
    <textarea
      value={value}
      rows={3}
      onChange={(event) => onChange(event.target.value)}
      style={{ ...inputStyle, resize: 'vertical' }}
    />
  ) : (
    <input
      type="text"
      value={value}
      maxLength={descriptor.maxLength ?? undefined}
      onChange={(event) => onChange(event.target.value)}
      style={inputStyle}
    />
  );

const ColorField = ({ value, onChange }: { value: string; onChange: (next: string) => void }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <input
      type="color"
      value={value.slice(0, 7)}
      onChange={(event) => onChange(event.target.value)}
      style={{
        width: 36,
        height: 34,
        padding: 0,
        border: '1px solid var(--border)',
        borderRadius: 8,
        background: 'none',
      }}
      aria-label="Color"
    />
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
    />
  </div>
);

const NumberField = ({
  descriptor,
  value,
  onChange,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'number' }>;
  value: number;
  onChange: (next: number) => void;
}) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
    <input
      type="range"
      min={descriptor.min ?? 0}
      max={descriptor.max ?? 100}
      step={descriptor.step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{ flex: 1, accentColor: 'var(--accent)' }}
    />
    <input
      type="number"
      min={descriptor.min ?? undefined}
      max={descriptor.max ?? undefined}
      step={descriptor.step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      style={{ ...inputStyle, width: 80, textAlign: 'right' }}
    />
  </div>
);

const BooleanField = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={value}
    onClick={() => onChange(!value)}
    style={{
      width: 46,
      height: 26,
      borderRadius: 999,
      border: '1px solid var(--border)',
      background: value ? 'var(--accent)' : 'var(--panel)',
      position: 'relative',
      transition: 'background 0.15s',
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: 2,
        left: value ? 22 : 2,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.15s',
      }}
    />
  </button>
);

const EnumField = ({
  descriptor,
  value,
  onChange,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'enum' }>;
  value: string;
  onChange: (next: string) => void;
}) => (
  <select value={value} onChange={(event) => onChange(event.target.value)} style={inputStyle}>
    {descriptor.options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export const FieldControl = ({
  descriptor,
  value,
  onChange,
}: {
  descriptor: LeafDescriptor;
  value: unknown;
  onChange: (next: unknown) => void;
}) => {
  switch (descriptor.kind) {
    case 'text':
      return <TextField descriptor={descriptor} value={String(value ?? '')} onChange={onChange} />;
    case 'color':
      return <ColorField value={String(value ?? '#000000')} onChange={onChange} />;
    case 'number':
      return <NumberField descriptor={descriptor} value={Number(value ?? 0)} onChange={onChange} />;
    case 'boolean':
      return <BooleanField value={Boolean(value)} onChange={onChange} />;
    case 'enum':
      return <EnumField descriptor={descriptor} value={String(value ?? '')} onChange={onChange} />;
    default:
      return null;
  }
};

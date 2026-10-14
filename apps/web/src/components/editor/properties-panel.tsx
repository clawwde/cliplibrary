'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import type { ReactNode } from 'react';
import { getAtPath, setAtPath } from '@/lib/value-path';
import { FieldControl } from './field-control';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' }
>;

type Values = Record<string, unknown>;

interface RowProps {
  descriptor: ControlDescriptor;
  values: Values;
  onChange: (next: Values) => void;
}

const isLeaf = (descriptor: ControlDescriptor): descriptor is LeafDescriptor =>
  descriptor.kind !== 'object' && descriptor.kind !== 'array';

const leafDefault = (descriptor: ControlDescriptor): unknown => {
  switch (descriptor.kind) {
    case 'color':
      return '#000000';
    case 'number':
      return descriptor.min ?? 0;
    case 'boolean':
      return false;
    case 'enum':
      return descriptor.options[0] ?? '';
    default:
      return '';
  }
};

const buildDefaultItem = (fields: ControlDescriptor[]): Values => {
  const item: Values = {};
  for (const field of fields) {
    const key = field.path[0];
    if (key !== undefined) {
      item[key] = leafDefault(field);
    }
  }
  return item;
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
    <span
      style={{
        fontSize: 11,
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

const LeafRow = ({
  descriptor,
  values,
  onChange,
}: {
  descriptor: LeafDescriptor;
  values: Values;
  onChange: (next: Values) => void;
}) => (
  <Field label={descriptor.label}>
    <FieldControl
      descriptor={descriptor}
      value={getAtPath(values, descriptor.path)}
      onChange={(next) => onChange(setAtPath(values, descriptor.path, next) as Values)}
    />
  </Field>
);

const ArrayRow = ({
  descriptor,
  values,
  onChange,
}: {
  descriptor: Extract<ControlDescriptor, { kind: 'array' }>;
  values: Values;
  onChange: (next: Values) => void;
}) => {
  const items = (getAtPath(values, descriptor.path) as unknown[] | undefined) ?? [];
  const canAdd = descriptor.max === null || items.length < descriptor.max;
  const canRemove = descriptor.min === null || items.length > descriptor.min;
  const replace = (next: unknown[]) => onChange(setAtPath(values, descriptor.path, next) as Values);

  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: 11,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          marginBottom: 10,
        }}
      >
        {descriptor.label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((_, index) => (
          <div
            key={index}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 12,
              background: 'var(--panel)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Item {index + 1}</span>
              {canRemove ? (
                <button
                  type="button"
                  onClick={() => replace(items.filter((_item, position) => position !== index))}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: 'var(--danger)',
                    fontSize: 12,
                  }}
                >
                  Remove
                </button>
              ) : null}
            </div>
            {descriptor.item.filter(isLeaf).map((field) => {
              const path = [...descriptor.path, String(index), ...field.path];
              return (
                <Field key={field.path.join('.')} label={field.label}>
                  <FieldControl
                    descriptor={field}
                    value={getAtPath(values, path)}
                    onChange={(next) => onChange(setAtPath(values, path, next) as Values)}
                  />
                </Field>
              );
            })}
          </div>
        ))}
      </div>
      {canAdd ? (
        <button
          type="button"
          onClick={() => replace([...items, buildDefaultItem(descriptor.item)])}
          style={{
            marginTop: 10,
            width: '100%',
            padding: '8px 0',
            borderRadius: 8,
            border: '1px dashed var(--border-strong)',
            background: 'none',
            color: 'var(--muted)',
            fontSize: 13,
          }}
        >
          Add item
        </button>
      ) : null}
    </div>
  );
};

const ControlRow = ({ descriptor, values, onChange }: RowProps) => {
  if (descriptor.kind === 'array') {
    return <ArrayRow descriptor={descriptor} values={values} onChange={onChange} />;
  }
  if (descriptor.kind === 'object') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {descriptor.fields.map((field) => (
          <ControlRow
            key={field.path.join('.')}
            descriptor={field}
            values={values}
            onChange={onChange}
          />
        ))}
      </div>
    );
  }
  return <LeafRow descriptor={descriptor} values={values} onChange={onChange} />;
};

export const PropertiesPanel = ({
  descriptors,
  values,
  onChange,
}: {
  descriptors: ControlDescriptor[];
  values: Values;
  onChange: (next: Values) => void;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {descriptors.map((descriptor) => (
      <ControlRow
        key={descriptor.path.join('.')}
        descriptor={descriptor}
        values={values}
        onChange={onChange}
      />
    ))}
  </div>
);

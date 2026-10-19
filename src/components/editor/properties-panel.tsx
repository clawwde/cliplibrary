'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { ControlDescriptor } from '@/core';
import { getAtPath, setAtPath } from '@/lib/value-path';
import { FieldControl } from './field-control';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' | 'image' | 'video' }
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

const itemSummary = (fields: ControlDescriptor[], item: unknown): string => {
  const first = fields.find((field) => field.kind === 'text' || field.kind === 'enum');
  if (first === undefined) {
    return '';
  }
  const raw = getAtPath(item, first.path);
  return typeof raw === 'string' ? raw : '';
};

const FieldShell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="mb-3.5 flex flex-col gap-1.5">
    <Label className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</Label>
    {children}
  </div>
);

const LeafRow = ({ descriptor, values, onChange }: { descriptor: LeafDescriptor } & RowProps) => (
  <FieldShell label={descriptor.label}>
    <FieldControl
      descriptor={descriptor}
      value={getAtPath(values, descriptor.path)}
      onChange={(next) => onChange(setAtPath(values, descriptor.path, next) as Values)}
    />
  </FieldShell>
);

const ArrayRow = ({
  descriptor,
  values,
  onChange,
}: { descriptor: Extract<ControlDescriptor, { kind: 'array' }> } & RowProps) => {
  const items = (getAtPath(values, descriptor.path) as unknown[] | undefined) ?? [];
  const canAdd = descriptor.max === null || items.length < descriptor.max;
  const canRemove = descriptor.min === null || items.length > descriptor.min;
  const replace = (next: unknown[]) => onChange(setAtPath(values, descriptor.path, next) as Values);
  const leafFields = descriptor.item.filter(isLeaf);

  return (
    <div className="mb-4">
      <div className="mb-2 text-[11px] text-muted-foreground uppercase tracking-wide">
        {descriptor.label}
      </div>
      <Accordion type="multiple" className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`${index}`}
            className="overflow-hidden rounded-lg bg-muted/60"
          >
            <AccordionTrigger className="px-3 py-2.5 text-sm hover:no-underline">
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-muted-foreground">{index + 1}</span>
                <span className="truncate">{itemSummary(leafFields, item) || 'Item'}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              {canRemove ? (
                <div className="mb-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-muted-foreground hover:text-destructive"
                    onClick={() => replace(items.filter((_item, position) => position !== index))}
                  >
                    <Trash2 className="size-3.5" />
                    Remove
                  </Button>
                </div>
              ) : null}
              {leafFields.map((field) => {
                const path = [...descriptor.path, String(index), ...field.path];
                return (
                  <FieldShell key={field.path.join('.')} label={field.label}>
                    <FieldControl
                      descriptor={field}
                      value={getAtPath(values, path)}
                      onChange={(next) => onChange(setAtPath(values, path, next) as Values)}
                    />
                  </FieldShell>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {canAdd ? (
        <Button
          type="button"
          variant="ghost"
          className="mt-2 w-full bg-muted/60 text-muted-foreground hover:text-foreground"
          onClick={() => replace([...items, buildDefaultItem(descriptor.item)])}
        >
          <Plus className="size-4" />
          Add {descriptor.label.toLowerCase().replace(/s$/, '')}
        </Button>
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
      <div className="flex flex-col">
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
  <div className="flex flex-col">
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

'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' }
>;

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
    <Textarea value={value} rows={3} onChange={(event) => onChange(event.target.value)} />
  ) : (
    <Input
      type="text"
      value={value}
      maxLength={descriptor.maxLength ?? undefined}
      onChange={(event) => onChange(event.target.value)}
    />
  );

const ColorField = ({ value, onChange }: { value: string; onChange: (next: string) => void }) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={value.slice(0, 7)}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Color"
      className="size-9 cursor-pointer overflow-hidden rounded-md bg-transparent p-0"
    />
    <Input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="font-mono"
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
  <div className="flex items-center gap-3">
    <Slider
      min={descriptor.min ?? 0}
      max={descriptor.max ?? 100}
      step={descriptor.step}
      value={[value]}
      onValueChange={(next) => onChange(next[0] ?? value)}
      className="flex-1"
    />
    <Input
      type="number"
      min={descriptor.min ?? undefined}
      max={descriptor.max ?? undefined}
      step={descriptor.step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-20 text-right"
    />
  </div>
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
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {descriptor.options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
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
      return <Switch checked={Boolean(value)} onCheckedChange={onChange} />;
    case 'enum':
      return <EnumField descriptor={descriptor} value={String(value ?? '')} onChange={onChange} />;
    default:
      return null;
  }
};

'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import { Upload, X } from 'lucide-react';
import { type DragEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' | 'image' | 'video' }
>;

type MediaKind = 'image' | 'video';

const uploadMedia = async (file: File): Promise<string> => {
  const body = new FormData();
  body.set('file', file);
  const response = await fetch('/api/upload', { method: 'POST', body });
  if (!response.ok) {
    throw new Error('upload failed');
  }
  const data = (await response.json()) as { url: string };
  return data.url;
};

const MediaPreview = ({ kind, value }: { kind: MediaKind; value: string }) =>
  kind === 'video' ? (
    <video
      src={value}
      className="h-28 w-full rounded-md object-cover"
      muted
      playsInline
      preload="metadata"
    />
  ) : (
    <span
      role="img"
      aria-label="Selected image"
      className="block h-28 w-full rounded-md bg-center bg-cover"
      style={{ backgroundImage: `url("${value}")` }}
    />
  );

const MediaField = ({
  kind,
  value,
  commit,
  live,
  seal,
}: {
  kind: MediaKind;
  value: string;
  commit: (next: string) => void;
  live: (next: string) => void;
  seal: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const receive = (file: File | undefined) => {
    if (file === undefined) {
      return;
    }
    setBusy(true);
    uploadMedia(file)
      .then(commit)
      .catch(() => undefined)
      .finally(() => setBusy(false));
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    receive(event.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex min-h-28 w-full flex-col items-center justify-center overflow-hidden rounded-md bg-muted p-2 text-muted-foreground text-xs transition-[box-shadow] outline-none',
          dragging && 'ring-[3px] ring-ring/40',
        )}
      >
        {value ? (
          <MediaPreview kind={kind} value={value} />
        ) : (
          <span className="flex flex-col items-center gap-1">
            <Upload className="size-5" />
            {busy ? 'Uploading' : `Drop ${kind} or click to upload`}
          </span>
        )}
      </button>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={value}
          placeholder={`${kind} URL`}
          onChange={(event) => live(event.target.value)}
          onBlur={seal}
          className="font-mono text-xs"
        />
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Clear ${kind}`}
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => commit('')}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={kind === 'image' ? 'image/*' : 'video/*'}
        className="hidden"
        onChange={(event) => receive(event.target.files?.[0])}
      />
    </div>
  );
};

const TextField = ({
  descriptor,
  value,
  live,
  seal,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'text' }>;
  value: string;
  live: (next: string) => void;
  seal: () => void;
}) =>
  descriptor.multiline ? (
    <Textarea value={value} rows={3} onChange={(event) => live(event.target.value)} onBlur={seal} />
  ) : (
    <Input
      type="text"
      value={value}
      maxLength={descriptor.maxLength ?? undefined}
      onChange={(event) => live(event.target.value)}
      onBlur={seal}
    />
  );

const ColorField = ({
  value,
  live,
  seal,
}: {
  value: string;
  live: (next: string) => void;
  seal: () => void;
}) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={value.slice(0, 7)}
      onChange={(event) => live(event.target.value)}
      onBlur={seal}
      aria-label="Color"
      className="size-9 cursor-pointer overflow-hidden rounded-md bg-transparent p-0"
    />
    <Input
      type="text"
      value={value}
      onChange={(event) => live(event.target.value)}
      onBlur={seal}
      className="font-mono"
    />
  </div>
);

const NumberField = ({
  descriptor,
  value,
  live,
  seal,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'number' }>;
  value: number;
  live: (next: number) => void;
  seal: () => void;
}) => (
  <div className="flex items-center gap-3">
    <Slider
      min={descriptor.min ?? 0}
      max={descriptor.max ?? 100}
      step={descriptor.step}
      value={[value]}
      onValueChange={(next) => live(next[0] ?? value)}
      onValueCommit={seal}
      className="flex-1"
    />
    <Input
      type="number"
      min={descriptor.min ?? undefined}
      max={descriptor.max ?? undefined}
      step={descriptor.step}
      value={value}
      onChange={(event) => live(Number(event.target.value))}
      onBlur={seal}
      className="w-20 text-right"
    />
  </div>
);

const EnumField = ({
  descriptor,
  value,
  commit,
}: {
  descriptor: Extract<LeafDescriptor, { kind: 'enum' }>;
  value: string;
  commit: (next: string) => void;
}) => (
  <Select value={value} onValueChange={commit}>
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
  onCommit,
  onLive,
  onSeal,
}: {
  descriptor: LeafDescriptor;
  value: unknown;
  onCommit: (next: unknown) => void;
  onLive: (next: unknown) => void;
  onSeal: () => void;
}) => {
  switch (descriptor.kind) {
    case 'text':
      return (
        <TextField
          descriptor={descriptor}
          value={String(value ?? '')}
          live={onLive}
          seal={onSeal}
        />
      );
    case 'color':
      return <ColorField value={String(value ?? '#000000')} live={onLive} seal={onSeal} />;
    case 'number':
      return (
        <NumberField
          descriptor={descriptor}
          value={Number(value ?? 0)}
          live={onLive}
          seal={onSeal}
        />
      );
    case 'boolean':
      return <Switch checked={Boolean(value)} onCheckedChange={onCommit} />;
    case 'enum':
      return <EnumField descriptor={descriptor} value={String(value ?? '')} commit={onCommit} />;
    case 'image':
      return (
        <MediaField
          kind="image"
          value={String(value ?? '')}
          commit={onCommit}
          live={onLive}
          seal={onSeal}
        />
      );
    case 'video':
      return (
        <MediaField
          kind="video"
          value={String(value ?? '')}
          commit={onCommit}
          live={onLive}
          seal={onSeal}
        />
      );
    default:
      return null;
  }
};

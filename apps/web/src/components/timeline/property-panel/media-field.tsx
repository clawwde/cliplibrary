'use client';

import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { PanelRow } from './fields';

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

interface MediaFieldProps {
  label: string;
  accept: string;
  value: string;
  onChange: (next: string) => void;
}

export const MediaField = ({ label, accept, value, onChange }: MediaFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const receive = (file: File | undefined): void => {
    if (file === undefined) {
      return;
    }
    setBusy(true);
    uploadMedia(file)
      .then(onChange)
      .catch(() => undefined)
      .finally(() => setBusy(false));
  };

  return (
    <PanelRow label={label}>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-md bg-muted p-2 text-muted-foreground text-xs"
        >
          <Upload className="size-4" />
          {busy ? 'Uploading' : 'Upload'}
        </button>
        <Input
          type="text"
          value={value}
          placeholder="source url"
          onChange={(event) => onChange(event.target.value)}
          className="font-mono text-xs"
        />
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => receive(event.target.files?.[0])}
        />
      </div>
    </PanelRow>
  );
};

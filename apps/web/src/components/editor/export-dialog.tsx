'use client';

import type { ExportRecord } from '@cliplibrary/core';
import type { ClipId } from '@cliplibrary/schemas';
import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  CODEC_LABELS,
  DEFAULT_RENDER_OPTIONS,
  PIXEL_FORMATS,
  PRORES_PROFILES,
  RENDER_CODECS,
  type RenderCodec,
  type RenderOptions,
} from '@/lib/render-options';

type Phase = 'idle' | 'rendering' | 'done' | 'error';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <Label className="text-muted-foreground text-xs">{label}</Label>
    {children}
  </div>
);

const NumberRow = ({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) => (
  <div className="flex items-center gap-3">
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(next) => onChange(next[0] ?? value)}
      className="flex-1"
    />
    <Input
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-20 text-right"
    />
  </div>
);

export const ExportOptionsForm = ({
  options,
  onChange,
  disabled = false,
}: {
  options: RenderOptions;
  onChange: (next: RenderOptions) => void;
  disabled?: boolean;
}) => (
  <fieldset disabled={disabled} className="flex flex-col gap-4">
    <Field label="Codec">
      <Select
        value={options.codec}
        onValueChange={(codec) =>
          onChange({
            ...options,
            codec: codec as RenderCodec,
            proResProfile:
              codec === 'prores' ? (options.proResProfile ?? 'hq') : options.proResProfile,
          })
        }
      >
        <SelectTrigger className="w-full" aria-label="Codec">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RENDER_CODECS.map((codec) => (
            <SelectItem key={codec} value={codec}>
              {CODEC_LABELS[codec]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>

    <Field label={`Quality (CRF ${options.crf ?? 18})`}>
      <NumberRow
        value={options.crf ?? 18}
        min={1}
        max={51}
        step={1}
        onChange={(crf) => onChange({ ...options, crf })}
      />
    </Field>

    <Field label={`Scale (${options.scale}x)`}>
      <NumberRow
        value={options.scale}
        min={0.25}
        max={2}
        step={0.25}
        onChange={(scale) => onChange({ ...options, scale })}
      />
    </Field>

    <Field label="Frame rate">
      <Input
        type="number"
        min={1}
        max={120}
        placeholder="source"
        value={options.fps ?? ''}
        aria-label="Frame rate"
        onChange={(event) =>
          onChange({
            ...options,
            fps: event.target.value === '' ? null : Number(event.target.value),
          })
        }
      />
    </Field>

    <Field label="Pixel format">
      <Select
        value={options.pixelFormat ?? 'auto'}
        onValueChange={(value) =>
          onChange({ ...options, pixelFormat: value === 'auto' ? null : value })
        }
      >
        <SelectTrigger className="w-full" aria-label="Pixel format">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          {PIXEL_FORMATS.map((format) => (
            <SelectItem key={format} value={format}>
              {format}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>

    {options.codec === 'prores' ? (
      <Field label="ProRes profile">
        <Select
          value={options.proResProfile ?? 'hq'}
          onValueChange={(value) => onChange({ ...options, proResProfile: value })}
        >
          <SelectTrigger className="w-full" aria-label="ProRes profile">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRORES_PROFILES.map((profile) => (
              <SelectItem key={profile} value={profile}>
                {profile}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    ) : null}

    <Field label={`Still quality (${options.jpegQuality})`}>
      <NumberRow
        value={options.jpegQuality}
        min={1}
        max={100}
        step={1}
        onChange={(jpegQuality) => onChange({ ...options, jpegQuality })}
      />
    </Field>
  </fieldset>
);

export const ExportDialog = ({
  clipId,
  values,
  open,
  onOpenChange,
}: {
  clipId: ClipId;
  values: Record<string, unknown>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [options, setOptions] = useState<RenderOptions>(DEFAULT_RENDER_OPTIONS);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [record, setRecord] = useState<ExportRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exportId, setExportId] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== 'rendering' || exportId === null) {
      return;
    }
    let active = true;
    const tick = (): void => {
      fetch(`/api/export/${exportId}`)
        .then((response) => (response.ok && active ? response.json() : null))
        .then((payload) => {
          if (payload === null || !active) {
            return;
          }
          const next = payload as ExportRecord;
          setProgress(Math.round((next.progress ?? 0) * 100));
          if (next.status === 'done') {
            setRecord(next);
            setPhase('done');
          } else if (next.status === 'error') {
            setError(next.error);
            setPhase('error');
          }
        })
        .catch(() => undefined);
    };
    const timer = setInterval(tick, 600);
    tick();
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [phase, exportId]);

  const startRender = (): void => {
    setPhase('rendering');
    setProgress(0);
    setRecord(null);
    setError(null);
    fetch('/api/export', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ clipId, values, options }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (payload === null) {
          setError('Failed to start render');
          setPhase('error');
          return;
        }
        setExportId((payload as { exportId: string }).exportId);
      })
      .catch(() => {
        setError('Failed to start render');
        setPhase('error');
      });
  };

  const rendering = phase === 'rendering';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export clip</DialogTitle>
          <DialogDescription>Render this clip to a video with your own settings.</DialogDescription>
        </DialogHeader>

        <ExportOptionsForm options={options} onChange={setOptions} disabled={rendering} />

        {rendering ? (
          <div className="flex flex-col gap-2">
            <Progress value={progress} />
            <span className="text-muted-foreground text-xs">Rendering {progress}%</span>
          </div>
        ) : null}

        {phase === 'error' && error !== null ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-destructive text-sm">{error}</p>
        ) : null}

        {phase === 'done' && record !== null ? (
          <div className="flex flex-col gap-3">
            <video
              src={record.mp4}
              poster={record.poster}
              muted
              loop
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black"
            />
            <a
              href={`${record.mp4}?download=1`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-muted px-4 py-2 font-medium text-sm hover:bg-accent"
            >
              <Download className="size-4" />
              Download
            </a>
          </div>
        ) : null}

        <Button type="button" onClick={startRender} disabled={rendering}>
          {rendering ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          {rendering ? 'Rendering' : 'Render'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

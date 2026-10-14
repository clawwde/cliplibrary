'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { MAX_CRF, MIN_CRF } from '@/lib/render-options';
import type { ExportSettings, ExportState } from '@/lib/use-project-export';

const FORMATS: { value: ExportSettings['codec']; label: string }[] = [
  { value: 'h264', label: 'MP4 (H.264)' },
  { value: 'h265', label: 'MP4 (H.265 / HEVC)' },
  { value: 'vp9', label: 'WebM (VP9)' },
  { value: 'prores', label: 'ProRes (MOV)' },
  { value: 'gif', label: 'GIF' },
];

const SCALES: { value: string; label: string }[] = [
  { value: '0.5', label: '0.5x' },
  { value: '1', label: '1x' },
  { value: '2', label: '2x' },
];

const DEFAULT_SETTINGS: ExportSettings = { codec: 'h264', crf: 18, scale: 1 };

const STATUS_LABEL: Record<ExportState, string> = {
  idle: 'Ready to render.',
  rendering: 'Rendering',
  done: 'Render complete.',
  error: 'Render failed. Try again.',
};

interface ExportControlsProps {
  state: ExportState;
  progress: number;
  downloadUrl: string | null;
  onExport: (settings: ExportSettings) => void;
}

export const ExportControls = ({ state, progress, downloadUrl, onExport }: ExportControlsProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<ExportSettings>(DEFAULT_SETTINGS);
  const rendering = state === 'rendering';
  const percent = Math.round(progress * 100);
  const supportsQuality = settings.codec !== 'gif' && settings.codec !== 'prores';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          <Download className="size-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export video</DialogTitle>
          <DialogDescription>Choose a format and quality, then render.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="export-format">Format</Label>
            <Select
              value={settings.codec}
              onValueChange={(value) =>
                setSettings((current) => ({ ...current, codec: value as ExportSettings['codec'] }))
              }
            >
              <SelectTrigger id="export-format" aria-label="Format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="export-scale">Resolution</Label>
            <Select
              value={String(settings.scale)}
              onValueChange={(value) =>
                setSettings((current) => ({ ...current, scale: Number(value) }))
              }
            >
              <SelectTrigger id="export-scale" aria-label="Resolution">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCALES.map((scale) => (
                  <SelectItem key={scale.value} value={scale.value}>
                    {scale.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {supportsQuality ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>Quality</Label>
                <span className="text-muted-foreground text-xs">
                  crf {settings.crf} (
                  {settings.crf <= 18 ? 'high' : settings.crf <= 28 ? 'balanced' : 'small file'})
                </span>
              </div>
              <Slider
                aria-label="Quality"
                min={MIN_CRF}
                max={MAX_CRF}
                step={1}
                value={[settings.crf]}
                onValueChange={([value]) =>
                  setSettings((current) => ({ ...current, crf: value ?? current.crf }))
                }
              />
              <span className="text-muted-foreground text-xs">
                Lower is higher quality and a larger file.
              </span>
            </div>
          ) : null}

          {rendering ? (
            <div className="flex flex-col gap-2">
              <Progress value={percent} />
              <span className="text-muted-foreground text-xs">
                {STATUS_LABEL.rendering} {percent}%
              </span>
            </div>
          ) : (
            <span
              className={
                state === 'error' ? 'text-destructive text-xs' : 'text-muted-foreground text-xs'
              }
            >
              {STATUS_LABEL[state]}
            </span>
          )}
        </div>
        <DialogFooter>
          {state === 'done' && downloadUrl !== null ? (
            <Button type="button" variant="outline" asChild>
              <a href={downloadUrl}>Download</a>
            </Button>
          ) : null}
          <Button type="button" disabled={rendering} onClick={() => onExport(settings)}>
            {rendering ? 'Rendering' : state === 'error' ? 'Retry render' : 'Render'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

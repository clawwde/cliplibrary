'use client';

import {
  getDefaultContainerForCodec,
  getEncodableVideoCodecs,
  renderMediaOnWeb,
  type WebRendererQuality,
  type WebRendererVideoCodec,
} from '@remotion/web-renderer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectComposition } from '@/compositions/project/project-composition';
import type { Project } from '@/project';

export type ExportState = 'idle' | 'rendering' | 'done' | 'error';

const EXPORT_CODECS = ['h264', 'h265', 'vp9', 'av1'] as const;

export type ExportCodec = (typeof EXPORT_CODECS)[number];

export const EXPORT_QUALITIES: WebRendererQuality[] = [
  'very-low',
  'low',
  'medium',
  'high',
  'very-high',
];

export interface ExportSettings {
  codec: ExportCodec;
  quality: WebRendererQuality;
  scale: number;
}

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  codec: 'h264',
  quality: 'high',
  scale: 1,
};

export interface ExportDownload {
  url: string;
  fileName: string;
}

export const listEncodableCodecs = async (): Promise<ExportCodec[]> => {
  const [mp4, webm] = await Promise.all([
    getEncodableVideoCodecs('mp4'),
    getEncodableVideoCodecs('webm'),
  ]);
  const encodable = new Set<WebRendererVideoCodec>([...mp4, ...webm]);
  return EXPORT_CODECS.filter((codec) => encodable.has(codec));
};

const renderProjectToBlob = async (
  project: Project,
  settings: ExportSettings,
  onProgress: (value: number) => void,
): Promise<Blob> => {
  const result = await renderMediaOnWeb({
    composition: {
      id: 'project',
      component: ProjectComposition,
      width: project.width,
      height: project.height,
      fps: project.fps,
      durationInFrames: project.durationInFrames,
      defaultProps: project,
    },
    inputProps: project,
    container: getDefaultContainerForCodec(settings.codec),
    videoCodec: settings.codec,
    videoBitrate: settings.quality,
    scale: settings.scale,
    allowHtmlInCanvas: true,
    onProgress: ({ progress }) => onProgress(progress),
  });
  return result.getBlob();
};

export interface ProjectExport {
  state: ExportState;
  progress: number;
  download: ExportDownload | null;
  error: string | null;
  run: (project: Project, settings: ExportSettings, name: string) => void;
}

export const useProjectExport = (): ProjectExport => {
  const [state, setState] = useState<ExportState>('idle');
  const [progress, setProgress] = useState(0);
  const [download, setDownload] = useState<ExportDownload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef<string | null>(null);

  const replaceUrl = useCallback((next: string | null) => {
    if (urlRef.current !== null) {
      URL.revokeObjectURL(urlRef.current);
    }
    urlRef.current = next;
  }, []);

  useEffect(() => () => replaceUrl(null), [replaceUrl]);

  const run = useCallback(
    (project: Project, settings: ExportSettings, name: string) => {
      replaceUrl(null);
      setState('rendering');
      setProgress(0);
      setDownload(null);
      setError(null);
      renderProjectToBlob(project, settings, setProgress)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          replaceUrl(url);
          const extension = getDefaultContainerForCodec(settings.codec);
          setDownload({ url, fileName: `${name}.${extension}` });
          setProgress(1);
          setState('done');
        })
        .catch((reason: unknown) => {
          setError(reason instanceof Error ? reason.message : String(reason));
          setState('error');
        });
    },
    [replaceUrl],
  );

  return { state, progress, download, error, run };
};

'use client';

import { useCallback, useState } from 'react';
import type { Project } from '@/project';
import type { RenderCodec } from './render-options';

export type ExportState = 'idle' | 'rendering' | 'done' | 'error';

export interface ExportSettings {
  codec: RenderCodec;
  crf: number;
  scale: number;
  fps: number | null;
  proResProfile: string | null;
}

interface StatusResponse {
  status: ExportState;
  error?: string | null;
  progress?: number;
}

const MAX_ATTEMPTS = 600;

interface PollContext {
  exportId: string;
  onProgress: (value: number) => void;
  resolve: (url: string) => void;
  reject: (error: Error) => void;
  retry: () => void;
}

const applyStatus = (status: StatusResponse | null, context: PollContext): void => {
  if (status === null) {
    context.retry();
    return;
  }
  if (typeof status.progress === 'number') {
    context.onProgress(status.progress);
  }
  if (status.status === 'done') {
    context.resolve(`/api/project-export/${context.exportId}/file?download=1`);
    return;
  }
  if (status.status === 'error') {
    context.reject(new Error(status.error ?? 'render failed'));
    return;
  }
  context.retry();
};

const pollExport = (exportId: string, onProgress: (value: number) => void): Promise<string> =>
  new Promise((resolve, reject) => {
    let attempts = 0;
    const tick = (): void => {
      attempts += 1;
      const retry = (): void => {
        if (attempts >= MAX_ATTEMPTS) {
          reject(new Error('render timed out'));
        } else {
          setTimeout(tick, 1000);
        }
      };
      fetch(`/api/project-export/${exportId}`)
        .then((response) => (response.ok ? (response.json() as Promise<StatusResponse>) : null))
        .then((status) => applyStatus(status, { exportId, onProgress, resolve, reject, retry }))
        .catch(() => reject(new Error('render failed')));
    };
    tick();
  });

const startExport = async (
  project: Project,
  settings: ExportSettings,
  onProgress: (value: number) => void,
): Promise<string> => {
  const response = await fetch('/api/project-export', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ project, options: settings }),
  });
  if (!response.ok) {
    throw new Error('export request failed');
  }
  const { exportId } = (await response.json()) as { exportId: string };
  return pollExport(exportId, onProgress);
};

export interface ProjectExport {
  state: ExportState;
  progress: number;
  downloadUrl: string | null;
  run: (project: Project, settings: ExportSettings) => void;
}

export const useProjectExport = (): ProjectExport => {
  const [state, setState] = useState<ExportState>('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const run = useCallback((project: Project, settings: ExportSettings) => {
    setState('rendering');
    setProgress(0);
    setDownloadUrl(null);
    startExport(project, settings, setProgress)
      .then((url) => {
        setDownloadUrl(url);
        setProgress(1);
        setState('done');
      })
      .catch(() => setState('error'));
  }, []);

  return { state, progress, downloadUrl, run };
};

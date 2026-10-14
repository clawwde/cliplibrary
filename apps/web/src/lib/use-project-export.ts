'use client';

import type { Project } from '@cliplibrary/project';
import { useCallback, useState } from 'react';

export type ExportState = 'idle' | 'rendering' | 'done' | 'error';

interface StatusResponse {
  status: ExportState;
  error?: string | null;
}

const MAX_ATTEMPTS = 600;

const pollExport = (exportId: string): Promise<string> =>
  new Promise((resolve, reject) => {
    let attempts = 0;
    const tick = (): void => {
      attempts += 1;
      fetch(`/api/project-export/${exportId}`)
        .then((response) => (response.ok ? (response.json() as Promise<StatusResponse>) : null))
        .then((status) => {
          if (status?.status === 'done') {
            resolve(`/api/export/${exportId}/file?download=1`);
          } else if (status?.status === 'error') {
            reject(new Error(status.error ?? 'render failed'));
          } else if (attempts >= MAX_ATTEMPTS) {
            reject(new Error('render timed out'));
          } else {
            setTimeout(tick, 1000);
          }
        })
        .catch(() => reject(new Error('render failed')));
    };
    tick();
  });

const startExport = async (project: Project): Promise<string> => {
  const response = await fetch('/api/project-export', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ project }),
  });
  if (!response.ok) {
    throw new Error('export request failed');
  }
  const { exportId } = (await response.json()) as { exportId: string };
  return pollExport(exportId);
};

export interface ProjectExport {
  state: ExportState;
  downloadUrl: string | null;
  run: (project: Project) => void;
}

export const useProjectExport = (): ProjectExport => {
  const [state, setState] = useState<ExportState>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const run = useCallback((project: Project) => {
    setState('rendering');
    setDownloadUrl(null);
    startExport(project)
      .then((url) => {
        setDownloadUrl(url);
        setState('done');
      })
      .catch(() => setState('error'));
  }, []);

  return { state, downloadUrl, run };
};

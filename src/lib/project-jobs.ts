import 'server-only';

export interface ProjectJob {
  exportId: string;
  status: 'rendering' | 'done' | 'error';
  progress: number;
  error: string | null;
}

const jobs = new Map<string, ProjectJob>();

export const setProjectJob = (job: ProjectJob): void => {
  jobs.set(job.exportId, job);
};

export const updateProjectJob = (
  exportId: string,
  patch: Partial<ProjectJob>,
): ProjectJob | null => {
  const current = jobs.get(exportId);
  if (current === undefined) {
    return null;
  }
  const next = { ...current, ...patch };
  jobs.set(exportId, next);
  return next;
};

export const getProjectJob = (exportId: string): ProjectJob | null => jobs.get(exportId) ?? null;

import 'server-only';
import type { ExportRecord } from '@cliplibrary/core';

const jobs = new Map<string, ExportRecord>();

export const setJob = (record: ExportRecord): void => {
  jobs.set(record.exportId, record);
};

export const updateJob = (exportId: string, patch: Partial<ExportRecord>): ExportRecord | null => {
  const current = jobs.get(exportId);
  if (current === undefined) {
    return null;
  }
  const next = { ...current, ...patch };
  jobs.set(exportId, next);
  return next;
};

export const getJob = (exportId: string): ExportRecord | null => jobs.get(exportId) ?? null;

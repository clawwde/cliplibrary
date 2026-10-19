import { repoPaths } from './fs-paths';
import { readJsonFile, writeJsonFile } from './json-file';
import type { ExportRecord } from './types';

export const readExports = async (root: string): Promise<ExportRecord[]> => {
  const manifest = await readJsonFile<ExportRecord[]>(repoPaths(root).exportsManifest);
  return manifest ?? [];
};

export const appendExport = async (root: string, record: ExportRecord): Promise<ExportRecord[]> => {
  const manifest = await readExports(root);
  const next = [record, ...manifest];
  await writeJsonFile(repoPaths(root).exportsManifest, next);
  return next;
};

export const updateExport = async (
  root: string,
  exportId: string,
  patch: Partial<ExportRecord>,
): Promise<ExportRecord | null> => {
  const manifest = await readExports(root);
  let updated: ExportRecord | null = null;
  const next = manifest.map((record) => {
    if (record.exportId !== exportId) {
      return record;
    }
    updated = { ...record, ...patch };
    return updated;
  });
  if (updated === null) {
    return null;
  }
  await writeJsonFile(repoPaths(root).exportsManifest, next);
  return updated;
};

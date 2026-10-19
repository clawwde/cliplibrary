import 'server-only';
import { existsSync, readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type ExportRecord, readExports } from '@/core';
import { CLIP_REGISTRY, type ClipMeta } from '@/schemas';
import { repoRoot } from './repo-root';

const publicExports = (root: string): string => join(root, 'public', 'exports');

const hasRenderedVideo = (root: string, exportId: string): boolean => {
  try {
    return readdirSync(join(publicExports(root), exportId)).some((name) => !name.endsWith('.jpg'));
  } catch {
    return false;
  }
};

const readFirstFrame = async (root: string, meta: ClipMeta): Promise<string | null> => {
  try {
    const bytes = await readFile(join(publicExports(root), `${meta.id}.first-frame.jpg`));
    return `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    return null;
  }
};

export interface ClipListItem {
  meta: ClipMeta;
  video: string | null;
  firstFrame: string | null;
}

export const listClips = (): Promise<ClipListItem[]> => {
  const root = repoRoot();
  return Promise.all(
    CLIP_REGISTRY.map(async (meta) => ({
      meta,
      video: existsSync(join(publicExports(root), `${meta.id}.mp4`))
        ? `/exports/${meta.id}.mp4`
        : null,
      firstFrame: await readFirstFrame(root, meta),
    })),
  );
};

export const listExports = async (): Promise<ExportRecord[]> => {
  const root = repoRoot();
  const records = await readExports(root);
  return records.filter(
    (record) => record.status === 'done' && hasRenderedVideo(root, record.exportId),
  );
};

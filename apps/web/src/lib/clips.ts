import 'server-only';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { type ExportRecord, type PropsFile, readExports, readProps } from '@cliplibrary/core';
import { CLIP_REGISTRY, type ClipId, type ClipMeta } from '@cliplibrary/schemas';
import { repoRoot } from './repo-root';

const hasRenderedVideo = (root: string, exportId: string): boolean => {
  try {
    return readdirSync(join(root, 'apps', 'web', 'public', 'exports', exportId)).some(
      (name) => !name.endsWith('.jpg'),
    );
  } catch {
    return false;
  }
};

const hasClipVideo = (root: string, id: ClipId): boolean =>
  existsSync(join(root, 'apps', 'web', 'public', 'exports', `${id}.mp4`));

export interface ClipListItem {
  meta: ClipMeta;
  props: PropsFile;
  hasVideo: boolean;
}

export const listClips = (): Promise<ClipListItem[]> => {
  const root = repoRoot();
  return Promise.all(
    CLIP_REGISTRY.map(async (meta) => ({
      meta,
      props: await readProps(root, meta.id),
      hasVideo: hasClipVideo(root, meta.id),
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

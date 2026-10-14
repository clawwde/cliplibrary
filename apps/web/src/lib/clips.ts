import 'server-only';
import { type ExportRecord, type PropsFile, readExports, readProps } from '@cliplibrary/core';
import { CLIP_REGISTRY, type ClipId, type ClipMeta, getClipMeta } from '@cliplibrary/schemas';
import { repoRoot } from './repo-root';

export interface ClipListItem {
  meta: ClipMeta;
  props: PropsFile;
}

export const listClips = (): Promise<ClipListItem[]> => {
  const root = repoRoot();
  return Promise.all(
    CLIP_REGISTRY.map(async (meta) => ({ meta, props: await readProps(root, meta.id) })),
  );
};

export const getClip = async (id: ClipId): Promise<ClipListItem> => {
  const root = repoRoot();
  return { meta: getClipMeta(id), props: await readProps(root, id) };
};

export const listExports = async (): Promise<ExportRecord[]> => readExports(repoRoot());

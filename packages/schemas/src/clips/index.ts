import type { z } from 'zod';
import type { ClipId, ClipPropsMap } from '../clip-props';
import type { ClipMeta, ClipModule } from '../registry';
import { complexClips } from './complex';
import { dataClips } from './data';
import { mediaClips } from './media';
import { textClips } from './text';

export const CLIP_MODULES: ClipModule[] = [
  ...textClips,
  ...dataClips,
  ...mediaClips,
  ...complexClips,
];

export const CLIP_IDS: readonly ClipId[] = CLIP_MODULES.map((module) => module.id);

export const CLIP_REGISTRY: readonly ClipMeta[] = CLIP_MODULES.map((module) => module.meta);

export const CLIP_SCHEMAS = Object.fromEntries(
  CLIP_MODULES.map((module) => [module.id, module.schema]),
) as Record<ClipId, z.ZodType>;

export const CLIP_DEFAULTS = Object.fromEntries(
  CLIP_MODULES.map((module) => [module.id, module.defaults]),
) as { [Id in ClipId]: ClipPropsMap[Id] };

const REGISTRY_BY_ID = Object.fromEntries(CLIP_REGISTRY.map((meta) => [meta.id, meta])) as Record<
  ClipId,
  ClipMeta
>;

export const isClipId = (value: string): value is ClipId => Object.hasOwn(REGISTRY_BY_ID, value);

export const getClipMeta = (id: ClipId): ClipMeta => REGISTRY_BY_ID[id];

export const getClipSchema = (id: ClipId): z.ZodType => CLIP_SCHEMAS[id];

export const getClipDefaults = <Id extends ClipId>(id: Id): ClipPropsMap[Id] => CLIP_DEFAULTS[id];

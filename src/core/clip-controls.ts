import type { z } from 'zod';
import type { ClipControls, ControlField } from '@/schemas';
import { describeSchema } from './schema-introspect';
import type {
  AddressableDescriptor,
  ControlDescriptor,
  ControlEntry,
  ControlSectionView,
} from './types';

export const humanizeKey = (key: string): string => {
  const words = key
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const flatten = (descriptors: ControlDescriptor[]): AddressableDescriptor[] =>
  descriptors.flatMap((descriptor) =>
    descriptor.kind === 'object' ? flatten(descriptor.fields) : [descriptor],
  );

export const describeControlPaths = (schema: z.ZodType): Map<string, AddressableDescriptor> =>
  new Map(
    flatten(describeSchema(schema)).map((descriptor) => [descriptor.path.join('.'), descriptor]),
  );

const fieldPaths = (field: ControlField): string[] => {
  if (typeof field === 'string') {
    return [field];
  }
  return 'link' in field ? [...field.link] : [field.path];
};

const lastKey = (path: string[]): string => path.at(-1) ?? '';

const sameShape = (left: AddressableDescriptor, right: AddressableDescriptor): boolean => {
  if (left.kind === 'array' || right.kind === 'array') {
    return false;
  }
  if (left.kind === 'number' && right.kind === 'number') {
    return left.min === right.min && left.max === right.max && left.step === right.step;
  }
  if (left.kind === 'enum' && right.kind === 'enum') {
    return left.options.join('|') === right.options.join('|');
  }
  return left.kind === right.kind;
};

const relabelItems = (
  items: ControlDescriptor[],
  labels: Record<string, string>,
): ControlDescriptor[] =>
  items.map((item) => ({
    ...item,
    label: labels[lastKey(item.path)] ?? humanizeKey(lastKey(item.path)),
  }));

const withLabel = (
  descriptor: AddressableDescriptor,
  label: string,
  items: Record<string, string>,
): AddressableDescriptor =>
  descriptor.kind === 'array'
    ? { ...descriptor, label, item: relabelItems(descriptor.item, items) }
    : { ...descriptor, label };

export const resolveClipControls = (
  schema: z.ZodType,
  controls: ClipControls,
): ControlSectionView[] => {
  const byPath = describeControlPaths(schema);
  const lookup = (path: string): AddressableDescriptor => {
    const descriptor = byPath.get(path);
    if (descriptor === undefined) {
      throw new Error(`Unknown control path "${path}"`);
    }
    return descriptor;
  };

  const resolve = (field: ControlField): ControlEntry => {
    const paths = fieldPaths(field);
    const descriptors = paths.map(lookup);
    const [primary] = descriptors;
    if (primary === undefined) {
      throw new Error('A control field needs at least one path');
    }
    const mismatch = descriptors.find((descriptor) => !sameShape(primary, descriptor));
    if (descriptors.length > 1 && mismatch !== undefined) {
      throw new Error(`Cannot link "${paths[0]}" with "${mismatch.path.join('.')}"`);
    }
    const label =
      typeof field === 'string' || field.label === undefined
        ? humanizeKey(lastKey(primary.path))
        : field.label;
    const items = typeof field !== 'string' && 'items' in field ? (field.items ?? {}) : {};
    return {
      id: paths.join('+'),
      descriptor: withLabel(primary, label, items),
      hint: typeof field === 'string' ? null : (field.hint ?? null),
      targets: descriptors.map((descriptor) => descriptor.path),
    };
  };

  return controls.sections.map((section) => ({
    title: section.title,
    fields: section.fields.map(resolve),
    more: (section.more ?? []).map(resolve),
  }));
};

export type ControlCoverage = {
  missing: string[];
  repeated: string[];
  unknown: string[];
};

export const auditClipControls = (schema: z.ZodType, controls: ClipControls): ControlCoverage => {
  const known = describeControlPaths(schema);
  const fields = controls.sections.flatMap((section) => [
    ...section.fields,
    ...(section.more ?? []),
  ]);
  const singles = [
    ...fields
      .filter((field) => typeof field === 'string' || !('link' in field))
      .flatMap(fieldPaths),
    ...(controls.hidden ?? []),
  ];
  const linked = fields
    .filter((field) => typeof field !== 'string' && 'link' in field)
    .flatMap(fieldPaths);
  const covered = new Set([...singles, ...linked]);
  return {
    missing: [...known.keys()].filter((path) => !covered.has(path)),
    repeated: singles.filter((path, index) => singles.indexOf(path) !== index),
    unknown: [...covered].filter((path) => !known.has(path)),
  };
};

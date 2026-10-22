'use client';

import {
  createEllipse,
  createIcon,
  createLine,
  createPolygon,
  createRect,
  createStar,
  type DesignElement,
  linear,
} from '@/design';
import { IconGrid } from '../panels/icon-grid';
import { ShapePreview } from './shape-preview';

interface ShapePreset {
  label: string;
  create: () => DesignElement;
}

const SHAPES: ShapePreset[] = [
  { label: 'Square', create: () => createRect({ name: 'Square' }) },
  {
    label: 'Rounded',
    create: () =>
      createRect({ name: 'Rounded rectangle', width: 420, height: 260, cornerRadius: 40 }),
  },
  {
    label: 'Pill',
    create: () =>
      createRect({ name: 'Pill', width: 420, height: 120, cornerRadius: 60, fill: '#111827' }),
  },
  { label: 'Circle', create: () => createEllipse() },
  { label: 'Triangle', create: () => createPolygon() },
  {
    label: 'Diamond',
    create: () => createPolygon({ name: 'Diamond', sides: 4, fill: '#06b6d4' }),
  },
  {
    label: 'Pentagon',
    create: () => createPolygon({ name: 'Pentagon', sides: 5, fill: '#f43f5e' }),
  },
  {
    label: 'Hexagon',
    create: () => createPolygon({ name: 'Hexagon', sides: 6, fill: '#8b5cf6' }),
  },
  { label: 'Star', create: () => createStar() },
  {
    label: 'Burst',
    create: () => createStar({ name: 'Burst', points: 16, innerRatio: 0.78, fill: '#f97316' }),
  },
  {
    label: 'Gradient',
    create: () =>
      createRect({
        name: 'Gradient block',
        cornerRadius: 32,
        fill: linear(135, '#7c3aed', '#ec4899'),
      }),
  },
  {
    label: 'Outline',
    create: () =>
      createRect({
        name: 'Outline box',
        fill: 'rgba(0,0,0,0)',
        strokeWidth: 8,
        stroke: '#111827',
        cornerRadius: 24,
      }),
  },
];

const LINES: ShapePreset[] = [
  { label: 'Line', create: () => createLine() },
  {
    label: 'Dashed',
    create: () => createLine({ name: 'Dashed line', dashed: true }),
  },
  { label: 'Arrow', create: () => createLine({ name: 'Arrow', arrowEnd: true }) },
  {
    label: 'Double arrow',
    create: () => createLine({ name: 'Double arrow', arrowEnd: true, arrowStart: true }),
  },
];

const PresetGrid = ({
  presets,
  onAdd,
}: {
  presets: ShapePreset[];
  onAdd: (element: DesignElement) => void;
}) => (
  <div className="grid grid-cols-4 gap-2">
    {presets.map((preset) => (
      <button
        type="button"
        key={preset.label}
        title={preset.label}
        aria-label={`Add ${preset.label}`}
        onClick={() => onAdd(preset.create())}
        className="flex aspect-square items-center justify-center rounded-lg bg-muted/70 transition-colors hover:bg-accent"
      >
        <ShapePreview element={preset.create()} />
      </button>
    ))}
  </div>
);

export const ElementsPanel = ({ onAdd }: { onAdd: (element: DesignElement) => void }) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">Shapes</h4>
      <PresetGrid presets={SHAPES} onAdd={onAdd} />
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">Lines</h4>
      <PresetGrid presets={LINES} onAdd={onAdd} />
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">Icons</h4>
      <IconGrid columns={5} onPick={(icon) => onAdd(createIcon({ icon, name: icon }))} />
    </div>
  </div>
);

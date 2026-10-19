'use client';

import { type Element, SHAPE_KINDS, type ShapeKind } from '@/project';
import { ColorField, SelectField, SliderField, TextareaField, TextField } from './fields';
import { MediaField } from './media-field';

interface ContentSectionProps {
  element: Element;
  onChange: (next: Element) => void;
}

export const ContentSection = ({ element, onChange }: ContentSectionProps) => {
  if (element.type === 'text') {
    return (
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Text</h3>
        <TextareaField
          label="Content"
          value={element.content}
          onChange={(content) => onChange({ ...element, content })}
        />
        <SliderField
          label="Font size"
          value={element.fontSize}
          min={8}
          max={400}
          step={1}
          onChange={(fontSize) => onChange({ ...element, fontSize })}
        />
        <ColorField
          label="Color"
          value={element.color}
          onChange={(color) => onChange({ ...element, color })}
        />
        <TextField
          label="Font family"
          value={element.fontFamily}
          onChange={(fontFamily) => onChange({ ...element, fontFamily })}
        />
      </div>
    );
  }

  if (element.type === 'composition') {
    return null;
  }

  if (element.type === 'shape') {
    return (
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Shape</h3>
        <SelectField
          label="Kind"
          value={element.kind}
          options={SHAPE_KINDS}
          onChange={(kind) => onChange({ ...element, kind: kind as ShapeKind })}
        />
        <ColorField
          label="Color"
          value={element.color}
          onChange={(color) => onChange({ ...element, color })}
        />
        <div className="grid grid-cols-2 gap-3">
          <SliderField
            label="Width"
            value={element.width}
            min={8}
            max={2400}
            step={1}
            onChange={(width) => onChange({ ...element, width })}
          />
          <SliderField
            label="Height"
            value={element.height}
            min={8}
            max={2400}
            step={1}
            onChange={(height) => onChange({ ...element, height })}
          />
        </div>
        <SliderField
          label="Corner radius"
          value={element.radius}
          min={0}
          max={600}
          step={1}
          onChange={(radius) => onChange({ ...element, radius })}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">{element.type === 'image' ? 'Image' : 'Video'}</h3>
      <MediaField
        label="Source"
        accept={element.type === 'image' ? 'image/*' : 'video/*'}
        value={element.src}
        onChange={(src) => onChange({ ...element, src })}
      />
    </div>
  );
};

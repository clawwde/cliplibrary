'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import type { Element } from '@cliplibrary/project';
import { getClipMeta, isClipId } from '@cliplibrary/schemas';
import { Trash2 } from 'lucide-react';
import { PropertiesPanel } from '@/components/editor/properties-panel';
import { AnimationSection } from '@/components/timeline/property-panel/animation-section';
import { PropertyPanel } from '@/components/timeline/property-panel/property-panel';
import { TimingSection } from '@/components/timeline/property-panel/timing-section';
import { TransformSection } from '@/components/timeline/property-panel/transform-section';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ClipPropertySidebarProps {
  element: Element | null;
  descriptorsByClip: Record<string, ControlDescriptor[]>;
  onChange: (next: Element) => void;
  onDelete: (id: string) => void;
}

export const ClipPropertySidebar = ({
  element,
  descriptorsByClip,
  onChange,
  onDelete,
}: ClipPropertySidebarProps) => {
  if (element === null) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Select an element on the timeline to edit its properties.
      </div>
    );
  }

  if (element.type !== 'composition') {
    return <PropertyPanel element={element} onChange={onChange} onDelete={onDelete} />;
  }

  const descriptors = descriptorsByClip[element.clipId] ?? [];
  const clipTitle = isClipId(element.clipId) ? getClipMeta(element.clipId).title : element.clipId;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="truncate font-semibold text-sm">{clipTitle}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Delete element"
          onClick={() => onDelete(element.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <PropertiesPanel
        descriptors={descriptors}
        values={element.props}
        onChange={(values) => onChange({ ...element, props: values })}
      />
      <Separator />
      <TransformSection element={element} onChange={onChange} />
      <Separator />
      <TimingSection element={element} onChange={onChange} />
      <Separator />
      <AnimationSection element={element} onChange={onChange} />
    </div>
  );
};

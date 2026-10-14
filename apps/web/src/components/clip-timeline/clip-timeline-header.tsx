'use client';

import type { VersionSnapshot } from '@cliplibrary/core';
import { Check, Save } from 'lucide-react';
import { VersionDropdown } from '@/components/editor/version-dropdown';
import { Button } from '@/components/ui/button';

interface ClipTimelineHeaderProps {
  title: string;
  status: string;
  dirty: boolean;
  saving: boolean;
  saveFailed: boolean;
  snapshots: VersionSnapshot[];
  currentVersionId: string;
  onSave: () => void;
  onRevert: (versionId: string) => void;
}

export const ClipTimelineHeader = ({
  title,
  status,
  dirty,
  saving,
  saveFailed,
  snapshots,
  currentVersionId,
  onSave,
  onRevert,
}: ClipTimelineHeaderProps) => (
  <div className="sticky top-0 z-10 flex flex-col gap-2 bg-sidebar/80 px-4 py-3 backdrop-blur">
    <div className="flex items-center justify-between gap-2">
      <span className="truncate font-semibold text-sm">{title}</span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label="Save"
        disabled={saving || !dirty}
        onClick={onSave}
      >
        <Save className="size-4" />
        Save
      </Button>
    </div>
    <div className="flex items-center justify-between gap-2">
      <VersionDropdown
        snapshots={snapshots}
        currentVersionId={currentVersionId}
        onSelect={onRevert}
      />
      <span className="flex items-center gap-1 text-muted-foreground text-xs">
        {dirty || saveFailed ? null : <Check className="size-3.5" />}
        {status}
      </span>
    </div>
  </div>
);

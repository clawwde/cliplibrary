'use client';

import type { VersionSnapshot } from '@cliplibrary/core';
import { History } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const formatSnapshot = (snapshot: VersionSnapshot): string => {
  const stamp = new Date(snapshot.createdAt).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return snapshot.label === null ? stamp : `${stamp} · ${snapshot.label}`;
};

export const VersionDropdown = ({
  snapshots,
  currentVersionId,
  onSelect,
  disabled = false,
}: {
  snapshots: VersionSnapshot[];
  currentVersionId: string;
  onSelect: (versionId: string) => void;
  disabled?: boolean;
}) => {
  const known = snapshots.some((snapshot) => snapshot.versionId === currentVersionId);
  return (
    <Select value={currentVersionId} onValueChange={onSelect} disabled={disabled}>
      <SelectTrigger
        size="sm"
        aria-label="Current version"
        className="max-w-[12rem] gap-2 bg-transparent shadow-none"
      >
        <History className="size-3.5" />
        <SelectValue placeholder="Current version" />
      </SelectTrigger>
      <SelectContent align="end">
        {known ? null : <SelectItem value={currentVersionId}>Current (unsaved)</SelectItem>}
        {snapshots.map((snapshot) => (
          <SelectItem key={snapshot.versionId} value={snapshot.versionId}>
            {formatSnapshot(snapshot)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

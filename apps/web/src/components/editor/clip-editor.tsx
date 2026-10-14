'use client';

import type { ControlDescriptor, PropsFile, VersionSnapshot } from '@cliplibrary/core';
import type { ClipId, ClipMeta } from '@cliplibrary/schemas';
import { Check, Download, Redo2, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUndoable, useUndoRedoKeys } from '@/lib/use-undoable';
import { ChatPanel } from '../chat/chat-panel';
import { CommitBar } from './commit-bar';
import { ExportDialog } from './export-dialog';
import { PreviewStage } from './preview-stage';
import { PropertiesPanel } from './properties-panel';
import { VersionDropdown } from './version-dropdown';

type Values = Record<string, unknown>;
type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export const ClipEditor = ({
  clipId,
  meta,
  descriptors,
  initialValues,
  initialHistory,
  initialVersionId,
}: {
  clipId: ClipId;
  meta: ClipMeta;
  descriptors: ControlDescriptor[];
  initialValues: Values;
  initialHistory: VersionSnapshot[];
  initialVersionId: string;
}) => {
  const {
    value: values,
    set: setValues,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoable<Values>(initialValues);
  useUndoRedoKeys(undo, redo);
  const [exportOpen, setExportOpen] = useState(false);
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>(initialHistory);
  const [currentVersionId, setCurrentVersionId] = useState(initialVersionId);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initialValues));
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const dirty = JSON.stringify(values) !== savedJson;

  const adopt = (file: PropsFile, label: string | null): void => {
    const next = file.values as Values;
    setSavedJson(JSON.stringify(next));
    setCurrentVersionId(file.currentVersionId);
    setSnapshots((prev) => [
      { versionId: file.currentVersionId, createdAt: file.updatedAt, label, values: next },
      ...prev,
    ]);
  };

  const save = (): void => {
    setSaveState('saving');
    fetch(`/api/clips/${clipId}/props`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ values }),
    })
      .then((response) => (response.ok ? (response.json() as Promise<PropsFile>) : null))
      .then((file) => {
        if (file === null) {
          setSaveState('error');
          return;
        }
        adopt(file, null);
        setSaveState('saved');
      })
      .catch(() => setSaveState('error'));
  };

  const revert = (versionId: string): void => {
    if (versionId === currentVersionId) {
      return;
    }
    fetch(`/api/clips/${clipId}/history`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ versionId }),
    })
      .then((response) => (response.ok ? (response.json() as Promise<PropsFile>) : null))
      .then((file) => {
        if (file === null) {
          return;
        }
        reset(file.values as Values);
        adopt(file, `revert of ${versionId}`);
        setSaveState('saved');
      })
      .catch(() => setSaveState('error'));
  };

  const saving = saveState === 'saving';
  const status = saving
    ? 'Saving…'
    : saveState === 'error'
      ? 'Save failed'
      : dirty
        ? 'Unsaved changes'
        : 'Saved';

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1fr_340px] lg:grid-cols-[280px_1fr_380px]">
      <aside className="hidden min-h-0 overflow-y-auto bg-sidebar lg:block">
        <ChatPanel />
      </aside>

      <section className="flex min-h-0 min-w-0 flex-col bg-muted/30">
        <PreviewStage clipId={clipId} meta={meta} values={values} />
      </section>

      <aside className="flex min-h-0 flex-col overflow-y-auto bg-sidebar">
        <div className="sticky top-0 z-10 flex flex-col gap-2 bg-sidebar/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-semibold text-sm">{meta.title}</span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Undo"
                title="Undo (Cmd/Ctrl+Z)"
                disabled={!canUndo}
                onClick={undo}
              >
                <Undo2 className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Redo"
                title="Redo (Cmd/Ctrl+Shift+Z)"
                disabled={!canRedo}
                onClick={redo}
              >
                <Redo2 className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Save"
                disabled={saving || !dirty}
                onClick={save}
              >
                <Save className="size-4" />
                Save
              </Button>
              <Button type="button" size="sm" onClick={() => setExportOpen(true)}>
                <Download className="size-4" />
                Export
              </Button>
              <ExportDialog
                clipId={clipId}
                values={values}
                open={exportOpen}
                onOpenChange={setExportOpen}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <VersionDropdown
              snapshots={snapshots}
              currentVersionId={currentVersionId}
              onSelect={revert}
            />
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              {!dirty && saveState !== 'error' ? <Check className="size-3.5" /> : null}
              {status}
            </span>
          </div>
        </div>
        <div className="p-4">
          <PropertiesPanel descriptors={descriptors} values={values} onChange={setValues} />
        </div>
        <CommitBar />
      </aside>
    </div>
  );
};

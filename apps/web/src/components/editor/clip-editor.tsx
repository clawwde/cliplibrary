'use client';

import type { ControlDescriptor } from '@cliplibrary/core';
import type { ClipId, ClipMeta } from '@cliplibrary/schemas';
import { Download, Redo2, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUndoable, useUndoRedoKeys } from '@/lib/use-undoable';
import { ChatPanel } from '../chat/chat-panel';
import { ExportDialog } from './export-dialog';
import { PreviewStage } from './preview-stage';
import { PropertiesPanel } from './properties-panel';

type Values = Record<string, unknown>;

export const ClipEditor = ({
  clipId,
  meta,
  descriptors,
  initialValues,
}: {
  clipId: ClipId;
  meta: ClipMeta;
  descriptors: ControlDescriptor[];
  initialValues: Values;
}) => {
  const {
    value: values,
    set: setValues,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoable<Values>(initialValues);
  useUndoRedoKeys(undo, redo);
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1fr_340px] lg:grid-cols-[280px_1fr_380px]">
      <aside className="hidden min-h-0 overflow-y-auto bg-sidebar lg:block">
        <ChatPanel />
      </aside>

      <section className="flex min-h-0 min-w-0 flex-col bg-muted/30">
        <PreviewStage clipId={clipId} meta={meta} values={values} />
      </section>

      <aside className="flex min-h-0 flex-col overflow-y-auto bg-sidebar">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 bg-sidebar/80 px-4 py-3 backdrop-blur">
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
        <div className="p-4">
          <PropertiesPanel descriptors={descriptors} values={values} onChange={setValues} />
        </div>
      </aside>
    </div>
  );
};

'use client';

import type { CommitResult } from '@cliplibrary/core';
import { ChevronDown, GitCommitVertical, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { buildCommitBody, DEFAULT_COMMIT_COMMAND } from '@/lib/commit-request';
import { usePersistedState } from '@/lib/use-persisted-state';
import { cn } from '@/lib/utils';

type Phase = 'idle' | 'running' | 'done';

const CommitOutput = ({ result }: { result: CommitResult }) => {
  const succeeded = result.exitCode === 0;
  const stdout = result.stdout.trim();
  const stderr = result.stderr.trim();
  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn('font-medium text-xs', succeeded ? 'text-emerald-500' : 'text-destructive')}
      >
        {succeeded ? 'Committed' : `Failed (exit ${String(result.exitCode)})`}
      </span>
      {stdout === '' ? null : (
        <pre className="max-h-40 overflow-auto rounded-md bg-muted px-3 py-2 text-xs">{stdout}</pre>
      )}
      {stderr === '' ? null : (
        <pre className="max-h-40 overflow-auto rounded-md bg-destructive/10 px-3 py-2 text-destructive text-xs">
          {stderr}
        </pre>
      )}
    </div>
  );
};

export const CommitBar = () => {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = usePersistedState(
    'cliplibrary-commit-command',
    DEFAULT_COMMIT_COMMAND,
  );
  const [message, setMessage] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<CommitResult | null>(null);

  const runCommit = (): void => {
    setPhase('running');
    setResult(null);
    fetch('/api/commit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(buildCommitBody(command, message)),
    })
      .then((response) => response.json() as Promise<CommitResult>)
      .then((payload) => {
        setResult(payload);
        setPhase('done');
      })
      .catch((error: unknown) => {
        setResult({
          command,
          exitCode: -1,
          stdout: '',
          stderr: error instanceof Error ? error.message : 'Request failed',
        });
        setPhase('done');
      });
  };

  const running = phase === 'running';

  return (
    <section className="border-border/60 border-t">
      <button
        type="button"
        aria-label="Toggle commit panel"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-sm"
      >
        <span className="flex items-center gap-2">
          <GitCommitVertical className="size-4" />
          Commit
        </span>
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <div className="flex flex-col gap-3 px-4 pb-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="commit-command" className="text-muted-foreground text-xs">
              Command
            </Label>
            <Input
              id="commit-command"
              value={command}
              aria-label="Commit command"
              spellCheck={false}
              className="font-mono text-xs"
              onChange={(event) => setCommand(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="commit-message" className="text-muted-foreground text-xs">
              Message
            </Label>
            <Textarea
              id="commit-message"
              value={message}
              aria-label="Commit message"
              placeholder="Describe this change"
              rows={2}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <Button
            type="button"
            size="sm"
            disabled={running || message.trim() === ''}
            onClick={runCommit}
          >
            {running ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <GitCommitVertical className="size-4" />
            )}
            {running ? 'Committing' : 'Commit'}
          </Button>

          {result === null ? null : <CommitOutput result={result} />}
        </div>
      ) : null}
    </section>
  );
};

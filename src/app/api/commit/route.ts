import { NextResponse } from 'next/server';
import { runCommitCommand } from '@/core';
import { DEFAULT_COMMIT_COMMAND } from '@/lib/commit-request';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

export const POST = async (request: Request): Promise<Response> => {
  const body = (await request.json()) as { command?: string; message?: string };
  const command = body.command?.trim() ? body.command : DEFAULT_COMMIT_COMMAND;
  const message = body.message ?? '';
  const result = await runCommitCommand(repoRoot(), command, message);
  return NextResponse.json(result);
};

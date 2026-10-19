import { spawn } from 'node:child_process';
import type { CommitResult } from './types';

export const DEFAULT_COMMIT_COMMAND = 'git add -A && git commit -m "{{message}}"';

export const shellEscape = (value: string): string => `'${value.replaceAll("'", `'\\''`)}'`;

export const buildCommitCommand = (template: string, message: string): string =>
  template.replaceAll('{{message}}', shellEscape(message));

export const runCommand = (cwd: string, command: string): Promise<CommitResult> =>
  new Promise((resolve) => {
    const child = spawn('bash', ['-lc', command], { cwd });
    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on('close', (code) => {
      resolve({ command, exitCode: code ?? -1, stdout, stderr });
    });
    child.on('error', (error) => {
      resolve({ command, exitCode: -1, stdout, stderr: error.message });
    });
  });

export const runCommitCommand = (
  cwd: string,
  template: string,
  message: string,
): Promise<CommitResult> => runCommand(cwd, buildCommitCommand(template, message));

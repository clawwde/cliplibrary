import { describe, expect, it } from 'bun:test';
import { tmpdir } from 'node:os';
import {
  buildCommitCommand,
  DEFAULT_COMMIT_COMMAND,
  runCommand,
  runCommitCommand,
  shellEscape,
} from '@/core';

describe('shellEscape', () => {
  it('wraps a plain value in single quotes', () => {
    expect(shellEscape('hello')).toBe(`'hello'`);
  });

  it('escapes embedded single quotes', () => {
    expect(shellEscape("it's done")).toBe(`'it'\\''s done'`);
  });

  it('preserves double quotes, backticks and dollar signs literally', () => {
    expect(shellEscape('say "hi" `now` $PATH')).toBe(`'say "hi" \`now\` $PATH'`);
  });

  it('preserves newlines inside the quotes', () => {
    expect(shellEscape('line one\nline two')).toBe(`'line one\nline two'`);
  });

  it('escapes every single quote in a run', () => {
    const unit = `'\\''`;
    expect(shellEscape("'''")).toBe(`'${unit}${unit}${unit}'`);
  });
});

describe('buildCommitCommand', () => {
  it('substitutes an escaped message into the default template', () => {
    expect(buildCommitCommand(DEFAULT_COMMIT_COMMAND, 'ship it')).toBe(
      `git add -A && git commit -m "'ship it'"`,
    );
  });

  it('replaces every occurrence of the placeholder', () => {
    expect(buildCommitCommand('echo {{message}} && echo {{message}}', 'x')).toBe(
      `echo 'x' && echo 'x'`,
    );
  });

  it('escapes a message containing quotes and newlines', () => {
    const command = buildCommitCommand('git commit -m "{{message}}"', 'fix: "edge"\ncase');
    expect(command).toBe(`git commit -m "'fix: "edge"\ncase'"`);
  });

  it('leaves the template untouched when there is no placeholder', () => {
    expect(buildCommitCommand('git status', 'whatever')).toBe('git status');
  });
});

describe('runCommand', () => {
  it('captures stdout and a zero exit code on success', async () => {
    const result = await runCommand(tmpdir(), 'printf hello');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe('hello');
    expect(result.stderr).toBe('');
    expect(result.command).toBe('printf hello');
  });

  it('captures stderr and a non-zero exit code on failure', async () => {
    const result = await runCommand(tmpdir(), 'echo oops 1>&2; exit 3');
    expect(result.exitCode).toBe(3);
    expect(result.stderr).toContain('oops');
  });

  it('round-trips a message with special characters through the shell', async () => {
    const message = `weird "msg" with 'quotes' and $VARS`;
    const result = await runCommitCommand(tmpdir(), 'printf %s {{message}}', message);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe(message);
  });
});

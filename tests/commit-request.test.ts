import { describe, expect, it } from 'bun:test';
import { buildCommitBody, DEFAULT_COMMIT_COMMAND } from '@/lib/commit-request';

describe('buildCommitBody', () => {
  it('passes through a custom command and trims the message', () => {
    expect(buildCommitBody('git status', '  chore: tidy  ')).toEqual({
      command: 'git status',
      message: 'chore: tidy',
    });
  });

  it('falls back to the default command when the command is blank', () => {
    expect(buildCommitBody('   ', 'feat: add')).toEqual({
      command: DEFAULT_COMMIT_COMMAND,
      message: 'feat: add',
    });
  });

  it('defaults to the plain git commit command', () => {
    expect(DEFAULT_COMMIT_COMMAND).toBe('git add -A && git commit -m "{{message}}"');
  });
});

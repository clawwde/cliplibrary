import { afterEach, describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CommitBar } from '@/components/editor/commit-bar';
import { DEFAULT_COMMIT_COMMAND } from '@/lib/commit-request';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const mockFetch = (result: Record<string, unknown>) => {
  const fetchMock = mock(() => Promise.resolve({ json: () => Promise.resolve(result) }));
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

const open = () => {
  render(<CommitBar />);
  fireEvent.click(screen.getByRole('button', { name: 'Toggle commit panel' }));
};

describe('CommitBar', () => {
  it('shows the default commit command', () => {
    mockFetch({ command: '', exitCode: 0, stdout: '', stderr: '' });
    open();
    expect(screen.getByLabelText('Commit command')).toHaveValue(DEFAULT_COMMIT_COMMAND);
  });

  it('keeps the commit button disabled until a message is entered', () => {
    mockFetch({ command: '', exitCode: 0, stdout: '', stderr: '' });
    open();
    expect(screen.getByRole('button', { name: 'Commit' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Commit message'), { target: { value: 'feat: x' } });
    expect(screen.getByRole('button', { name: 'Commit' })).toBeEnabled();
  });

  it('posts the edited command and message to the commit api', async () => {
    const fetchMock = mockFetch({
      command: 'echo hi',
      exitCode: 0,
      stdout: 'done',
      stderr: '',
    });
    open();
    fireEvent.change(screen.getByLabelText('Commit command'), { target: { value: 'echo hi' } });
    fireEvent.change(screen.getByLabelText('Commit message'), { target: { value: 'feat: save' } });
    fireEvent.click(screen.getByRole('button', { name: 'Commit' }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/commit');
    expect(JSON.parse(init.body as string)).toEqual({ command: 'echo hi', message: 'feat: save' });

    await waitFor(() => expect(screen.getByText('Committed')).toBeInTheDocument());
  });

  it('surfaces a non-zero exit code as a failure', async () => {
    mockFetch({ command: 'git commit', exitCode: 1, stdout: '', stderr: 'nothing to commit' });
    open();
    fireEvent.change(screen.getByLabelText('Commit message'), { target: { value: 'feat: y' } });
    fireEvent.click(screen.getByRole('button', { name: 'Commit' }));

    await waitFor(() => expect(screen.getByText('Failed (exit 1)')).toBeInTheDocument());
    expect(screen.getByText('nothing to commit')).toBeInTheDocument();
  });
});

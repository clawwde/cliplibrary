export const DEFAULT_COMMIT_COMMAND = 'git add -A && git commit -m "{{message}}"';

export interface CommitRequestBody {
  command: string;
  message: string;
}

export const buildCommitBody = (command: string, message: string): CommitRequestBody => {
  const trimmed = command.trim();
  return {
    command: trimmed === '' ? DEFAULT_COMMIT_COMMAND : trimmed,
    message: message.trim(),
  };
};

import { Glob } from 'bun';
import ts from 'typescript';

type CommentRange = {
  start: number;
  end: number;
  text: string;
  line: number;
};

const ALLOWED = [
  /^\/\/\s*biome-ignore\b/,
  /^\/\/\s*@ts-(expect-error|ignore|nocheck|check)\b/,
  /^\/\/\s*eslint-(disable|enable)\b/,
  /^\/\/\/\s*<reference\b/,
  /^\/\/\s*prettier-ignore\b/,
  /^\/\*!\s/,
];

const isAllowed = (text: string): boolean => ALLOWED.some((pattern) => pattern.test(text));

const lineOf = (lineStarts: readonly number[], position: number): number => {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    const start = lineStarts[mid] ?? 0;
    if (start <= position) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low + 1;
};

const collectComments = (source: string): CommentRange[] => {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, source);
  const lineStarts = ts.computeLineStarts(source);
  const found: CommentRange[] = [];
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    if (
      token === ts.SyntaxKind.SingleLineCommentTrivia ||
      token === ts.SyntaxKind.MultiLineCommentTrivia
    ) {
      const start = scanner.getTokenStart();
      found.push({
        start,
        end: scanner.getTokenEnd(),
        text: scanner.getTokenText(),
        line: lineOf(lineStarts, start),
      });
    }
    token = scanner.scan();
  }
  return found;
};

const stripFrom = (source: string, disallowed: CommentRange[]): string => {
  let output = source;
  for (const comment of [...disallowed].sort((a, b) => b.start - a.start)) {
    output = output.slice(0, comment.start) + output.slice(comment.end);
  }
  return output
    .split('\n')
    .filter((line, index, lines) => {
      const blank = line.trim().length === 0;
      const prevBlank = (lines[index - 1] ?? 'x').trim().length === 0;
      return !(blank && prevBlank);
    })
    .join('\n');
};

const resolveFiles = async (args: string[]): Promise<string[]> => {
  const explicit = args.filter((arg) => !arg.startsWith('--'));
  if (explicit.length > 0) {
    return explicit;
  }
  const glob = new Glob('{apps,packages,scripts}/**/*.{ts,tsx}');
  const files: string[] = [];
  for await (const file of glob.scan({ dot: false })) {
    if (!(file.includes('node_modules') || file.endsWith('.gen.ts'))) {
      files.push(file);
    }
  }
  return files;
};

const main = async (): Promise<void> => {
  const args = Bun.argv.slice(2);
  const checkOnly = args.includes('--check');
  const files = await resolveFiles(args);
  const violations: string[] = [];

  for (const file of files) {
    const source = await Bun.file(file).text();
    const disallowed = collectComments(source).filter((comment) => !isAllowed(comment.text));
    if (disallowed.length === 0) {
      continue;
    }
    if (checkOnly) {
      for (const comment of disallowed) {
        violations.push(`${file}:${comment.line}  ${comment.text.split('\n')[0]?.trim() ?? ''}`);
      }
    } else {
      await Bun.write(file, stripFrom(source, disallowed));
    }
  }

  if (checkOnly && violations.length > 0) {
    console.error(`Found ${violations.length} disallowed comment(s):`);
    for (const violation of violations) {
      console.error(`  ${violation}`);
    }
    process.exit(1);
  }
};

await main();

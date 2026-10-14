import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { type Project, safeParseProject } from '@cliplibrary/project';
import { NextResponse } from 'next/server';
import { buildProjectRenderArgs } from '@/lib/project-export-run';
import { type ProjectJob, setProjectJob, updateProjectJob } from '@/lib/project-jobs';
import { type RenderOptions, sanitizeRenderOptions } from '@/lib/render-options';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

const parseProgress = (line: string): number | null => {
  try {
    const parsed = JSON.parse(line) as { progress?: number };
    return typeof parsed.progress === 'number' ? parsed.progress : null;
  } catch {
    return null;
  }
};

const startRender = async (
  exportId: string,
  project: Project,
  options: RenderOptions,
): Promise<void> => {
  const root = repoRoot();
  const outDir = join(root, 'apps', 'web', 'public', 'exports', exportId);
  const tmp = join(tmpdir(), `cliplibrary-project-${exportId}`);
  await mkdir(tmp, { recursive: true });
  const projectPath = join(tmp, 'project.json');
  const optionsPath = join(tmp, 'options.json');
  await writeFile(projectPath, JSON.stringify(project), 'utf8');
  await writeFile(optionsPath, JSON.stringify(options), 'utf8');

  const renderCwd = join(root, 'apps', 'render');
  const child = spawn('bun', buildProjectRenderArgs({ projectPath, outDir, optionsPath }), {
    cwd: renderCwd,
  });

  let buffer = '';
  let stderr = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const progress = parseProgress(line.trim());
      if (progress !== null) {
        updateProjectJob(exportId, { progress });
      }
    }
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk: string) => {
    stderr += chunk;
  });
  child.on('error', (spawnError) => {
    updateProjectJob(exportId, {
      status: 'error',
      error: `Could not start the renderer: ${spawnError.message}`,
    });
  });
  child.on('close', (code) => {
    const patch: Partial<ProjectJob> =
      code === 0
        ? { status: 'done', progress: 1 }
        : {
            status: 'error',
            error: stderr.trim().slice(-500) || `render exited with code ${String(code)}`,
          };
    updateProjectJob(exportId, patch);
  });
};

export const POST = async (request: Request): Promise<Response> => {
  const body = (await request.json()) as { project?: unknown; options?: unknown };
  const project = safeParseProject(body.project);
  if (project === null) {
    return NextResponse.json({ error: 'Invalid project' }, { status: 400 });
  }
  const options = sanitizeRenderOptions(body.options);

  const exportId = crypto.randomUUID();
  setProjectJob({ exportId, status: 'rendering', progress: 0, error: null });
  await startRender(exportId, project, options);

  return NextResponse.json({ exportId });
};

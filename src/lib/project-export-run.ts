export interface ProjectRenderArgs {
  projectPath: string;
  outDir: string;
  optionsPath: string;
}

export const buildProjectRenderArgs = (args: ProjectRenderArgs): string[] => [
  'run',
  'src/render/render-project-one.ts',
  '--project',
  args.projectPath,
  '--out',
  args.outDir,
  '--options',
  args.optionsPath,
];

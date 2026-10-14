# cliplibrary

A Turborepo for a library of Remotion animation clips with a deep, schema-driven
in-browser editor. Clips are defined by Zod schemas, previewed live with
`@remotion/player`, edited through a schema-derived properties panel, and
rendered to mp4 by a standalone Bun service.

## Workspaces

- `apps/web`: Next.js App Router UI (clip gallery, per-clip editor, preview,
  properties panel, version history, export and commit surfaces).
- `apps/render`: standalone Bun render service built on `@remotion/bundler` and
  `@remotion/renderer`.
- `packages/schemas`: per-clip Zod schemas, typed defaults, inferred types, the
  `ClipId` union and clip registry metadata.
- `packages/compositions`: the Remotion scenes, motion kit, `Root` and the
  `registerRoot` entry.
- `packages/core`: domain types, Node-only stores, schema-to-control
  introspection and the commit-command runner.
- `packages/tsconfig`: shared strict TypeScript configs.

## Requirements

- [Bun](https://bun.sh) 1.4 or newer. Bun is the only package manager.

## Getting started

```bash
bun install
bun run dev
```

## Common commands

- `bun run dev`: run all apps in dev.
- `bun run build`: build the graph with Turborepo.
- `bun run typecheck`: `tsc --noEmit` across the graph.
- `bun run test`: unit and component tests.
- `bun run test:e2e`: Playwright end-to-end suite.
- `bun run verify`: the full local gate (lint, no-comments, em-dashes,
  repository hygiene, dead code, typecheck and tests).

## Quality gates

Every change runs through Biome, a no-comments policy, em-dash and repository
hygiene checks, knip dead-code analysis, strict TypeScript, unit, component and
end-to-end tests, plus workflow, YAML, Markdown, link, dependency-audit and
secret scans in CI.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and
[SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## License

Released under the [MIT License](LICENSE).

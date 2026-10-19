# cliplibrary

A Next.js app for a library of Remotion animation clips with a deep,
schema-driven in-browser editor. Clips are defined by Zod schemas, previewed
live with `@remotion/player`, edited through a schema-derived properties panel,
and rendered to mp4 by Bun render scripts.

## Layout

- `src/app`, `src/components`, `src/lib`: Next.js App Router UI (clip gallery,
  per-clip editor, preview, properties panel, version history, export and
  commit surfaces).
- `src/render`: Bun render scripts built on `@remotion/bundler` and
  `@remotion/renderer`.
- `src/schemas`: per-clip Zod schemas, typed defaults, inferred types, the
  `ClipId` union and clip registry metadata.
- `src/project`: the layered project model, its reducers and the clip library.
- `src/compositions`: the Remotion scenes, motion kit, `Root` and the
  `registerRoot` entry.
- `src/core`: domain types, Node-only stores, schema-to-control introspection
  and the commit-command runner.
- `tests`, `e2e`: unit and component tests, and the Playwright suite.

## Requirements

- [Bun](https://bun.sh) 1.4 or newer. Bun is the only package manager.

## Getting started

```bash
bun install
bun run dev
```

## Common commands

- `bun run dev`: run the Next.js dev server.
- `bun run build`: production Next.js build.
- `bun run typecheck`: `tsc --noEmit`.
- `bun run render [clipId...]`: render gallery previews to `public/exports`.
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

# cliplibrary

A Turborepo for a library of Remotion animation clips with a deep, schema-driven in-browser editor.

## Layout

- `apps/web` - Next.js App Router UI: clip gallery, per-clip editor (live `@remotion/player` preview,
  schema-driven properties panel, version history), export and commit surfaces, deferred AI chat.
- `apps/render` - standalone Bun render service (`@remotion/bundler` + `@remotion/renderer`) that
  produces mp4 + poster for a clip and props snapshot.
- `packages/schemas` - `@cliplibrary/schemas`: per-clip Zod schemas, typed defaults, inferred types,
  the `ClipId` union and clip registry metadata. Pure, no React, no Node.
- `packages/compositions` - `@cliplibrary/compositions`: the Remotion scenes, motion kit, `Root`,
  and the `registerRoot` entry. Depends on `@cliplibrary/schemas`.
- `packages/core` - `@cliplibrary/core`: domain types and Node-only stores (props, history, exports,
  registry), the Zod-schema-to-control introspection, and the commit-command runner.
- `packages/tsconfig` - shared strict TypeScript configs.
- `packages/ui` - shared React UI primitives and the theme system.

## Toolchain

- Bun only. No npm, pnpm or yarn. Turborepo orchestrates tasks.
- Biome for lint and format. Strict TypeScript (`tsconfig.base.json`, every strictness flag on).
- Tests: `bun test` with happy-dom + Testing Library for unit and component, Playwright for e2e.
- lefthook runs Biome and the no-comments check pre-commit; typecheck and lint pre-push.

## Commands

- `bun run dev` - all apps in dev.
- `bun run verify` - lint, no-comments check, typecheck and tests (what CI runs).
- `bun run lint` / `bun run lint:fix` - Biome.
- `bun run typecheck` - `tsc --noEmit` across the graph.
- `bun run test` / `bun run test:e2e` - unit/component / Playwright.

## Rules

- No comments in code. Only functional directives (`biome-ignore`, `@ts-*`, `eslint-*`,
  `/// <reference`, `/*! license */`). Enforced by `scripts/strip-comments.ts --check`.
- Heavily typed. Zod schemas are the single source of truth for clip props; derive types with
  `z.infer`, never hand-duplicate them.

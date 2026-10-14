# Contributing

Thanks for taking the time to contribute.

## Prerequisites

- [Bun](https://bun.sh) 1.4 or newer. Do not use npm, pnpm or yarn.

## Setup

```bash
bun install
```

## Workflow

1. Create a branch off `main`.
2. Make your change.
3. Run `bun run verify` and make sure it is green.
4. Open a pull request with a Conventional Commits title (for example
   `feat: add odometer scene`).

## Coding rules

- No comments in code. Only functional directives are allowed: `biome-ignore`,
  `@ts-*`, `eslint-*`, `/// <reference` and `/*! license */`.
- Keep `.ts` and `.tsx` files under 400 lines.
- Zod schemas are the single source of truth for clip props. Derive types with
  `z.infer`; never hand-duplicate them.
- Never use the em-dash character. Use commas, colons or separate sentences.

## Checks

`bun run verify` runs lint, the no-comments check, the em-dash check, the
repository hygiene check, dead-code analysis, typecheck and tests. CI runs the
same gates plus workflow, YAML, Markdown, link, dependency-audit and secret
scans.

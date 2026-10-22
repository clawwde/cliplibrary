# cliplibrary

An open library of [Remotion](https://www.remotion.dev) animation clips with a
schema-driven, in-browser editor. Browse the gallery, open any clip, tweak its
text, colors, timing and layers on a timeline, and export the result to video.

## Features

- A searchable gallery of clips grouped by category: kinetic type, text
  reveals, 3D phone reveals, screen demos, overlays, transitions and more.
- A timeline editor with layered tracks for text, image, video, shape and
  animation elements, plus trimming, resizing and restacking.
- Properties panels generated from each clip's Zod schema, with color, slider,
  multiline, image and easing controls.
- Undo and redo that collapse a whole drag or slider gesture into one step.
- Export to H.264, H.265, VP9, ProRes or GIF at a chosen scale, frame rate and
  quality, rendered with `@remotion/renderer`.

Edits live in the browser session. Nothing you change is written back to the
server, so reloading a clip starts from its defaults.

## Requirements

- [Bun](https://bun.sh) 1.4 or newer. Bun is the only package manager.

## Getting started

```bash
bun install
bun run dev
```

Open the printed URL, pick a clip and start editing. Gallery previews are
rendered on demand with `bun run render`.

## Layout

- `src/app`, `src/components`, `src/lib`: the Next.js App Router UI (gallery,
  editor, preview, timeline, properties panel and export).
- `src/schemas`: per-clip Zod schemas, typed defaults and registry metadata.
- `src/compositions`: the Remotion scenes, motion kit and `registerRoot` entry.
- `src/project`: the layered project model and its pure reducers.
- `src/core`: domain types, the clip project seed and schema-to-control
  introspection.
- `src/render`: Bun render scripts built on `@remotion/bundler` and
  `@remotion/renderer`.
- `tests`, `e2e`: unit and component tests, and the Playwright suite.

## Common commands

- `bun run dev`: run the Next.js dev server.
- `bun run build`: production Next.js build.
- `bun run render [clipId...]`: render gallery previews to `public/exports`.
- `bun run render --new`: render only clips whose previews are missing.
- `bun run test`: unit and component tests.
- `bun run test:e2e`: Playwright end-to-end suite.
- `bun run verify`: the full local gate (lint, no-comments, em-dashes,
  repository hygiene, dead code, typecheck and tests).

## Adding a clip

Clips are pluggable modules. Add a schema under `src/schemas/clips/<category>/`
and a scene under `src/compositions/scenes/<category>/`, then register each in
its category `index.ts`. [AGENTS.md](AGENTS.md) walks through every step.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and
[SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## License

Released under the [MIT License](LICENSE).

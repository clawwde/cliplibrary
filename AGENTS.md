# cliplibrary

A single Next.js project for a library of Remotion animation clips with a deep, schema-driven
in-browser editor.

## Layout

Everything lives in one package. Modules import each other through the `@/` alias
(`@/schemas`, `@/project`, `@/core`, `@/compositions`, `@/lib/...`).

- `src/app`, `src/components`, `src/lib` - Next.js App Router UI: clip gallery, per-clip editor
  (live `@remotion/player` preview, schema-driven properties panel, version history), export and
  commit surfaces.
- `src/render` - Bun render scripts (`@remotion/bundler` + `@remotion/renderer`) that produce
  mp4 + poster for a clip and props snapshot. The API routes spawn them from the project root.
- `src/schemas` - per-clip Zod schemas, typed defaults, inferred types, the `ClipId` union and clip
  registry metadata. Pure, no React, no Node.
- `src/compositions` - the Remotion scenes, motion kit, `Root`, and the `registerRoot` entry.
- `src/project` - the layered `Project` model, its pure reducers and the clip library.
- `src/core` - domain types and Node-only stores (props, history, exports, registry), the
  Zod-schema-to-control introspection, and the commit-command runner.
- `tests` - `bun test` suites, mirroring `src` (`tests/schemas`, `tests/core`, ...); top-level
  files and `tests/components` cover the UI. `e2e` holds the Playwright suite.

## Toolchain

- Bun only. No npm, pnpm or yarn.
- Biome for lint and format. Strict TypeScript (`tsconfig.json`, every strictness flag on).
- Tests: `bun test` with happy-dom + Testing Library for unit and component, Playwright for e2e.
- lefthook runs Biome and the no-comments check pre-commit; typecheck and lint pre-push.

## Commands

- `bun run dev` - Next.js dev server.
- `bun run build` - production Next.js build.
- `bun run verify` - lint, no-comments check, typecheck and tests (what CI runs).
- `bun run lint` / `bun run lint:fix` - Biome.
- `bun run typecheck` - `tsc --noEmit`.
- `bun run test` / `bun run test:e2e` - unit/component / Playwright.
- `bun run render [clipId...]` - gallery previews: a half-size mp4 plus a 48px first-frame jpg per
  clip in `public/exports`. The homepage inlines the first frame as a blurred data-URI
  card background and lazily plays the mp4 over it once the card nears the viewport.

## Rules

- No comments in code. Only functional directives (`biome-ignore`, `@ts-*`, `eslint-*`,
  `/// <reference`, `/*! license */`). Enforced by `scripts/strip-comments.ts --check`.
- Heavily typed. Zod schemas are the single source of truth for clip props; derive types with
  `z.infer`, never hand-duplicate them.

## Clip modules

Clips are pluggable, category-organized modules so that parallel authors rarely touch the same
file. Categories group clips by the type of animation and are defined once in
`src/schemas/taxonomy.ts` (`CLIP_CATEGORIES`): `kinetic-type`, `text-reveals`, `hand-drawn`,
`phone-reveals`, `phone-layouts`, `screen-demos`, `overlays`, `brand`, `ad-reveals`, `backgrounds`,
`transitions`.
Each category also lists search `keywords` (synonyms the gallery search matches). Every
`ClipMeta` also carries `tags` (from `CLIP_TAGS`) and a `theme` (`light` or `dark`), which the
gallery search and filters read.

- Schema side: `src/schemas/clips/<category>/<id>.ts` exports `<name>Schema`,
  `<name>Defaults`, `<Name>Props` and `<name>Meta: ClipMeta` (metadata, including `category`, is
  co-located with the schema). Each category's `index.ts` exports a `ClipModule[]`, and
  `clips/index.ts` concatenates them into `CLIP_MODULES`, then derives `CLIP_REGISTRY`,
  `CLIP_SCHEMAS`, `CLIP_DEFAULTS`, `CLIP_IDS` and the `getClip*`/`isClipId` accessors.
- Composition side: `src/compositions/scenes/<category>/<id>.tsx` exports the scene
  component and a `<name>Scene: SceneModule` (`{ id, component, render }`). Each category's
  `index.ts` exports a `SceneModule[]`, and `scenes/index.ts` concatenates them into `CLIP_SCENES`,
  from which `CLIP_COMPONENTS` and `RemotionRoot` are built.

To add a clip:

1. Add the schema file under the chosen category (`<name>Schema`/`<name>Defaults`/`<Name>Props`/
   `<name>Meta`).
2. Add its id and `Props` type to `ClipPropsMap` in `src/schemas/clip-props.ts` (this is
   the typed map of the built-in clips and the source of the `ClipId` union).
3. Register the module in that category's `clips/<category>/index.ts` (one line).
4. Add the scene file under `scenes/<category>/` (component + `<name>Scene`).
5. Register the scene in `scenes/<category>/index.ts` (one line).

## Controls

Field controls are tagged on the zod schema and read back by
`src/core/schema-introspect.ts`:

- `zColor()`, `zMultiline()`, `zSlider({ min, max, step })`, `zImage()` (a URL or data-URI string;
  empty is allowed and renders a placeholder), and `z.enum(EASING_IDS)` for an easing curve picker.
- `EASING_IDS`/`EasingId` live in `@/schemas` and are the single source consumed by the
  compositions motion kit (`kit/easing.ts`).

## Projects, layering and the clip library

A `Project` (in `@/project`) is `{ fps, width, height, durationInFrames, background,
tracks }`. Each `Track` holds ordered `Element`s (`text | image | video | shape | composition`),
and every element is independently selectable, movable, trimmable and animatable in the timeline
editor.

- Stacking order: the FIRST track in `tracks` is the TOP visual layer and the TOP row of the
  timeline. `ProjectComposition` paints tracks with a descending `zIndex` (`tracks.length - index`)
  so earlier tracks sit on top; within a track, later elements paint over earlier ones. The
  timeline UI, `moveTrack` (up = toward the top layer) and the render stay consistent with this.
- Pure reducers in `src/project/mutations.ts`: `moveElementToTrack` (reassign an element's
  layer, optionally re-clamping `from`), `moveTrack` (restack a whole track up/down) and
  `trimElementStart` (left-edge trim: moves `from` while holding the right edge fixed, min one
  frame). Right-edge drag uses `resizeElement`. All are frame-snapped and clamped.
- The clip library (`src/project/library`) defines the gallery clips as data: each
  `LibraryClip` has `{ meta, build() }` and `build()` returns a multi-element `Project` (every
  element on its own track). `seedProjectForClip(id)` (in `@/core`) returns these, the
  homepage lists `LIBRARY_CLIP_META`, and `/clips/[clipId]` validates with `isLibraryClipId`.
  Split clip definitions across files under `library/` to keep each under 400 lines.
- The hand-coded `@/schemas` scenes remain reusable building blocks: the timeline
  toolbar's "Animation" picker inserts one as a `composition` element (its `clipId` is a schema
  `ClipId`, rendered through `CLIP_COMPONENTS`), layerable alongside the primitive elements.

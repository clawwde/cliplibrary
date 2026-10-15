# Clip anatomy

How a clip is wired into cliplibrary, and how a long piece is split into atomic
clips and recomposed as a sequence. Copy an existing clip of the same category as
the starting point; `phone-spin-in` is the smallest 3D example and
`headline-reveal` the smallest text example.

## Choosing the split

Split by animation type, not by moment in the video. Two beats that animate the
same way (two headline reveals with different copy) are one clip used twice with
different props. The App Promo split:

| Category | Clips |
| --- | --- |
| devices | phone-spin-in, phone-turnaround, phone-fan, phone-swap, phone-scroll, phone-wall, phone-pair |
| overlays | floating-cards |
| typography | headline-reveal, feature-callouts, detail-list |
| brand | brand-reveal, cta-end-card |
| backgrounds | studio-backdrop |
| transitions | scene-transition |
| sequences | app-promo |

A clip that only makes sense with another one (feature callouts timed to a phone
swap) shares its timing through a small module such as `promo/beats.ts`
(`SWAP_FRAMES`, `beatStart`, `beatAt`), so both stay in sync when edited.

## Files for a new clip `<id>` in `<category>`

1. `packages/schemas/src/clips/<category>/<id>.ts`
   - `<id>Schema`: a Zod object. Reuse `lookSchema`, `stageSchema`, `motionSchema`,
     `placementSchema`, `positionSchema` and `phoneSchema` from `promo-common.ts`;
     add clip-specific fields with `zSlider`, `zColor`, `zImage`, `zMultiline` or
     enums. Every number someone might want to tweak gets a field.
   - `<id>Defaults`: built with `lightLook()` or `darkLook()`, `defaultStage()`,
     `defaultMotion()`, `phone()`, `position()` and `placement()`.
   - `<id>Meta: ClipMeta`: `...promoMeta`, id, title, a one-sentence description of
     the motion, `category`, `tags` (from `CLIP_TAGS`), `theme`, `source` (must be
     exactly `packages/compositions/src/scenes/<category>/<id>.tsx`, a test checks
     it), `durationInFrames` and `posterFrame` (a frame where everything has
     arrived).
   - Export the props type `<Id>Props = z.infer<typeof <id>Schema>`.
2. `packages/schemas/src/clips/<category>/index.ts`: add the module to the
   category's `ClipModule[]` list.
3. `packages/schemas/src/clip-props.ts`: add `'<id>': <Id>Props` to `ClipPropsMap`.
   This is what makes `<id>` a valid `ClipId`.
4. `packages/compositions/src/scenes/<category>/<id>.tsx`: the component, wrapped in
   `PromoLayer` (which applies `TransitionFrame` and the optional backdrop), and a
   `SceneModule` whose `render` returns a `<Composition>` with the schema, defaults
   and meta values.
5. `packages/compositions/src/scenes/<category>/index.ts`: add the scene to the
   category's list. `root.tsx` renders every scene from `CLIP_SCENES`.
6. A new category or tag also needs `packages/schemas/src/taxonomy.ts`
   (`CLIP_CATEGORIES`, `CLIP_TAGS`), both `clips/index.ts` and `scenes/index.ts`
   spreads, and the category list in `AGENTS.md`. Remove categories and tags that no
   clip uses; knip and the tests expect no dead entries.
7. Tests: `packages/schemas/tests/schemas.test.ts` keeps a list of promo ids whose
   defaults must validate; add the new id. Search the tests and
   `apps/web/e2e/home.spec.ts` for clip ids or titles when renaming or deleting a
   clip.

## Component conventions

- `const frame = useCurrentFrame() * motion.speed;` at the top.
- Read `look` for color, `isDarkLook(look)` for dark staging, and `stage` for the
  camera, light and drift. Pass `focusX` to `PromoLayer` to aim the spotlight at the
  hero.
- Text components take a `start` and optional `end` frame. Use `Headline`, `FadeIn`,
  `Eyebrow` and `BodyCopy` instead of new text animation code.
- Place text with `placementFrame(placement)` and 3D objects with `position`.
- Keep files under 400 lines; move shared pieces into `promo/`.

## Sequences

A sequence (`clips/sequences/app-promo.ts`) is a `ClipSequence`:

```ts
interface SequenceEntry {
  clipId: ClipId;
  track: AppPromoTrack;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
}
```

- Tracks are named, and the first one is the top layer:
  `['Captions', 'Text', 'Overlays', 'Devices', 'Backdrop']`.
- Entries are created with a small `entry(clipId, track, [from, to], defaults,
  overrides)` helper. Sequence entries turn `showBackdrop` off, and one
  `studio-backdrop` entry runs the whole length underneath (plus a dark one for the
  dark beat, entering with an iris).
- Consecutive entries on the same track overlap by 12 to 20 frames with fade exits.
  Check every handoff in the QA output; the wall to dark beat handoff needed
  retiming (wall ends at 1248, dark backdrop 1244 to 1374, pair from 1262,
  headline from 1272).
- `packages/core/src/project-seed.ts` maps sequence ids in `SEQUENCES` and turns each
  track into editor tracks (`${id}-track-${slug}`) with one element per entry, so the
  editor opens the sequence as editable blocks.
- The sequence scene component paints tracks in reverse order, so the first track
  ends up on top, and applies the sequence-level brand name, accent and phone finish
  to every entry.

## Gallery and editor expectations

- The home page is one flat grid of clips, with search, Category, Tags, Theme and
  Sort dropdowns synced to the URL. No category headings or dividers.
- Tiles load their preview only near the viewport, because many 3D clips playing at
  once overload the browser.
- The editor fits the whole timeline on open, and every entry is a block the user
  can select, move, trim and edit in the properties panel.

---
name: promo-clips
description: How to turn a reference promo video, template link or motion idea into original, minimal, polished Remotion clips in cliplibrary, using the 3D phone kit, split into atomic clips by animation type plus a layered sequence, and verified frame by frame before anyone sees it. Use this whenever the user shares an Envato, Motion Array, YouTube or Dribbble link to recreate, asks for a new app promo, product launch or device mockup video, wants a new 3D phone, typography, brand, overlay, backdrop or transition clip, asks to polish, de-stutter or fix glitches in an existing clip, or wants a long video split into separate clips, even if they never say "promo".
---

# Promo clips

This skill captures how the App Promo work in cliplibrary was built: a reference
template became 16 original clips, each one minimal, every value editable from the
editor, with every frame checked. Most of what is here was learned the hard way from
user feedback, so treat the lessons as requirements, not suggestions.

Read the reference files as you reach each stage, not all up front:

| Stage | Read |
| --- | --- |
| Deciding the look, timing and motion | `references/design-language.md` |
| Anything inside a `ThreeCanvas` (phones, cards, lights) | `references/three-d.md` |
| Adding or splitting clips, building a sequence | `references/clip-anatomy.md` |
| Before you tell the user anything is done | `references/verification.md` |

## 1. Reference videos are inspiration, not a source

When the user sends a paid template (Envato "App Promo" by HarryCreattive was the
first one) and asks for an exact, frame by frame copy with its assets, build an
original piece with the same feel instead: same length, resolution, pacing, kinds of
shots and mood, but your own screens, copy, phone model and motion. Do not download
or trace the template's footage, mockups, fonts or audio. Say this once, briefly, and
mention that a licensed copy of the template can be used directly in After Effects.

The user will likely keep asking for "exact similarity". Do not argue again each
time. Treat it as a request to match the quality and calm of the reference more
closely, and spend the effort on polish: easing, spacing, lighting, the phone's
materials. That is what actually closed the gap last time.

Break the reference into beats you can name by animation type: a brand reveal, a
phone spinning in, a turnaround, a fan of three, a swap with feature callouts, a
scrolling screen with floating cards, a tilted wall of screens, a dark two-phone
moment and a call to action. Each beat type becomes one clip.

## 2. Minimal by default

The first version looked "white-coded" to the user because it was busy: floating
geometric shapes, three-color diagonal wipes and colored rings. The version they
accepted removed all of that. The rules, in short:

- One quiet backdrop (off-white or near-black), a soft spotlight and faint static
  grain. One accent color, used on one word per headline and on small marks.
- Inter Tight for display, Inter for body. Big, tight headlines and very little copy.
- One idea per beat. One hero object, the text on the other side, lots of space.
- Motion that settles: long eased entrances, gentle spins, a slow camera drift so
  nothing is ever dead still, and quick fades out.
- Transitions are fades, blurs or a single iris. Never a wipe made of stripes.

`references/design-language.md` has the exact colors, sizes, easing curves and frame
counts that shipped. Reuse the kit in `packages/compositions/src/promo/` rather than
writing new primitives: `Stage`, `PhoneModel`, `Backdrop`, `Headline`, `FadeIn`,
`Eyebrow`, `BodyCopy`, `TransitionFrame`, `PromoLayer`, `tween`, `track`, `settle`.

## 3. Split by animation type, then compose

Every clip is atomic and stands on its own:

- It lives in `scenes/<category>/<id>.tsx` with its schema in
  `schemas/src/clips/<category>/<id>.ts`. The category is the kind of animation
  (devices, typography, overlays, brand, backgrounds, transitions, sequences).
- It has a `look.showBackdrop` toggle, so it looks finished alone and stacks cleanly
  as a layer over other clips.
- Every visual number is a schema field with a control (`zColor`, `zSlider`,
  `zImage`, enums). The user asked for "as many controls as you can", and grouped
  `look`, `stage`, `motion`, `placement`, `position` and `phone` objects keep that
  manageable.

A long piece like App Promo is a `sequences` clip whose timeline is a list of
entries on named tracks (Captions, Text, Overlays, Devices, Backdrop; the first
track is the top layer). The editor opens it as real, editable blocks, not one
opaque video. `references/clip-anatomy.md` lists every file to touch and every test
that enumerates clips.

## 4. Verify like the user is watching every frame

The sharpest feedback in the whole project was: "You are not polishing your video.
You are not verifying it at all." Rendering a few stills is not verification. Before
reporting any visual change:

1. Render the clip to MP4 with `scripts/render-clip.ts`.
2. Run `scripts/motion-qa.py` on the MP4 and explain or fix every freeze, hard cut
   and motion spike it reports.
3. Look at full-frame-rate contact sheets of every entrance, exit and handoff with
   `scripts/contact-sheet.sh`, and full-resolution stills of close-ups (text edges,
   phone edges, lenses, the wall) with `scripts/render-stills.ts`.
4. Check the editor and gallery in a real browser with `scripts/screenshot.ts` and
   read its console errors.
5. For export or render-service changes, run a real export through the app's API.

Then say exactly what you checked and what you did not. `references/verification.md`
has the commands, thresholds and how to read the output.

## 5. Mistakes already made once

Each of these reached the user. Do not ship them again.

| What the user saw | Cause | Rule |
| --- | --- | --- |
| A visible ring in the background | Gradient held flat to 38%, then darkened (Mach band) | Use the eased `color-mix` stops in `Backdrop`; never a flat stop then a ramp |
| Headline letters cut in half mid-reveal | Lines slid out from behind `overflow: hidden` | Reveal by rise plus fade, with no clipping masks on text |
| The "o" in the wordmark clipped | Per-letter mask boxes narrower than glyphs at `-0.045em` tracking | Same: no masks around glyphs |
| A flat, fake looking iPhone | Environment was black outside the light panels, back was a flat sheet | Gray environment base, real beveled glass slabs, lathe lens housings |
| Flickering gray blocks on the phone wall | Screen and glass nearly coplanar, near plane 0.1 | Camera near 1, `SCREEN_LIFT`, `polygonOffset` on screens |
| Stop-start motion, phones strobing | Fast in, dead stop, spins near 20 degrees per frame | Longer `settle` entrances, smaller spins, camera drift, crossfade instead of spinning |
| Wall phones flickering as slivers | 180 degree flip passed edge-on to the camera | Glide up and settle instead of flipping |
| Hard cut between two scenes | No overlap between consecutive entries | Overlap entries by 12 to 20 frames with fades |
| Black screens on the phones | Textures loaded into React state; `ThreeCanvas` never redrew | Load with `useTexture` (R3F `useLoader` suspense) |
| Export stuck at 6%, then "Timeout (30000ms)" | Headless Chrome fell back to software WebGL | `BROWSER_RENDER_OPTIONS` (gl `angle`, 120 s) on every render call |

## 6. Shipping in this repo

- Work in a new worktree off `origin/main`. Branch names describe the change.
- This repo belongs to the `clawwde` GitHub account: `gh auth switch -u clawwde`
  before any GitHub work, and switch back to `pulkitxm` at the end.
- `bun run verify` must pass. It covers Biome, no code comments, no em dashes,
  files under 400 lines with kebab-case paths, knip, typecheck and tests. Split a
  clip into smaller files when it nears 400 lines.
- Commit at checkpoints with `pukbot commit create`. If `pukbot ref create` fails
  with a workflow dispatch error, create the branch with `gh api` and keep using
  Pukbot for commits and PRs.
- Keep PRs under about 2000 lines and stack them (kit, then clips, then sequence,
  then UI). When merging a stack, retarget the next PR to `main` before merging the
  one below it, because the repo deletes merged branches and GitHub then closes PRs
  based on them.
- Restart the dev server (`bun run dev`, port 3000) if the editor shows "no
  controls"; it is usually a stale compile from mid-edit hot reload.

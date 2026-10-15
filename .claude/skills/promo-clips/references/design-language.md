# Design language

These are the values the accepted App Promo shipped with. Start from them and change
them deliberately, not by accident. All helpers named here live in
`packages/schemas/src/promo-common.ts` and `packages/compositions/src/promo/`.

## Format

- 1920x1080, 30 fps, no audio (`promoMeta`).
- Single clips run 4 to 9 seconds (120 to 270 frames). The full sequence runs 50 s
  (1500 frames).

## Color

| Token | Light (`lightLook`) | Dark (`darkLook`) |
| --- | --- | --- |
| background (center) | `#f4f4f2` | `#16161a` |
| backgroundEdge | `#e6e6e2` | `#050506` |
| ink | `#0b0b0c` | `#f5f5f4` |
| muted | `#7c7c80` | `#8d8d93` |
| accent | `#2f5bff` | `#7d9bff` |
| grain | 0.06 | 0.08 |
| spotlight | 0.55 | 0.7 |

- One accent per piece. It goes on one highlighted word per headline, the eyebrow
  bar, the brand mark and small UI details. Nothing else is colored.
- `isDarkLook` decides dark staging from the background's luminance, so a clip never
  needs a separate "dark" flag.

## Backdrop

- A radial gradient from `background` to `backgroundEdge` at 130% size, plus a soft
  white spotlight at 60% by 70%, both built with nine eased `color-mix(in oklab)`
  stops (`0, .04, .14, .3, .5, .7, .86, .96, 1`). Eased stops are what removed the
  visible ring; a flat stop followed by a ramp always shows an edge.
- Move the focus toward the hero object: `focusX = 50 + side * 18` when the phone
  sits on one side.
- Grain is an SVG `feTurbulence` (fractalNoise, baseFrequency 0.9, 2 octaves) with a
  fixed `seed={7}`, blended with `overlay`. The seed stays fixed so the grain does
  not boil from frame to frame.

## Type

- Display: Inter Tight 600, `letterSpacing: -0.045em`, `lineHeight: 1.02`. Headline
  sizes are 88 to 112 px; the brand wordmark is 200 px.
- Body: Inter 400, 28 px, line height 1.5, about 560 px wide. One sentence at most.
- Eyebrow: Inter 500, 19 px, uppercase, `0.22em` tracking, led by a 28 by 2 px
  accent bar.
- Headlines are two short lines separated by `\n`, such as "Crafted in\nevery
  detail." The accent goes on one word through `highlight`.
- Text sits opposite the phone with a 150 to 160 px side inset and a 620 to 760 px
  column, or centered at the top (inset 84) when several phones fill the frame.
- Never wrap glyphs in `overflow: hidden`. Tight tracking makes glyphs wider than
  their boxes, and masks clip them. That was the clipped "o".

## Motion

Easing curves in `promo/timing.ts`:

- `settle = bezier(0.25, 0.8, 0.35, 1)`: every entrance. Fast start, long soft
  landing.
- `smooth = bezier(0.65, 0, 0.35, 1)`: transitions, swaps and crossfades.
- `accelerate = bezier(0.7, 0, 0.84, 0)`: exits only.

Timing that shipped:

- Text lines enter over 32 frames with `settle`, staggered 5 frames per line, rising
  `0.45 * size` px. They exit over 14 frames with `accelerate`. `FadeIn` adds a
  4 px blur that clears as it arrives.
- A hero phone arrives over 84 frames with `settle`, spinning at most a quarter turn
  (`spinTurns: 0.25`), rising from 5.5 units below with a little tilt.
- Wall phones each glide in over 56 frames with a stagger, then the whole wall
  drifts linearly.
- Screen swaps last 44 frames (`SWAP_FRAMES`) and crossfade the screen texture
  (`screenMix`) instead of spinning the phone.
- Clip exits: fade over 12 to 20 frames. Sequence entries overlap by about the
  same, so one beat fades as the next arrives.
- Keep peak rotation under about 6 degrees per frame at 30 fps. Around 20 degrees
  per frame reads as strobing.

Ambient life, so no frame is ever frozen:

- Camera drift: `sin(frame / 110) * 0.6` across and `cos(frame / 140) * 0.3` up,
  scaled by `stage.cameraDrift` (default 0.35). The aim point follows at 40%.
- Float: `sin(frame / 32) * motion.float` (default 0.06) on the hero, plus a tiny
  `sin(frame / 48) * 0.03` yaw.

## Transitions

`TransitionFrame` offers none, fade, blur, rise, iris, push-left, push-up and zoom,
applied separately to entry and exit. Defaults: no entry, fade exit over 16 frames.
The dark beat enters with an iris over 22 frames. Keep the rest to fades and blurs.
Striped multi-color wipes and colored rings were removed for looking busy.

## What minimal meant in practice

- Removed: floating geometric shapes, three-color diagonal wipes, colored rings,
  hard text masks, extra copy.
- Kept: one hero object, generous space, one accent, slow drift, soft shadows.
- When unsure, take something out and add polish to what is left.

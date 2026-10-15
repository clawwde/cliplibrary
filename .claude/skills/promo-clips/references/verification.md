# Verification

Run all commands from the repo root. Put renders and screenshots in the session
scratchpad, never in the repo.

## 1. Render

```bash
bun .claude/skills/promo-clips/scripts/render-clip.ts phone-wall "$OUT/phone-wall.mp4"
bun .claude/skills/promo-clips/scripts/render-clip.ts app-promo "$OUT/handoff.mp4" 1200-1320
```

The optional third argument renders a frame range, which is much faster when you
are iterating on one handoff. Both scripts bundle `packages/compositions/src/entry.ts`
and render with `gl: 'angle'`, h264 at CRF 16, muted.

## 2. Measure motion

```bash
python3 -I .claude/skills/promo-clips/scripts/motion-qa.py "$OUT/phone-wall.mp4"
```

It measures YDIF (the mean per-pixel luma change between frames, from ffmpeg
`signalstats` at 640 px wide) and reports:

- Freeze runs: 6 or more consecutive frames with YDIF below 0.08, ignoring the final
  hold. Anything still for 0.2 s looks like a hiccup. Calm moments where only the
  camera drifts can sit near the threshold; confirm by eye before changing them.
- Hard cuts: a frame above 4 that is also more than 6 times its neighbors' average.
  Between beats there should be none. Turn them into overlapping fades.
- Motion spikes: a frame more than 2.5 times the median of its six neighbors and
  above 2. These are stutter and strobe risks: an element snapping, a spin too
  fast, a texture popping in. Spikes inside a deliberate iris or crossfade are
  expected; say which ones those are.
- The largest single-frame change and where it happens.

Report the numbers, not just "looks smooth".

## 3. Look at it

- Contact sheet of a range at full frame rate, so stutter and pops are visible:

  ```bash
  bash .claude/skills/promo-clips/scripts/contact-sheet.sh "$OUT/phone-wall.mp4" "$OUT/wall-entry.png" 0 59
  ```

  Do one for every entrance, every exit and every handoff between entries, then
  open the PNG and actually look at it.
- Full-resolution stills for close-ups: headline edges mid-reveal, the wordmark,
  phone edges, lenses and the wall's screens. For z-fighting, render three
  consecutive frames of the same spot and compare.

  ```bash
  bun .claude/skills/promo-clips/scripts/render-stills.ts "$OUT" brand-reveal@40 phone-wall@120 phone-wall@121 phone-wall@122
  ```

- Push contrast when hunting gradient banding or rings; the ring was invisible at
  normal contrast on some screens but obvious at 2x.

## 4. Check the app

```bash
bun .claude/skills/promo-clips/scripts/screenshot.ts "http://localhost:3000/clips/phone-wall" "$OUT/editor.png"
```

It waits for the network to go idle plus 9 s (an optional fourth argument changes
that), takes a full-page screenshot with GPU flags, and prints page errors and
console errors and warnings. Check the gallery, the clip editor with its controls,
and the sequence in the timeline. Zero page errors is the bar.

## 5. Export path

For changes to rendering, the render service or heavy scenes, run a real export
through the app: `POST /api/project-export` with `{ project, options: {} }`, where
`project` comes from `seedProjectForClip('<id>')` in `@cliplibrary/core`, then poll
`GET /api/project-export/<exportId>` until `status` is `done` or `error`. App Promo
exported in about 60 s on a Mac with the GPU settings. Then ffprobe the output for
resolution, duration and frame count, and sample frames from several beats.

## 6. Repo checks

`bun run verify` before every commit that touches code.

## Reporting

Tell the user what you rendered, what the motion check found, what you looked at,
and anything you could not check, such as Playwright end-to-end tests skipped
because port 3000 was taken. If the user sends a screen recording of a problem,
reproduce it in your own render before deciding whether it is the clip or their
screen.

# Requirements

Live checklist of what the editor must do, kept so nothing gets dropped between changes.
Each item traces to a request. Status is `done`, `wip`, or `todo`.

## Requests, verbatim

1. Keep the dev server on `localhost:3000` continuously updated with the latest changes.
2. Undo/redo must only capture the first and final value of a continuous interaction (dragging
   and dropping, changing a color, moving a slider from 1 to 2). It must not record every
   intermediate value such as 0.1, 0.2, 0.3.
3. Do not remove the original animation clips. Bring the older clips back.
4. Keep the timeline.
5. Build a generic environment for adding videos, then add templates as specific formats, so we
   get a timeline plus inputs and proper elements to make the videos.
6. The export must show its controls.

## Checklist

- [x] R1 Dev server on `:3000` stays live and reflects the latest committed state.
- [x] R2 Undo/redo coalesces a continuous gesture (slider drag, color pick, element drag, trim,
  resize, text entry) into a single history step holding only the first and final value.
- [x] R3 All original animations are present and are the clips the gallery lists.
- [x] R4 The timeline is present: tracks, draggable element blocks, trim and resize, layering.
- [x] R5 Generic editor environment: every clip opens in a timeline where you can add text, image,
  video and shape elements with their own inputs, reorder layers, and drop in any built-in
  animation as another layer. The real animations seed the environment as templates.
- [x] R6 Export surface shows its controls: the editor renders its property panel, the toolbar
  Export button, and the preview player controls, and the export route renders a downloadable mp4.

## Model

The editor is the generic environment. A `Project` is `{ fps, width, height, durationInFrames,
background, tracks }`; each track holds ordered elements (`text | image | video | shape |
composition`). The real animations are templates: each clip seeds the project as a `composition`
element and can be edited through its schema controls, while new elements are added on top. The
first track is the top visual layer.

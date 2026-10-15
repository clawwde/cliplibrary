# 3D in Remotion

Stack: Remotion 4 with `@remotion/three`, `@react-three/fiber` 9, `@react-three/drei`
10 and three.js. Everything 3D goes through `Stage` in `promo/stage.tsx`.

## How ThreeCanvas behaves while rendering

- While rendering, `ThreeCanvas` uses `frameloop="never"` and draws once per Remotion
  frame. A React state change does not make it draw again. Anything that loads later
  (textures, fonts) must suspend, so Remotion's `delayRender` waits for it.
- Load every image with `useTexture` from `promo/use-texture.ts`. It wraps R3F
  `useLoader(THREE.TextureLoader)`, which suspends, then sets sRGB color, anisotropy
  16 and mipmaps. Loading textures into `useState` produced black phone screens.
- Import screen and card images as modules (`promo/screen-assets.ts`) so the bundler
  ships them. Do not fetch them from `public/` at runtime.
- Animation comes only from `useCurrentFrame()`. No `useFrame`, clocks or springs
  with internal state. Multiply the frame by `motion.speed` at the top of the clip.

## Stage setup

- `dpr={2}` only when `getRemotionEnvironment().isRendering`; the live player stays
  at 1 so the editor remains responsive. 2x supersampling is what made the phone
  edges smooth in exports.
- Camera: `near = 1`, `far = 120`, set every frame in `CameraRig`. A near plane of
  0.1 wasted depth precision and caused z-fighting on the wall.
- Shadows: `shadows="variance"` (VSM), a key light at `[-2.5, 4, 12]` with a
  2048 map, radius from `stage.shadowSoftness`, bias -0.0004, and a large
  `shadowMaterial` plane at z -1.8 so phones cast a soft shadow on the backdrop.
- Lighting: ambient 0.55 (0.25 dark), a key directional light and a rim light from
  behind. The environment is a drei `Environment` with `frames={1}`, built from
  `Lightformer` panels (top strip, two side strips, a front softbox, a back panel, a
  floor bounce and a small circle highlight).
- The environment needs a gray base, `<color attach="background">` of `#6c6c73`
  (`#1f1f24` dark). With a black base, every edge, lens and back panel reflected
  pure black and the phone looked like flat plastic.
- The canvas is transparent (`alpha: true`), so the CSS `Backdrop` shows through
  and clips can be layered.

## The phone model

Sized like a modern phone: 1.465 by 3 by 0.17 units, corner radius 0.215
(`PHONE` in `promo/phone-geometry.ts`).

- Body: a rounded rectangle `ExtrudeGeometry` with a small bevel, so the sides are
  flat metal with a thin rounded edge.
- Front and back glass are real slabs (extruded, 0.016 thick, beveled 0.006) inset
  0.032 from the edge and lifted 0.002 off the body. A flat plane floating over the
  frame drew a dark outline.
- The screen is a rounded plane (radius 0.165, aspect 900 by 1950) lifted by
  `SCREEN_LIFT = 0.002` per layer above the glass, with
  `polygonOffset` (factor `-2 - layer`, units `-4 - layer * 2`). A glare layer sits
  on top with additive blending and `depthWrite: false`.
- Camera plateau: a glossy rounded slab holding three lenses. Each lens is a
  `LatheGeometry` metal housing, a domed iridescent glass cap and a dark core, plus a
  flash and a sensor. Black dots read as fake.
- Details: four side buttons, antenna bands near the top and bottom, a USB-C port
  and speaker holes. Small, but they are what make it read as a real device.
- Finishes: natural, black, white, blue and desert (`promo/phone-materials.ts`). The
  frame is `MeshPhysicalMaterial` with metalness 1, roughness 0.22, anisotropy 0.5
  and a light clearcoat. The back is matte glass (roughness 0.42, clearcoat 0.8).
- Geometries and materials are memoized by their parameters. Many phones (the wall
  has 27) share them.

## Things that broke

- Z-fighting: coplanar or nearly coplanar surfaces flicker as the camera drifts. Fix
  with a larger near plane, a real lift between layers and `polygonOffset`. Check by
  rendering three consecutive full-resolution frames of the area.
- Edge-on flips: a phone rotating through 90 degrees to the camera becomes a
  flickering sliver. Glide, tilt or crossfade instead.
- Fast spins: at 30 fps, big per-frame rotations strobe. See the motion rules in
  `design-language.md`.
- Software WebGL: headless Chrome without `gl: 'angle'` renders on the CPU and a
  single frame can exceed the 30 s timeout. `apps/render/src/render-options.ts`
  exports `BROWSER_RENDER_OPTIONS` (`angle` on macOS and Windows, `swangle` on Linux,
  120 s timeout). Spread it into every `selectComposition`, `renderMedia` and
  `renderStill` call.
- Bun tests cannot load three's CommonJS build through the gallery. Inject the tile
  component as a prop instead of mocking three.
- Next.js needs `@remotion/three` in `transpilePackages` (`apps/web/next.config.ts`).
- The editor's live preview may drop frames on very heavy scenes such as the wall.
  That only affects preview, not the frame-by-frame export, but say so to the user.

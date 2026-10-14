const RENDER_CODECS = ['h264', 'h265', 'vp8', 'vp9', 'prores', 'gif'] as const;

export type RenderCodec = (typeof RENDER_CODECS)[number];

export const PRORES_PROFILES = ['proxy', 'light', 'standard', 'hq', '4444', '4444-xq'] as const;

type ProResProfile = (typeof PRORES_PROFILES)[number];

export interface RenderOptions {
  codec: RenderCodec;
  crf: number | null;
  scale: number;
  fps: number | null;
  pixelFormat: string | null;
  proResProfile: string | null;
  jpegQuality: number;
  everyNthFrame: number;
}

export const DEFAULT_RENDER_OPTIONS: RenderOptions = {
  codec: 'h264',
  crf: 18,
  scale: 1,
  fps: null,
  pixelFormat: null,
  proResProfile: null,
  jpegQuality: 82,
  everyNthFrame: 1,
};

export const MIN_CRF = 1;
export const MAX_CRF = 51;

export const sanitizeRenderOptions = (input: unknown): RenderOptions => {
  const source = (typeof input === 'object' && input !== null ? input : {}) as {
    codec?: unknown;
    crf?: unknown;
    scale?: unknown;
    fps?: unknown;
    proResProfile?: unknown;
  };
  const codec = RENDER_CODECS.includes(source.codec as RenderCodec)
    ? (source.codec as RenderCodec)
    : DEFAULT_RENDER_OPTIONS.codec;
  const crf =
    typeof source.crf === 'number'
      ? Math.min(MAX_CRF, Math.max(MIN_CRF, Math.round(source.crf)))
      : DEFAULT_RENDER_OPTIONS.crf;
  const scale =
    typeof source.scale === 'number'
      ? Math.min(4, Math.max(0.1, source.scale))
      : DEFAULT_RENDER_OPTIONS.scale;
  const fps =
    typeof source.fps === 'number' && source.fps > 0
      ? Math.min(120, Math.round(source.fps))
      : DEFAULT_RENDER_OPTIONS.fps;
  const proResProfile = PRORES_PROFILES.includes(source.proResProfile as ProResProfile)
    ? (source.proResProfile as ProResProfile)
    : DEFAULT_RENDER_OPTIONS.proResProfile;
  return { ...DEFAULT_RENDER_OPTIONS, codec, crf, scale, fps, proResProfile };
};

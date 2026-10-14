export const RENDER_CODECS = ['h264', 'h265', 'vp8', 'vp9', 'prores', 'gif'] as const;

export type RenderCodec = (typeof RENDER_CODECS)[number];

export const PRORES_PROFILES = ['proxy', 'light', 'standard', 'hq', '4444', '4444-xq'] as const;

export const PIXEL_FORMATS = [
  'yuv420p',
  'yuva420p',
  'yuv422p',
  'yuv444p',
  'yuv420p10le',
  'yuv422p10le',
  'yuv444p10le',
  'yuva444p10le',
] as const;

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

export const outputExtension = (codec: RenderCodec): 'gif' | 'mp4' =>
  codec === 'gif' ? 'gif' : 'mp4';

export const CODEC_LABELS: Record<RenderCodec, string> = {
  h264: 'H.264 (mp4)',
  h265: 'H.265 (mp4)',
  vp8: 'VP8 (webm)',
  vp9: 'VP9 (webm)',
  prores: 'ProRes (mov)',
  gif: 'GIF',
};

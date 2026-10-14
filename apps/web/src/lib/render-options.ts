const RENDER_CODECS = ['h264', 'h265', 'vp8', 'vp9', 'prores', 'gif'] as const;

type RenderCodec = (typeof RENDER_CODECS)[number];

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

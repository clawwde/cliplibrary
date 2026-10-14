import { bundle } from '@remotion/bundler';
import { ensureBrowser } from '@remotion/renderer';
import { compositionsEntry } from './paths';

let serveUrlPromise: Promise<string> | null = null;

export const getServeUrl = (): Promise<string> => {
  if (serveUrlPromise === null) {
    serveUrlPromise = (async (): Promise<string> => {
      await ensureBrowser();
      return bundle({ entryPoint: compositionsEntry });
    })();
  }
  return serveUrlPromise;
};

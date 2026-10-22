import type { NextConfig } from 'next';

const { HTML_IN_CANVAS_ORIGIN_TRIAL_TOKEN: htmlInCanvasTrialToken } = process.env;

const config: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  transpilePackages: ['remotion', '@remotion/player', '@remotion/google-fonts', '@remotion/three'],
  headers: () =>
    Promise.resolve(
      htmlInCanvasTrialToken
        ? [
            {
              source: '/:path*',
              headers: [{ key: 'Origin-Trial', value: htmlInCanvasTrialToken }],
            },
          ]
        : [],
    ),
};

export default config;

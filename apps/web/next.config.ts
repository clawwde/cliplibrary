import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  transpilePackages: [
    '@cliplibrary/schemas',
    '@cliplibrary/core',
    '@cliplibrary/compositions',
    '@cliplibrary/ui',
    'remotion',
    '@remotion/player',
    '@remotion/google-fonts',
  ],
};

export default config;

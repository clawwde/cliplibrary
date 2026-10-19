import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  transpilePackages: ['remotion', '@remotion/player', '@remotion/google-fonts', '@remotion/three'],
};

export default config;

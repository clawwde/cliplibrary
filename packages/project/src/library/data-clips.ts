import { anim, layer, MONO, rect, scene, text } from './build';
import type { LibraryClip } from './types';

export const revenueStatClip: LibraryClip = {
  meta: {
    id: 'revenue-stat',
    title: 'Revenue Stat',
    description: 'Panel, label, headline figure, ticker strip and an accent bar as five layers.',
    category: 'data',
  },
  build: () =>
    scene({
      durationInFrames: 170,
      background: '#0a0a0a',
      tracks: [
        layer('rs-track-ticker', 'Ticker', [
          text('rs-ticker', 'AAPL +1.2%   MSFT +0.8%   NVDA +3.4%', {
            fontSize: 38,
            color: '#4ade80',
            fontFamily: MONO,
            from: 46,
            durationInFrames: 124,
            transform: { x: 0, y: 250, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 20),
          }),
        ]),
        layer('rs-track-figure', 'Figure', [
          text('rs-figure', '$642,200', {
            fontSize: 190,
            color: '#f5f5f5',
            fontFamily: MONO,
            from: 20,
            durationInFrames: 150,
            transform: { x: 0, y: 30, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 22, 'easeOut'),
          }),
        ]),
        layer('rs-track-label', 'Label', [
          text('rs-label', 'NET REVENUE  /  Q3', {
            fontSize: 44,
            color: '#a1a1aa',
            from: 10,
            durationInFrames: 160,
            transform: { x: 0, y: -210, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 16),
          }),
        ]),
        layer('rs-track-accent', 'Accent bar', [
          rect('rs-accent', {
            color: '#6366f1',
            width: 240,
            height: 14,
            radius: 7,
            from: 32,
            durationInFrames: 138,
            transform: { x: 0, y: -120, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 16, 'easeInOut'),
          }),
        ]),
        layer('rs-track-panel', 'Panel', [
          rect('rs-panel', {
            color: '#111827',
            width: 1500,
            height: 760,
            radius: 44,
            from: 0,
            durationInFrames: 170,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 16, 'easeOut'),
          }),
        ]),
      ],
    }),
};

export const statCalloutClip: LibraryClip = {
  meta: {
    id: 'stat-callout',
    title: 'Stat Callout',
    description: 'Oversized metric, trend arrow, supporting label and a framing card.',
    category: 'data',
  },
  build: () =>
    scene({
      durationInFrames: 150,
      background: '#0a0a0a',
      tracks: [
        layer('sc-track-caption', 'Caption', [
          text('sc-caption', 'week-over-week active users', {
            fontSize: 42,
            color: '#a1a1aa',
            from: 36,
            durationInFrames: 114,
            transform: { x: 0, y: 210, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('fade', 22),
          }),
        ]),
        layer('sc-track-arrow', 'Trend', [
          text('sc-arrow', '↑', {
            fontSize: 150,
            color: '#4ade80',
            from: 24,
            durationInFrames: 126,
            transform: { x: 360, y: -10, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('slide', 16, 'easeOut'),
          }),
        ]),
        layer('sc-track-metric', 'Metric', [
          text('sc-metric', '+38%', {
            fontSize: 240,
            color: '#f5f5f5',
            from: 14,
            durationInFrames: 136,
            transform: { x: -60, y: -10, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 18, 'easeOut'),
          }),
        ]),
        layer('sc-track-card', 'Card', [
          rect('sc-card', {
            color: '#111827',
            width: 1360,
            height: 700,
            radius: 40,
            from: 0,
            durationInFrames: 150,
            transform: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            animation: anim('scale', 14, 'easeOut'),
          }),
        ]),
      ],
    }),
};

export const dataClips: LibraryClip[] = [revenueStatClip, statCalloutClip];

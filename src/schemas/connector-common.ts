import { z } from 'zod';
import { zColor, zSlider } from './control';
import { darkLook, type PromoLook } from './promo-common';

export const CONNECTOR_BADGES = [
  'script-swash',
  'ruled-caps',
  'tape',
  'frame-box',
  'arc-script',
  'ribbon',
  'starburst',
  'stamp',
  'bubble',
  'arrow-sign',
  'pop-lines',
  'ampersand',
] as const;

export type ConnectorBadgeVariant = (typeof CONNECTOR_BADGES)[number];

export const connectorBadgeSchema = z.object({
  variant: z.enum(CONNECTOR_BADGES),
  word: z.string(),
  line: zColor(),
  fill: zColor(),
  text: zColor(),
});

export type ConnectorBadge = z.infer<typeof connectorBadgeSchema>;

const BADGE_COLORS: Record<ConnectorBadgeVariant, Omit<ConnectorBadge, 'variant' | 'word'>> = {
  'script-swash': { line: '#f7f3ea', fill: '#e8b866', text: '#f7f3ea' },
  'ruled-caps': { line: '#a8c7f2', fill: '#f2a481', text: '#f7f3ea' },
  tape: { line: '#f7f3ea', fill: '#d8303b', text: '#fbf6ec' },
  'frame-box': { line: '#f7f3ea', fill: '#d8303b', text: '#f7f3ea' },
  'arc-script': { line: '#f7f3ea', fill: '#f2c6a8', text: '#f2c6a8' },
  ribbon: { line: '#232326', fill: '#f4efe4', text: '#232326' },
  starburst: { line: '#f7f3ea', fill: '#f4cd48', text: '#1d1d1f' },
  stamp: { line: '#f7f3ea', fill: '#e8b866', text: '#f7f3ea' },
  bubble: { line: '#8fc3e8', fill: '#8fc3e8', text: '#f7f3ea' },
  'arrow-sign': { line: '#f7f3ea', fill: '#93c58f', text: '#1f2a20' },
  'pop-lines': { line: '#f7f3ea', fill: '#f6d36b', text: '#f6d36b' },
  ampersand: { line: '#f7f3ea', fill: '#e3b467', text: '#f7f3ea' },
};

export const connectorBadge = (
  variant: ConnectorBadgeVariant,
  word: string,
  overrides: Partial<ConnectorBadge> = {},
): ConnectorBadge => ({ variant, word, ...BADGE_COLORS[variant], ...overrides });

export const CONNECTOR_SET: ConnectorBadge[] = [
  connectorBadge('script-swash', 'and'),
  connectorBadge('ruled-caps', 'BUT'),
  connectorBadge('tape', 'THEN'),
  connectorBadge('frame-box', 'OR'),
  connectorBadge('arc-script', 'for'),
  connectorBadge('ribbon', 'PLUS'),
  connectorBadge('starburst', 'VS'),
  connectorBadge('stamp', 'TO'),
  connectorBadge('bubble', 'via'),
  connectorBadge('arrow-sign', 'YET'),
  connectorBadge('pop-lines', 'so'),
  connectorBadge('ampersand', '&'),
];

export const chalkSchema = z.object({
  width: zSlider({ min: 2, max: 30, step: 0.5 }),
  roughness: zSlider({ min: 0, max: 12, step: 0.25 }),
  dryness: zSlider({ min: 0, max: 1, step: 0.01 }),
  shadow: zSlider({ min: 0, max: 1, step: 0.01 }),
});

export type ConnectorChalk = z.infer<typeof chalkSchema>;

export const connectorChalk = (overrides: Partial<ConnectorChalk> = {}): ConnectorChalk => ({
  width: 9,
  roughness: 3.5,
  dryness: 0.35,
  shadow: 0.45,
  ...overrides,
});

export const badgeTimingSchema = z.object({
  drawFrames: zSlider({ min: 6, max: 90 }),
  eraseAt: zSlider({ min: 10, max: 600 }),
  eraseFrames: zSlider({ min: 4, max: 60 }),
});

export type BadgeTiming = z.infer<typeof badgeTimingSchema>;

export const chalkboardLook = (showBackdrop = true): PromoLook => ({
  ...darkLook('#e8b866', showBackdrop),
  background: '#2b2b2c',
  backgroundEdge: '#18181a',
  ink: '#f7f3ea',
  muted: '#77777b',
  grain: 0.22,
  spotlight: 0.12,
  paper: 'grid',
  paperLine: '#38383a',
  paperSpacing: 144,
});

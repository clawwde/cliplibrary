import { z } from 'zod';
import { zColor, zMultiline } from '../../control';
import type { ClipMeta } from '../../registry';

export const odometerLedgerSchema = z.object({
  label: z.string(),
  amount: z.string(),
  paper: zColor(),
  ink: zColor(),
  accent: zColor(),
  pills: z.array(z.object({ label: z.string(), value: z.string() })).length(3),
  ticker: zMultiline(),
});

export type OdometerLedgerProps = z.infer<typeof odometerLedgerSchema>;

export const odometerLedgerDefaults: OdometerLedgerProps = {
  label: 'NET REVENUE / Q3',
  amount: '$128,450',
  paper: '#f2efe6',
  ink: '#121212',
  accent: '#1db954',
  pills: [
    { label: 'GROWTH', value: '+24.8%' },
    { label: 'ORDERS', value: '1,204' },
    { label: 'AVG ORDER', value: '$106' },
  ],
  ticker: '▲ ARR +24.8%   ▼ CHURN -1.2%   ▲ ORDERS 1,204   ▲ AVG $106   ◆ ',
};

export const odometerLedgerMeta: ClipMeta = {
  id: 'odometer-ledger',
  title: 'Odometer Ledger',
  description:
    'Revenue digits spin on odometer reels, a line chart draws itself with a tracking dot, stat pills slide in and a ticker tape scrolls.',
  category: 'data',
  source: 'packages/compositions/src/scenes/data/odometer-ledger.tsx',
  durationInFrames: 180,
  posterFrame: 150,
  fps: 30,
  width: 1920,
  height: 1080,
};

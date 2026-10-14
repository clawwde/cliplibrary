import { z } from 'zod';
import { zColor } from '../control';

export const notificationStackSchema = z.object({
  finale: z.string(),
  from: zColor(),
  to: zColor(),
  notes: z
    .array(
      z.object({
        app: z.string(),
        initials: z.string(),
        color: zColor(),
        message: z.string(),
        time: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

export type NotificationStackProps = z.infer<typeof notificationStackSchema>;

export const notificationStackDefaults: NotificationStackProps = {
  finale: 'inbox zero.',
  from: '#2a1573',
  to: '#d6458f',
  notes: [
    {
      app: 'Calendar',
      initials: 'CA',
      color: '#ff5d5d',
      message: 'Design review moved to 3:30 PM',
      time: 'now',
    },
    {
      app: 'Mail',
      initials: 'ML',
      color: '#3b82f6',
      message: 'Ana: final copy is approved',
      time: '1m',
    },
    {
      app: 'Deploy',
      initials: 'DP',
      color: '#22c55e',
      message: 'v2.4 shipped to production',
      time: '4m',
    },
    {
      app: 'Slack',
      initials: 'SL',
      color: '#a855f7',
      message: 'Sam mentioned you in #launch',
      time: '9m',
    },
    {
      app: 'Payments',
      initials: 'PY',
      color: '#f59e0b',
      message: 'Invoice #1042 was paid',
      time: '12m',
    },
  ],
};

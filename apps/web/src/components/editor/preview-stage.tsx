'use client';

import { CLIP_COMPONENTS } from '@cliplibrary/compositions';
import type { ClipId, ClipMeta } from '@cliplibrary/schemas';
import { Maximize, Monitor, Smartphone, Square } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePersistedState } from '@/lib/use-persisted-state';
import { cn } from '@/lib/utils';

const Player = dynamic(() => import('@remotion/player').then((mod) => mod.Player), {
  ssr: false,
  loading: () => <Skeleton className="aspect-video w-full rounded-xl" />,
});

const DEVICES = [
  { key: 'mobile', label: 'Mobile', icon: Smartphone, maxWidth: 420 },
  { key: 'square', label: 'Square', icon: Square, maxWidth: 640 },
  { key: 'desktop', label: 'Desktop', icon: Monitor, maxWidth: 980 },
  { key: 'full', label: 'Full', icon: Maximize, maxWidth: null },
] as const;

type DeviceKey = (typeof DEVICES)[number]['key'];

export const PreviewStage = ({
  clipId,
  meta,
  values,
}: {
  clipId: ClipId;
  meta: ClipMeta;
  values: Record<string, unknown>;
}) => {
  const [device, setDevice] = usePersistedState<DeviceKey>('cliplibrary-device', 'desktop');
  const Component = CLIP_COMPONENTS[clipId] as FC<Record<string, unknown>>;
  const active = DEVICES.find((entry) => entry.key === device) ?? DEVICES[2];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center p-3">
        <div className="inline-flex gap-1 rounded-lg bg-muted p-1">
          {DEVICES.map((entry) => {
            const Icon = entry.icon;
            return (
              <button
                key={entry.key}
                type="button"
                onClick={() => setDevice(entry.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-muted-foreground text-xs transition-colors',
                  entry.key === device && 'bg-background text-foreground shadow-sm',
                )}
              >
                <Icon className="size-3.5" />
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-6">
        <div
          className="w-full overflow-hidden rounded-xl bg-black shadow-xl"
          style={{ maxWidth: active?.maxWidth ?? undefined }}
        >
          <Player
            component={Component}
            inputProps={values}
            durationInFrames={meta.durationInFrames}
            fps={meta.fps}
            compositionWidth={meta.width}
            compositionHeight={meta.height}
            controls
            loop
            acknowledgeRemotionLicense
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

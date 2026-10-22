'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const DesignEditorClient = dynamic(
  () => import('./design-editor').then((module) => module.DesignEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="m-6 h-[calc(100dvh-6rem)] rounded-xl" />,
  },
);

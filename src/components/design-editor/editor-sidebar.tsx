'use client';

import type { LucideIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SidebarPanel {
  id: string;
  label: string;
  Icon: LucideIcon;
  render: () => ReactNode;
}

export const EditorSidebar = ({
  panels,
  initial,
}: {
  panels: SidebarPanel[];
  initial?: string;
}) => {
  const [active, setActive] = useState<string | null>(initial ?? panels[0]?.id ?? null);
  const current = panels.find((panel) => panel.id === active);
  return (
    <aside className="flex shrink-0 border-r bg-background">
      <nav
        className="flex w-[72px] flex-col items-center gap-1 border-r py-2"
        aria-label="Editor tools"
      >
        {panels.map(({ id, label, Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => setActive((currentId) => (currentId === id ? null : id))}
            aria-pressed={active === id}
            className={cn(
              'flex w-16 flex-col items-center gap-1 rounded-lg py-2 text-[11px] transition-colors',
              active === id
                ? 'bg-violet-500/12 text-violet-600 dark:text-violet-300'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </nav>
      {current === undefined ? null : (
        <div className="flex w-[300px] flex-col">
          <h2 className="px-4 pt-4 pb-3 font-semibold text-sm">{current.label}</h2>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">{current.render()}</div>
        </div>
      )}
    </aside>
  );
};

'use client';

import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Design } from '@/design';
import { exportJson, exportPages, exportPdf } from './export-design';

interface DownloadMenuProps {
  design: Design;
  pageId: string;
  busy: boolean;
  run: (task: () => Promise<void> | void) => void;
}

const SCALES = ['1', '2', '3'] as const;

export const DownloadMenu = ({ design, pageId, busy, run }: DownloadMenuProps) => {
  const [scale, setScale] = useState<(typeof SCALES)[number]>('1');
  const [transparent, setTransparent] = useState(false);
  const factor = Number(scale);
  const allPages = design.pages.map((page) => page.id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          disabled={busy}
          className="bg-violet-600 text-white hover:bg-violet-600/90"
        >
          {busy ? <Loader2 className="animate-spin" /> : <Download />} Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Size</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={scale}
          onValueChange={(value) => setScale(SCALES.find((item) => item === value) ?? '1')}
        >
          {SCALES.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              onSelect={(event) => event.preventDefault()}
            >
              {item}× · {design.width * Number(item)} × {design.height * Number(item)} px
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuCheckboxItem
          checked={transparent}
          onSelect={(event) => event.preventDefault()}
          onCheckedChange={(checked) => setTransparent(checked === true)}
        >
          Transparent background (PNG)
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>This page</DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => run(() => exportPages(design, [pageId], 'png', factor, transparent))}
        >
          PNG
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => run(() => exportPages(design, [pageId], 'jpg', factor))}>
          JPG
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>All {design.pages.length} pages</DropdownMenuLabel>
        <DropdownMenuItem
          onSelect={() => run(() => exportPages(design, allPages, 'png', factor, transparent))}
        >
          PNG files
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => run(() => exportPages(design, allPages, 'jpg', factor))}>
          JPG files
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => run(() => exportPdf(design, factor))}>
          PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => run(() => exportJson(design))}>
          Editable design file (.json)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

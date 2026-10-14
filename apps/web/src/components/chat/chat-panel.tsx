'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const EXAMPLES = [
  'Make the headline larger and add a glow',
  'Change the background to deep blue',
  'Slow the animation down and stagger the cards',
  'Use a bouncier easing on the entrance',
];

export const ChatPanel = () => (
  <div className="flex h-full flex-col">
    <div className="flex-1 overflow-y-auto p-4">
      <div className="rounded-xl bg-muted/60 p-3.5 text-muted-foreground text-xs leading-relaxed">
        <p className="mt-0 flex items-center gap-1.5 font-medium text-foreground">
          <Sparkles className="size-3.5" />
          Edit with AI
        </p>
        <p>Describe a change to this scene, like:</p>
        <ul className="mt-1 flex list-disc flex-col gap-1 pl-4">
          {EXAMPLES.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="p-3">
      <Textarea disabled placeholder="Describe changes to this scene..." rows={2} />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">AI editing coming soon</span>
        <Button type="button" size="sm" disabled>
          Update
        </Button>
      </div>
    </div>
  </div>
);

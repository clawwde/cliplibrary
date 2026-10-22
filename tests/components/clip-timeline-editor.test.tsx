import { describe, expect, it, mock } from 'bun:test';

mock.module('@/components/clip-timeline/clip-preview', () => ({
  ClipPreview: () => null,
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { resolveClipControls, seedProjectForClip } from '@/core';
import { CLIP_MODULES } from '@/schemas';

const controlsByClip = Object.fromEntries(
  CLIP_MODULES.map((module) => [module.id, resolveClipControls(module.schema, module.controls)]),
);

const renderEditor = () =>
  render(
    <ClipTimelineEditor
      title="Phone Spin In"
      controlsByClip={controlsByClip}
      initialProject={seedProjectForClip('phone-spin-in')}
      demoSrc={null}
    />,
  );

describe('ClipTimelineEditor', () => {
  it('renders the clip as a composition element block on the timeline', () => {
    renderEditor();
    expect(screen.getAllByRole('button', { name: 'Clip element' })).toHaveLength(1);
  });

  it('shows element property controls for the auto-selected element', () => {
    renderEditor();
    expect(screen.getByText('Transform')).toBeInTheDocument();
    expect(screen.getByLabelText('From (frame)')).toBeInTheDocument();
  });

  it('inserts another built-in animation as a second composition block', () => {
    renderEditor();
    expect(screen.getAllByRole('button', { name: 'Clip element' })).toHaveLength(1);
    fireEvent.change(screen.getByLabelText('Add animation'), {
      target: { value: 'scene-transition' },
    });
    expect(screen.getAllByRole('button', { name: 'Clip element' })).toHaveLength(2);
  });
});

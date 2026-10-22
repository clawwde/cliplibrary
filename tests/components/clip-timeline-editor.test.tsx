import { describe, expect, it, mock } from 'bun:test';

mock.module('@/components/clip-timeline/clip-preview', () => ({
  ClipPreview: () => null,
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { describeSchema, seedProjectForClip } from '@/core';
import { CLIP_IDS, CLIP_SCHEMAS } from '@/schemas';

const descriptorsByClip = Object.fromEntries(
  CLIP_IDS.map((id) => [id, describeSchema(CLIP_SCHEMAS[id])]),
);

const renderEditor = () =>
  render(
    <ClipTimelineEditor
      title="Phone Spin In"
      descriptorsByClip={descriptorsByClip}
      initialProject={seedProjectForClip('phone-spin-in')}
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

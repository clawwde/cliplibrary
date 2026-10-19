import { describe, expect, it, mock } from 'bun:test';

mock.module('@/components/clip-timeline/clip-preview', () => ({
  ClipPreview: () => null,
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { describeSchema, type ProjectFile, seedProjectForClip } from '@/core';
import { CLIP_IDS, CLIP_SCHEMAS } from '@/schemas';

const descriptorsByClip = Object.fromEntries(
  CLIP_IDS.map((id) => [id, describeSchema(CLIP_SCHEMAS[id])]),
);

const buildFile = (): ProjectFile => ({
  clipId: 'phone-spin-in',
  currentVersionId: 'seed',
  project: seedProjectForClip('phone-spin-in'),
  updatedAt: new Date(0).toISOString(),
});

const renderEditor = () =>
  render(
    <ClipTimelineEditor
      clipId="phone-spin-in"
      title="Phone Spin In"
      descriptorsByClip={descriptorsByClip}
      initialProject={buildFile()}
      initialHistory={[]}
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

  it('persists an edited project through the save button', () => {
    const saved: ProjectFile = {
      ...buildFile(),
      currentVersionId: 'v2',
      updatedAt: new Date().toISOString(),
    };
    const fetchMock = mock(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(saved) } as Response),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    renderEditor();
    fireEvent.change(screen.getByLabelText('From (frame)'), { target: { value: '5' } });
    const save = screen.getByRole('button', { name: 'Save' });
    expect(save).not.toBeDisabled();
    fireEvent.click(save);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/clips/phone-spin-in/project',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });
});

import { describe, expect, it, mock } from 'bun:test';

mock.module('@/components/clip-timeline/clip-preview', () => ({
  ClipPreview: () => null,
}));

import { describeSchema, type ProjectFile, seedProjectForClip } from '@cliplibrary/core';
import { CLIP_SCHEMAS } from '@cliplibrary/schemas';
import { fireEvent, render, screen } from '@testing-library/react';
import { ClipTimelineEditor } from '../../src/components/clip-timeline/clip-timeline-editor';

const buildFile = (): ProjectFile => ({
  clipId: 'typewriter',
  currentVersionId: 'seed',
  project: seedProjectForClip('typewriter'),
  updatedAt: new Date(0).toISOString(),
});

const renderEditor = () =>
  render(
    <ClipTimelineEditor
      clipId="typewriter"
      title="Typewriter"
      descriptors={describeSchema(CLIP_SCHEMAS.typewriter)}
      initialProject={buildFile()}
      initialHistory={[]}
    />,
  );

describe('ClipTimelineEditor', () => {
  it('renders the seeded composition element on the timeline', () => {
    renderEditor();
    expect(screen.getByRole('button', { name: 'Clip element' })).toBeInTheDocument();
  });

  it('shows the schema controls when the composition element is selected', () => {
    renderEditor();
    expect(screen.getByText(/select an element/i)).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Clip element' }), { clientX: 10 });
    expect(screen.getByText('charsPerSecond')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
    expect(screen.getByText('Transform')).toBeInTheDocument();
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
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Clip element' }), { clientX: 10 });
    fireEvent.change(screen.getByLabelText('From (frame)'), { target: { value: '5' } });
    const save = screen.getByRole('button', { name: 'Save' });
    expect(save).not.toBeDisabled();
    fireEvent.click(save);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/clips/typewriter/project',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });
});

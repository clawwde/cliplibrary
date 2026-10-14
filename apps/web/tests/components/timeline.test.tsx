import { describe, expect, it, mock } from 'bun:test';
import {
  addElement,
  addTrack,
  createEmptyProject,
  createTextElement,
  createTrack,
  findElement,
  type Project,
} from '@cliplibrary/project';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { PropertyPanel } from '../../src/components/timeline/property-panel/property-panel';
import { Timeline } from '../../src/components/timeline/timeline';

const PX = 6;

const projectWithBlock = (): Project => {
  const base = createEmptyProject();
  const trackId = base.tracks[0]?.id ?? '';
  return addElement(
    base,
    trackId,
    createTextElement({ id: 'blk', from: 20, durationInFrames: 40, content: 'Hi' }),
  );
};

const noop = () => undefined;

const renderTimeline = (project: Project, overrides: Record<string, unknown> = {}) => {
  const handlers = {
    onSeek: mock(),
    onActivateTrack: mock(),
    onSelectElement: mock(),
    onMoveElement: mock(),
    onResizeElement: mock(),
    onRemoveTrack: mock(),
  };
  render(
    <Timeline
      project={project}
      pxPerFrame={PX}
      currentFrame={0}
      selectedId={null}
      activeTrackId={project.tracks[0]?.id ?? null}
      {...handlers}
      {...overrides}
    />,
  );
  return handlers;
};

describe('Timeline', () => {
  it('renders a block for each element', () => {
    renderTimeline(projectWithBlock());
    expect(screen.getByRole('button', { name: 'Text element' })).toBeInTheDocument();
  });

  it('selects an element on pointer down', () => {
    const handlers = renderTimeline(projectWithBlock());
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Text element' }), { clientX: 100 });
    expect(handlers.onSelectElement).toHaveBeenCalledWith('blk');
  });

  it('moves an element when dragged horizontally', () => {
    const handlers = renderTimeline(projectWithBlock());
    const block = screen.getByRole('button', { name: 'Text element' });
    fireEvent.pointerDown(block, { clientX: 100 });
    fireEvent.pointerMove(block, { clientX: 100 + 10 * PX });
    expect(handlers.onMoveElement).toHaveBeenCalledWith('blk', 30);
  });

  it('resizes an element when the handle is dragged', () => {
    const handlers = renderTimeline(projectWithBlock());
    const block = screen.getByRole('button', { name: 'Text element' });
    const handle = block.querySelector('[aria-hidden]');
    expect(handle).not.toBeNull();
    if (handle !== null) {
      fireEvent.pointerDown(handle, { clientX: 200 });
    }
    fireEvent.pointerMove(block, { clientX: 200 + 10 * PX });
    expect(handlers.onResizeElement).toHaveBeenCalledWith('blk', 50);
  });

  it('seeks when the ruler is clicked', () => {
    const handlers = renderTimeline(projectWithBlock());
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Seek timeline' }), {
      clientX: 10 * PX,
    });
    expect(handlers.onSeek).toHaveBeenCalledWith(10);
  });

  it('activates a track by its name', () => {
    const project = projectWithBlock();
    const handlers = renderTimeline(project);
    fireEvent.click(screen.getByRole('button', { name: 'Track 1' }));
    expect(handlers.onActivateTrack).toHaveBeenCalledWith(project.tracks[0]?.id);
  });

  it('disables track removal when only one track exists', () => {
    renderTimeline(projectWithBlock());
    expect(screen.getByRole('button', { name: 'Remove Track 1' })).toBeDisabled();
  });

  it('removes a track when more than one exists', () => {
    const project = addTrack(projectWithBlock(), createTrack('Track 2'));
    const handlers = renderTimeline(project);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Track 2' }));
    expect(handlers.onRemoveTrack).toHaveBeenCalledWith(project.tracks[1]?.id);
  });
});

const SelectionHarness = ({ project }: { project: Project }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const element = selectedId === null ? null : (findElement(project, selectedId)?.element ?? null);
  return (
    <>
      <Timeline
        project={project}
        pxPerFrame={PX}
        currentFrame={0}
        selectedId={selectedId}
        activeTrackId={project.tracks[0]?.id ?? null}
        onSeek={noop}
        onActivateTrack={noop}
        onSelectElement={setSelectedId}
        onMoveElement={noop}
        onResizeElement={noop}
        onRemoveTrack={noop}
      />
      <PropertyPanel element={element} onChange={noop} onDelete={noop} />
    </>
  );
};

describe('timeline selection flow', () => {
  it('shows an element property panel once it is selected', () => {
    render(<SelectionHarness project={projectWithBlock()} />);
    expect(screen.getByText(/select an element/i)).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Text element' }), { clientX: 100 });
    expect(screen.getByText('Transform')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hi')).toBeInTheDocument();
  });
});

import { describe, expect, it, mock } from 'bun:test';
import type { VersionSnapshot } from '@cliplibrary/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { formatSnapshot, VersionDropdown } from '../../src/components/editor/version-dropdown';

const snapshots: VersionSnapshot[] = [
  { versionId: 'v2', createdAt: '2024-01-02T10:30:00.000Z', label: 'tweak color', values: {} },
  { versionId: 'v1', createdAt: '2024-01-01T09:00:00.000Z', label: null, values: {} },
];

describe('formatSnapshot', () => {
  it('appends the label when present', () => {
    expect(formatSnapshot(snapshots[0] as VersionSnapshot)).toContain('tweak color');
  });

  it('omits the separator when there is no label', () => {
    expect(formatSnapshot(snapshots[1] as VersionSnapshot)).not.toContain('·');
  });
});

describe('VersionDropdown', () => {
  it('shows the current snapshot label in the trigger', () => {
    render(<VersionDropdown snapshots={snapshots} currentVersionId="v2" onSelect={mock()} />);
    expect(screen.getByRole('combobox', { name: 'Current version' }).textContent).toContain(
      'tweak color',
    );
  });

  it('reverts to a chosen version through the hidden native control', () => {
    const onSelect = mock();
    render(
      <form>
        <VersionDropdown snapshots={snapshots} currentVersionId="v2" onSelect={onSelect} />
      </form>,
    );
    const native = document.querySelector('select');
    expect(native).not.toBeNull();
    fireEvent.change(native as HTMLSelectElement, { target: { value: 'v1' } });
    expect(onSelect).toHaveBeenCalledWith('v1');
  });
});

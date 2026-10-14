import { describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { ExportControls } from '../../src/components/timeline/export-controls';

describe('ExportControls', () => {
  it('opens a dialog exposing format, resolution and quality controls', () => {
    render(<ExportControls state="idle" progress={0} downloadUrl={null} onExport={mock()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));
    expect(screen.getByLabelText('Format')).toBeInTheDocument();
    expect(screen.getByLabelText('Resolution')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
  });

  it('renders with the chosen settings when the render button is clicked', () => {
    const onExport = mock();
    render(<ExportControls state="idle" progress={0} downloadUrl={null} onExport={onExport} />);
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));
    fireEvent.click(screen.getByRole('button', { name: 'Render' }));
    expect(onExport).toHaveBeenCalledWith({ codec: 'h264', crf: 18, scale: 1 });
  });

  it('offers a download when a render is complete', () => {
    render(
      <ExportControls
        state="done"
        progress={1}
        downloadUrl="/api/export/x/file?download=1"
        onExport={mock()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));
    expect(screen.getByRole('link', { name: 'Download' })).toBeInTheDocument();
  });
});

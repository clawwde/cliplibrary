import { describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { ExportOptionsForm } from '../../src/components/editor/export-dialog';
import { DEFAULT_RENDER_OPTIONS, type RenderOptions } from '../../src/lib/render-options';

const renderForm = (options: Partial<RenderOptions> = {}) => {
  const onChange = mock();
  const merged: RenderOptions = { ...DEFAULT_RENDER_OPTIONS, ...options };
  const view = render(<ExportOptionsForm options={merged} onChange={onChange} />);
  return { onChange, view, merged };
};

describe('ExportOptionsForm', () => {
  it('shows the codec control with the default codec selected', () => {
    renderForm();
    expect(screen.getByRole('combobox', { name: 'Codec' }).textContent).toContain('H.264');
  });

  it('hides the ProRes profile control for non-prores codecs', () => {
    renderForm({ codec: 'h264' });
    expect(screen.queryByRole('combobox', { name: 'ProRes profile' })).toBeNull();
  });

  it('reveals the ProRes profile control when the codec is prores', () => {
    renderForm({ codec: 'prores', proResProfile: 'hq' });
    expect(screen.getByRole('combobox', { name: 'ProRes profile' })).toBeInTheDocument();
  });

  it('emits a frame rate number when the fps field changes', () => {
    const { onChange, merged } = renderForm();
    fireEvent.change(screen.getByLabelText('Frame rate'), { target: { value: '48' } });
    expect(onChange).toHaveBeenCalledWith({ ...merged, fps: 48 });
  });

  it('emits a null frame rate when the fps field is cleared', () => {
    const { onChange, merged } = renderForm({ fps: 30 });
    fireEvent.change(screen.getByLabelText('Frame rate'), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith({ ...merged, fps: null });
  });
});

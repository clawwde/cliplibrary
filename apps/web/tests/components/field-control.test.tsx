import { describe, expect, it, mock } from 'bun:test';
import type { ControlDescriptor } from '@cliplibrary/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldControl } from '../../src/components/editor/field-control';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' }
>;

const renderControl = (descriptor: LeafDescriptor, value: unknown) => {
  const onChange = mock();
  render(<FieldControl descriptor={descriptor} value={value} onChange={onChange} />);
  return onChange;
};

describe('FieldControl text', () => {
  const descriptor: LeafDescriptor = {
    kind: 'text',
    path: ['title'],
    label: 'Title',
    multiline: false,
    maxLength: 12,
  };

  it('renders a single-line input seeded with the value and max length', () => {
    renderControl(descriptor, 'Hello');
    const input = screen.getByDisplayValue('Hello') as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('maxlength')).toBe('12');
  });

  it('emits the new string on change', () => {
    const onChange = renderControl(descriptor, 'Hello');
    fireEvent.change(screen.getByDisplayValue('Hello'), { target: { value: 'World' } });
    expect(onChange).toHaveBeenCalledWith('World');
  });

  it('renders a textarea when multiline', () => {
    renderControl({ ...descriptor, multiline: true, maxLength: null }, 'Body');
    const textarea = screen.getByDisplayValue('Body');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('coerces a nullish value to an empty string', () => {
    renderControl(descriptor, null);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
  });
});

describe('FieldControl color', () => {
  const descriptor: LeafDescriptor = { kind: 'color', path: ['fill'], label: 'Fill' };

  it('shows a color swatch clamped to six hex digits and a text field with the full value', () => {
    renderControl(descriptor, '#aabbccdd');
    const swatch = screen.getByLabelText('Color') as HTMLInputElement;
    expect(swatch.getAttribute('type')).toBe('color');
    expect(swatch.value).toBe('#aabbcc');
    expect(screen.getByDisplayValue('#aabbccdd')).toBeInTheDocument();
  });

  it('emits edits from the text field', () => {
    const onChange = renderControl(descriptor, '#000000');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '#ffffff' } });
    expect(onChange).toHaveBeenCalledWith('#ffffff');
  });

  it('defaults a missing value to black', () => {
    renderControl(descriptor, undefined);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('#000000');
  });
});

describe('FieldControl number slider', () => {
  const descriptor: LeafDescriptor = {
    kind: 'number',
    path: ['speed'],
    label: 'Speed',
    min: 0,
    max: 10,
    step: 0.5,
  };

  it('renders a range and a numeric input bound to the value', () => {
    renderControl(descriptor, 4);
    const slider = screen.getByRole('slider') as HTMLInputElement;
    const spin = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(slider.value).toBe('4');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('10');
    expect(slider.step).toBe('0.5');
    expect(spin.value).toBe('4');
  });

  it('emits a number when the slider moves', () => {
    const onChange = renderControl(descriptor, 4);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '7.5' } });
    expect(onChange).toHaveBeenCalledWith(7.5);
  });

  it('emits a number when the numeric field changes', () => {
    const onChange = renderControl(descriptor, 4);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

describe('FieldControl boolean toggle', () => {
  const descriptor: LeafDescriptor = { kind: 'boolean', path: ['on'], label: 'On' };

  it('reflects the value through aria-checked', () => {
    renderControl(descriptor, true);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });

  it('toggles the current value on click', async () => {
    const onChange = renderControl(descriptor, false);
    const user = userEvent.setup();
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('FieldControl enum select', () => {
  const descriptor: LeafDescriptor = {
    kind: 'enum',
    path: ['mode'],
    label: 'Mode',
    options: ['slow', 'medium', 'fast'],
  };

  it('renders an option per enum value with the current selection', () => {
    renderControl(descriptor, 'medium');
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('medium');
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      'slow',
      'medium',
      'fast',
    ]);
  });

  it('emits the selected option', () => {
    const onChange = renderControl(descriptor, 'slow');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fast' } });
    expect(onChange).toHaveBeenCalledWith('fast');
  });
});

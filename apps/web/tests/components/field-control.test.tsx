import { afterEach, describe, expect, it, mock } from 'bun:test';
import type { ControlDescriptor } from '@cliplibrary/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldControl } from '../../src/components/editor/field-control';

type LeafDescriptor = Extract<
  ControlDescriptor,
  { kind: 'text' | 'color' | 'number' | 'boolean' | 'enum' | 'image' | 'video' }
>;

const renderControl = (descriptor: LeafDescriptor, value: unknown) => {
  const onCommit = mock();
  const onLive = mock();
  const onSeal = mock();
  render(
    <FieldControl
      descriptor={descriptor}
      value={value}
      onCommit={onCommit}
      onLive={onLive}
      onSeal={onSeal}
    />,
  );
  return { onCommit, onLive, onSeal };
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

  it('emits the new string live on change and seals on blur', () => {
    const { onLive, onSeal } = renderControl(descriptor, 'Hello');
    const input = screen.getByDisplayValue('Hello');
    fireEvent.change(input, { target: { value: 'World' } });
    expect(onLive).toHaveBeenCalledWith('World');
    fireEvent.blur(input);
    expect(onSeal).toHaveBeenCalled();
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

  it('emits edits live from the text field', () => {
    const { onLive } = renderControl(descriptor, '#000000');
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '#ffffff' } });
    expect(onLive).toHaveBeenCalledWith('#ffffff');
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

  it('renders a slider and a numeric input bound to the value', () => {
    renderControl(descriptor, 4);
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('4');
    expect(slider.getAttribute('aria-valuemin')).toBe('0');
    expect(slider.getAttribute('aria-valuemax')).toBe('10');
    expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('4');
  });

  it('emits a number live when the numeric field changes', () => {
    const { onLive } = renderControl(descriptor, 4);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '2' } });
    expect(onLive).toHaveBeenCalledWith(2);
  });
});

describe('FieldControl boolean toggle', () => {
  const descriptor: LeafDescriptor = { kind: 'boolean', path: ['on'], label: 'On' };

  it('reflects the value through aria-checked', () => {
    renderControl(descriptor, true);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });

  it('toggles the current value on click', async () => {
    const { onCommit } = renderControl(descriptor, false);
    const user = userEvent.setup();
    await user.click(screen.getByRole('switch'));
    expect(onCommit).toHaveBeenCalledWith(true);
  });
});

describe('FieldControl enum select', () => {
  const descriptor: LeafDescriptor = {
    kind: 'enum',
    path: ['mode'],
    label: 'Mode',
    options: ['slow', 'medium', 'fast'],
  };

  it('shows the current selection on the trigger', () => {
    renderControl(descriptor, 'medium');
    expect(screen.getByRole('combobox').textContent).toContain('medium');
  });

  it('coerces a nullish selection to an empty string', () => {
    renderControl(descriptor, undefined);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

describe('FieldControl image', () => {
  const descriptor: LeafDescriptor = { kind: 'image', path: ['image1'], label: 'Image' };

  it('renders an empty drop-zone with a url input when there is no value', () => {
    renderControl(descriptor, '');
    expect(screen.getByText('Drop image or click to upload')).toBeInTheDocument();
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
  });

  it('emits the pasted url live through the text field', () => {
    const { onLive } = renderControl(descriptor, '');
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'https://example.com/a.png' },
    });
    expect(onLive).toHaveBeenCalledWith('https://example.com/a.png');
  });

  it('shows a preview and a clear button once a value is set', () => {
    const { onCommit } = renderControl(descriptor, 'https://example.com/a.png');
    expect(screen.getByRole('img', { name: 'Selected image' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear image' }));
    expect(onCommit).toHaveBeenCalledWith('');
  });
});

describe('FieldControl media upload', () => {
  const descriptor: LeafDescriptor = { kind: 'image', path: ['image1'], label: 'Image' };
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  const mockUpload = (url: string) => {
    const fetchMock = mock(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ url }) } as Response),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    return fetchMock;
  };

  it('uploads a picked file and sets the field to the returned url', async () => {
    const fetchMock = mockUpload('/uploads/picked.png');
    const onCommit = mock();
    const { container } = render(
      <FieldControl
        descriptor={descriptor}
        value=""
        onCommit={onCommit}
        onLive={mock()}
        onSeal={mock()}
      />,
    );
    const input = Array.from(container.querySelectorAll('input')).find(
      (element) => element.type === 'file',
    ) as HTMLInputElement;
    const file = new File(['x'], 'a.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => expect(onCommit).toHaveBeenCalledWith('/uploads/picked.png'));
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/upload',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('uploads a dropped file', async () => {
    mockUpload('/uploads/dropped.png');
    const onCommit = mock();
    render(
      <FieldControl
        descriptor={descriptor}
        value=""
        onCommit={onCommit}
        onLive={mock()}
        onSeal={mock()}
      />,
    );
    const file = new File(['x'], 'b.png', { type: 'image/png' });
    fireEvent.drop(screen.getByRole('button', { name: /drop image/i }), {
      dataTransfer: { files: [file] },
    });
    await waitFor(() => expect(onCommit).toHaveBeenCalledWith('/uploads/dropped.png'));
  });
});

describe('FieldControl video', () => {
  const descriptor: LeafDescriptor = { kind: 'video', path: ['clip'], label: 'Clip' };

  it('renders an empty drop-zone prompting for a video', () => {
    renderControl(descriptor, '');
    expect(screen.getByText('Drop video or click to upload')).toBeInTheDocument();
  });

  it('emits the pasted url live through the text field', () => {
    const { onLive } = renderControl(descriptor, '');
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'https://example.com/a.mp4' },
    });
    expect(onLive).toHaveBeenCalledWith('https://example.com/a.mp4');
  });

  it('renders a video preview once a value is set', () => {
    const { container } = render(
      <FieldControl
        descriptor={descriptor}
        value="https://example.com/a.mp4"
        onCommit={mock()}
        onLive={mock()}
        onSeal={mock()}
      />,
    );
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});

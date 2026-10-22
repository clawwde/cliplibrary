import { describe, expect, it, mock } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { z } from 'zod';
import { PropertiesPanel } from '@/components/editor/properties-panel';
import { resolveClipControls } from '@/core';
import { zColor } from '@/schemas';

const schema = z.object({
  title: z.string(),
  subtitle: z.string(),
  colors: z.object({ title: zColor(), subtitle: zColor(), bg: zColor() }),
  items: z
    .array(z.object({ name: z.string() }))
    .min(1)
    .max(3),
});

const sections = resolveClipControls(schema, {
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'title', label: 'Headline', hint: 'The big line' },
        'subtitle',
        { link: ['colors.title', 'colors.subtitle'], label: 'Text color' },
      ],
      more: ['colors.title', 'colors.subtitle'],
    },
    { title: 'Scene', fields: ['colors.bg', { path: 'items', items: { name: 'Label' } }] },
  ],
});

const values = {
  title: 'Hi',
  subtitle: 'There',
  colors: { title: '#ffffff', subtitle: '#ffffff', bg: '#000000' },
  items: [{ name: 'One' }],
};

const renderPanel = (onChange = mock()) => {
  render(<PropertiesPanel sections={sections} values={values} onChange={onChange} />);
  return onChange;
};

describe('PropertiesPanel', () => {
  it('opens the first section and keeps later sections collapsed', () => {
    renderPanel();
    expect(screen.getByText('Headline')).toBeInTheDocument();
    expect(screen.getByText('The big line')).toBeInTheDocument();
    expect(screen.queryByText('Bg')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Scene'));
    expect(screen.getByText('Bg')).toBeInTheDocument();
  });

  it('emits updated values when a text field changes', () => {
    const onChange = renderPanel();
    fireEvent.change(screen.getByDisplayValue('Hi'), { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledWith({ ...values, title: 'Hello' });
  });

  it('writes a linked control to every target', () => {
    const onChange = renderPanel();
    expect(screen.getByLabelText('Applies to 2 properties')).toBeInTheDocument();
    const [linked] = screen.getAllByDisplayValue('#ffffff');
    if (linked === undefined) {
      throw new Error('missing linked color input');
    }
    fireEvent.change(linked, { target: { value: '#ff0000' } });
    expect(onChange).toHaveBeenCalledWith({
      ...values,
      colors: { title: '#ff0000', subtitle: '#ff0000', bg: '#000000' },
    });
  });

  it('reveals the more options of a section on demand', () => {
    renderPanel();
    expect(screen.queryByText('Subtitle')).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('#ffffff')).toHaveLength(2);
    fireEvent.click(screen.getByText('More options (2)'));
    expect(screen.getAllByDisplayValue('#ffffff')).toHaveLength(6);
  });

  it('adds an array item within bounds and labels item fields', () => {
    const onChange = renderPanel();
    fireEvent.click(screen.getByText('Scene'));
    fireEvent.click(screen.getByText('Add item'));
    expect(onChange).toHaveBeenCalledWith({ ...values, items: [{ name: 'One' }, { name: '' }] });
  });
});

import { describe, expect, it, mock } from 'bun:test';
import type { ControlDescriptor } from '@cliplibrary/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { PropertiesPanel } from '../../src/components/editor/properties-panel';

const descriptors: ControlDescriptor[] = [
  { kind: 'text', path: ['title'], label: 'Title', multiline: false, maxLength: null },
  { kind: 'color', path: ['bg'], label: 'Background' },
  {
    kind: 'array',
    path: ['items'],
    label: 'Items',
    min: 1,
    max: 3,
    item: [{ kind: 'text', path: ['name'], label: 'Name', multiline: false, maxLength: null }],
  },
];

describe('PropertiesPanel', () => {
  it('renders a control per descriptor', () => {
    render(
      <PropertiesPanel
        descriptors={descriptors}
        values={{ title: 'Hi', bg: '#000000', items: [{ name: 'One' }] }}
        onChange={mock()}
        onLive={mock()}
        onSeal={mock()}
      />,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
  });

  it('emits updated values live when a text field changes', () => {
    const onLive = mock();
    render(
      <PropertiesPanel
        descriptors={descriptors}
        values={{ title: 'Hi', bg: '#000000', items: [{ name: 'One' }] }}
        onChange={mock()}
        onLive={onLive}
        onSeal={mock()}
      />,
    );
    fireEvent.change(screen.getByDisplayValue('Hi'), { target: { value: 'Hello' } });
    expect(onLive).toHaveBeenCalledWith({
      title: 'Hello',
      bg: '#000000',
      items: [{ name: 'One' }],
    });
  });

  it('adds an array item within bounds as a discrete change', () => {
    const onChange = mock();
    render(
      <PropertiesPanel
        descriptors={descriptors}
        values={{ title: 'Hi', bg: '#000000', items: [{ name: 'One' }] }}
        onChange={onChange}
        onLive={mock()}
        onSeal={mock()}
      />,
    );
    fireEvent.click(screen.getByText('Add item'));
    expect(onChange).toHaveBeenCalledWith({
      title: 'Hi',
      bg: '#000000',
      items: [{ name: 'One' }, { name: '' }],
    });
  });
});

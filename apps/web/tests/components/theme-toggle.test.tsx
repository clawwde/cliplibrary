import { describe, expect, it } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../src/components/theme-provider';
import { ThemeToggle } from '../../src/components/theme-toggle';

describe('ThemeToggle', () => {
  it('renders a theme switch button inside the provider', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

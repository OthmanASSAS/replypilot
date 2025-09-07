// /Users/oassas/Projets/replypilot/src/app/page.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './page';

// Mocking useRouter as it might be used by a child component
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    
    // Check that the heading element contains the desired text.
    // This is more specific than searching the whole document.
    expect(heading).toHaveTextContent(/potentiel de croissance/i);
  });
});
// /Users/oassas/Projets/replypilot/src/app/analyzer/page.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AnalyzerPage from './page';
import { useRouter } from 'next/navigation';

// Mocks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

global.fetch = vi.fn();

describe('Analyzer Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useRouter as vi.Mock).mockClear();
    (global.fetch as vi.Mock).mockClear();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    (window.alert as vi.Mock).mockRestore();
  });

  it('should redirect to report page on successful analysis', async () => {
    const push = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push });

    (global.fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ analysisId: 'xyz-456' }),
    });

    render(<AnalyzerPage />);

    // Fill the form
    fireEvent.change(screen.getByLabelText(/URL de votre site web/i), {
      target: { value: 'https://good-site.com' },
    });
    fireEvent.change(screen.getByLabelText(/Votre email professionnel/i), {
      target: { value: 'pro@good-site.com' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Analyser mon site gratuitement/i }));

    // Assert that loading state is shown
    expect(screen.getByText(/Analyse en cours.../i)).toBeInTheDocument();

    // Wait for the fetch call and redirect
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://good-site.com',
          email: 'pro@good-site.com',
        }),
      });
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/report?id=xyz-456');
    });
  });

  it('should show an error message on failed analysis', async () => {
    const push = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push });

    (global.fetch as vi.Mock).mockResolvedValue({
      ok: false,
    });

    render(<AnalyzerPage />);

    fireEvent.change(screen.getByLabelText(/URL de votre site web/i), {
      target: { value: 'https://bad-site.com' },
    });
    fireEvent.change(screen.getByLabelText(/Votre email professionnel/i), {
      target: { value: 'pro@bad-site.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Analyser mon site gratuitement/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Une erreur est survenue. Veuillez réessayer.');
    });

    expect(push).not.toHaveBeenCalled();
  });
});
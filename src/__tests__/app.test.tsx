import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import ErrorBoundary from '@/app/error';

describe('ErrorBoundary', () => {
  test('renders error message', () => {
    render(<ErrorBoundary error={new Error('Test error')} reset={() => {}} />);
    expect(screen.getByText('Something went wrong!')).toBeDefined();
    expect(screen.getByText('Try again')).toBeDefined();
  });
});

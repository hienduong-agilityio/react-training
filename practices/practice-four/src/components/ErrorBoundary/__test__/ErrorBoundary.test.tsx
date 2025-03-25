// Libraries
import { render, screen } from '@testing-library/react';

// Components
import { ErrorBoundary } from '@/components';

describe('ErrorBoundary Component', () => {
  const customFallback = <div>Error occurred! Please try again later.</div>;

  const renderWithErrorBoundary = (children: React.ReactNode, fallback = customFallback) =>
    render(<ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>);

  it('renders children when no error occurs', () => {
    renderWithErrorBoundary(<div>All good!</div>);

    const goodMessage = screen.getByText('All good!');
    expect(goodMessage).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    renderWithErrorBoundary(<ThrowError />);

    const fallbackMessage = screen.getByText('Error occurred! Please try again later.');
    expect(fallbackMessage).toBeInTheDocument();
  });

  it('does not render children after an error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    renderWithErrorBoundary(<ThrowError />);
    const fallbackMessage = screen.getByText('Error occurred! Please try again later.');
    expect(fallbackMessage).toBeInTheDocument();

    const originalMessage = screen.queryByText('All good!');
    expect(originalMessage).not.toBeInTheDocument();
  });

  it('handles multiple errors correctly', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    renderWithErrorBoundary(<ThrowError />);
    expect(screen.getByText('Error occurred! Please try again later.')).toBeInTheDocument();

    renderWithErrorBoundary(<div>All good after error!</div>);

    const goodMessage = screen.getByText('All good after error!');
    expect(goodMessage).toBeInTheDocument();
  });

  it('renders the default fallback when no fallback is provided', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(<ErrorBoundary>{<ThrowError />}</ErrorBoundary>);

    const defaultFallbackMessage = screen.getByText('Something went wrong. Please try again later.');
    expect(defaultFallbackMessage).toBeInTheDocument();
  });
});

// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ErrorDisplay } from '@/components';

// Constants
import { ROUTE } from '@/constants';

describe('ErrorDisplay Component', () => {
  const renderErrorDisplay = (errorMessage: string) =>
    render(
      <MemoryRouter>
        <ErrorDisplay errorMessage={errorMessage} />
      </MemoryRouter>
    );

  it('matches snapshot for ErrorDisplay', () => {
    const errorMessage = 'An unexpected error has occurred.';
    const { asFragment } = renderErrorDisplay(errorMessage);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the error message correctly', () => {
    const errorMessage = 'An unexpected error has occurred.';
    renderErrorDisplay(errorMessage);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-3xl font-bold text-primary-600');
  });

  it('renders the link to home', () => {
    const errorMessage = 'An unexpected error has occurred.';
    renderErrorDisplay(errorMessage);

    const linkElement = screen.getByRole('link', { name: /Go to Homepage/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', ROUTE.ROOT);
  });

  it('renders nothing when no message is provided', () => {
    renderErrorDisplay('');

    const errorElement = screen.queryByText('An unexpected error has occurred.');
    expect(errorElement).not.toBeInTheDocument();
  });
});

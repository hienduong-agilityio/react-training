// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Pages
import { NotFoundPage } from '@/pages';

// Constants
import { ROUTE } from '@/constants';

describe('NotFoundPage', () => {
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });

  it('should match snapshot', () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should render 404 text, Not Found message, and Go Home link', () => {
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /Go Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', ROUTE.ROOT);
  });

  it('should navigate to home when "Go Home" is clicked', async () => {
    const user = userEvent.setup();

    const homeLink = screen.getByRole('link', { name: /Go Home/i });
    await user.click(homeLink);

    expect(homeLink).toHaveAttribute('href', ROUTE.ROOT);
  });
});

// Libraries
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// Pages
import { ProjectPage } from '@/pages';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({ pathname: '/projects', search: '', state: null }),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams('')]),
  Outlet: () => <div>Mock Outlet</div>
}));

jest.mock('@/components/ProjectTableManager', () => jest.fn(() => <div>ProjectTableManager</div>));

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('ProjectPage', () => {
  let locationMock: jest.Mock;

  beforeEach(() => {
    locationMock = useLocation as jest.Mock;
  });

  it('should match snapshot', () => {
    const { asFragment } = renderWithQueryClient(<ProjectPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render ProjectTableManager component when not in child route', () => {
    renderWithQueryClient(<ProjectPage />);
    const tableManager = screen.getByText('ProjectTableManager');
    expect(tableManager).toBeInTheDocument();
  });

  it('should render Outlet component when in child route', () => {
    locationMock.mockReturnValue({
      pathname: '/projects',
      search: '',
      state: { from: '/child-route' }
    });

    renderWithQueryClient(<ProjectPage />);
    const outlet = screen.getByText('Mock Outlet');
    expect(outlet).toBeInTheDocument();
  });
});

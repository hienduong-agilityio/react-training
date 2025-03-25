/* eslint-disable @typescript-eslint/no-explicit-any */
// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import ProjectDetail from '@/pages/ProjectDetail';

// Hooks
import { useProject } from '@/hooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to }: { to: string }) => <div>Redirecting to {to}</div>
}));

// Mocking useProject hook
jest.mock('@/hooks', () => ({
  useProject: jest.fn()
}));

jest.mock('@/components', () => ({
  ProjectDetailSkeleton: () => <div>Loading...</div>,
  ProjectDetailInfo: ({ managerName, managerAvatar }: any) => (
    <div>
      <p>Manager: {managerName}</p>
      <img src={managerAvatar} alt='Manager avatar' />
    </div>
  )
}));

jest.mock('@/pages/ProjectDetail/ProjectDetailInfo', () => ({
  ProjectDetailInfo: ({ managerName, managerAvatar }: any) => (
    <div>
      <p>Manager: {managerName}</p>
      <img src={managerAvatar} alt='Manager avatar' />
    </div>
  )
}));

describe('ProjectDetail', () => {
  const queryClient = new QueryClient();

  const renderWithProviders = (ui: JSX.Element) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/projects/1']}>
          <Routes>
            <Route path='/projects/:id' element={ui} />
            <Route path='/404' element={<div>Page Not Found</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading state initially', () => {
    (useProject as jest.Mock).mockReturnValue({
      data: null,
      isQueryProjectDetailPending: true,
      error: null
    });

    renderWithProviders(<ProjectDetail />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render 404 page if project detail is not found', () => {
    (useProject as jest.Mock).mockReturnValue({
      data: null,
      isQueryProjectDetailPending: false,
      error: null
    });

    renderWithProviders(<ProjectDetail />);

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    expect(screen.getByText(/Redirecting to \/404/i)).toBeInTheDocument();
  });

  it('should render project details if data is successfully fetched', () => {
    const mockProjectDetail = {
      id: '1',
      name: 'Test Project',
      description: 'A sample project description',
      manager: {
        managerName: 'John Doe',
        managerImage: 'https://example.com/avatar.jpg'
      }
    };

    (useProject as jest.Mock).mockReturnValue({
      data: mockProjectDetail,
      isQueryProjectDetailPending: false,
      error: null
    });

    renderWithProviders(<ProjectDetail />);

    expect(screen.getByText(/Manager: John Doe/i)).toBeInTheDocument();
    expect(screen.getByAltText('Manager avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});

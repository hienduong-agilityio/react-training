// Libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Components
import { ProjectLayout } from '@/layout';

// Constants
import { ROUTE } from '@/constants';

// Mock the images
jest.mock('@public/images/backArrow.svg', () => 'mock-back-arrow');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

/**
 ProjectLayout
  √ should render the layout and back button
  √ should navigate back if history exists
  √ should navigate to the project route if no history exists
  √ should render the Outlet for child components
  √ should match the snapshot
*/
describe('ProjectLayout', () => {
  const renderProjectLayout = (initialEntries = ['/project-layout']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path='/' element={<div>Home Page</div>} />
          <Route path={ROUTE.PROJECT} element={<div>Projects Page</div>} />
          {/* Adding a route that uses ProjectLayout */}
          <Route path='/project-layout' element={<ProjectLayout />}>
            <Route path='' element={<div>Child Component</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('should match the snapshot', () => {
    const { asFragment } = renderProjectLayout();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the layout and back button', async () => {
    renderProjectLayout();
    const backButton = await screen.findByRole('button');
    expect(backButton).toBeInTheDocument();
    expect(screen.getByAltText('Back Arrow')).toHaveAttribute('src', 'mock-back-arrow');
  });

  it('should navigate back if history exists', async () => {
    window.history.pushState({}, 'Test Page', '/project-layout');
    renderProjectLayout(['/project-layout']);

    const backButton = await screen.findByRole('button');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should navigate to the project route if no history exists', async () => {
    window.history.replaceState({}, 'Test Page', '/');

    Object.defineProperty(window, 'history', {
      writable: true,
      value: { length: 1 }
    });

    renderProjectLayout(['/project-layout']);

    const backButton = await screen.findByRole('button');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTE.PROJECT);
  });

  it('should render the Outlet for child components', async () => {
    renderProjectLayout(['/project-layout']);
    expect(await screen.findByText('Child Component')).toBeInTheDocument();
  });
});

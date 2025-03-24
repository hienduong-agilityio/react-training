// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { Navbar } from '@/layout';

// Constants
import { ROUTE } from '@/constants';

// Mock the Avatar component
jest.mock('@/components/common/Avatar', () => ({ customClass, name }: { customClass: string; name: string }) => (
  <div className={customClass}>Mocked Avatar - {name}</div>
));

// Mock the images
jest.mock('@public/images/notificationIcon.svg', () => 'mock-notify-icon');
jest.mock('@public/images/helpIcon.svg', () => 'mock-help-icon');

/**
 Navbar
  √ should render the Projects link
  √ should render the NavBar children components
*/
describe('Navbar', () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

  it('should match the snapshot', () => {
    const { asFragment } = renderNavbar();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the NavBar children components', async () => {
    renderNavbar();
    const projectLink = await screen.findByText('Projects');

    expect(projectLink).toBeInTheDocument();
    expect(projectLink).toHaveAttribute('href', ROUTE.PROJECT);

    const notificationIcon = screen.getByAltText('Notification');
    expect(notificationIcon).toBeInTheDocument();
    expect(notificationIcon).toHaveAttribute('src', 'mock-notify-icon');

    const helpIcon = screen.getByAltText('Help');
    expect(helpIcon).toBeInTheDocument();
    expect(helpIcon).toHaveAttribute('src', 'mock-help-icon');

    const avatar = screen.getByText('Mocked Avatar - HienDuong');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('rounded-full cursor-not-allowed');
  });
});

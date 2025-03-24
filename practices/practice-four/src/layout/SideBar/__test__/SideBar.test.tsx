// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { Sidebar } from '@/layout';

// Constants
import { ROUTE } from '@/constants';

// Mock the SVG imports
jest.mock('@public/images/logoIcon.svg', () => 'mock-logo');
jest.mock('@public/images/projectsIcon.svg', () => 'mock-projects-icon');
jest.mock('@public/images/settingIcon.svg', () => 'mock-setting-icon');

/*
SideBar
  √ should match snapshot
  √ should render the SideBar children
*/
describe('SideBar', () => {
  const renderSideBar = () => {
    return render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  };

  it('should match snapshot', () => {
    const { asFragment } = renderSideBar();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the SideBar children', () => {
    renderSideBar();

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'mock-logo');

    const projectsIcon = screen.getByAltText('Projects');
    expect(projectsIcon).toBeInTheDocument();
    expect(projectsIcon).toHaveAttribute('src', 'mock-projects-icon');

    const projectLink = screen.getByRole('link', { name: /projects/i });
    expect(projectLink).toHaveAttribute('href', ROUTE.PROJECT);

    const settingIcon = screen.getByAltText('Setting');
    expect(settingIcon).toBeInTheDocument();
    expect(settingIcon).toHaveAttribute('src', 'mock-setting-icon');

    const settingLink = screen.getByRole('link', { name: /setting/i });
    expect(settingLink).toHaveAttribute('href', ROUTE.SETTING);
  });
});

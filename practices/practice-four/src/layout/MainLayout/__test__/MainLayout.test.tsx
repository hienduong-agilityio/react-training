// Libraries
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { MainLayout } from '@/layout';

// Mock Layout
jest.mock('@/layout/Sidebar', () => ({
  Sidebar: () => <div>Mock Sidebar</div>
}));
jest.mock('@/layout/Navbar', () => ({
  Navbar: () => <div>Mock Navbar</div>
}));
jest.mock('@/layout/TabLayout', () => ({
  TabLayout: () => <div>Mock TabLayout</div>
}));

// Helper function to render MainLayout
const renderMainLayout = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

// Helper function to check layout components
const expectLayoutComponentsToBePresent = () => {
  expect(screen.getByText('Mock Sidebar')).toBeInTheDocument();
  expect(screen.getByText('Mock Navbar')).toBeInTheDocument();
  expect(screen.getByText('Mock TabLayout')).toBeInTheDocument();
};

/*
MainLayout component
  √ should render the sidebar, navbar and tabLayout
*/
describe('MainLayout', () => {
  it('should render the sidebar, navbar and tabLayout', () => {
    const { asFragment } = renderMainLayout();

    expectLayoutComponentsToBePresent();
    expect(asFragment()).toMatchSnapshot();
  });
});

import { render, screen } from '@testing-library/react';
import { useLocation, useParams } from 'react-router-dom';
import { TabLayout } from '@/layout';
import { generateBreadcrumbItems } from '@/helpers';
import { ROUTE } from '@/constants';

const mockedBreadcrumbs = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('@/helpers/breadcrumb', () => ({
  generateBreadcrumbItems: jest.fn()
}));

jest.mock('@/components', () => ({
  Breadcrumbs: (props: { items: { label: string; href: string }[] }) => {
    mockedBreadcrumbs(props);
    return <div>MockBreadcrumbs</div>;
  }
}));

describe('TabLayout', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: ROUTE.PROJECT_DETAILS.replace(':id', '123') });
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (generateBreadcrumbItems as jest.Mock).mockReturnValue([
      { label: 'Home', path: ROUTE.ROOT },
      { label: 'Projects', path: ROUTE.PROJECT },
      { label: 'Project Details', path: ROUTE.PROJECT_DETAILS.replace(':id', '123') }
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<TabLayout />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Breadcrumbs component with correct items', () => {
    render(<TabLayout />);
    expect(screen.getByText('MockBreadcrumbs')).toBeInTheDocument();

    expect(generateBreadcrumbItems).toHaveBeenCalledWith(ROUTE.PROJECT_DETAILS.replace(':id', '123'), '123');

    expect(mockedBreadcrumbs).toHaveBeenCalledWith({
      items: [
        { label: 'Home', path: ROUTE.ROOT },
        { label: 'Projects', path: ROUTE.PROJECT },
        { label: 'Project Details', path: ROUTE.PROJECT_DETAILS.replace(':id', '123') }
      ]
    });
  });
});

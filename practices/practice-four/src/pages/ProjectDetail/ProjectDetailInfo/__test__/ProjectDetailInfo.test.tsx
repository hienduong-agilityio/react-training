// Libraries
import { render, screen } from '@testing-library/react';

// Pages
import { ProjectDetailInfoProps, ProjectDetailInfo } from '@/pages/ProjectDetail/ProjectDetailInfo';

// Enums
import { COLORS } from '@/enums';

const defaultProps: ProjectDetailInfoProps = {
  projectName: 'Project Alpha',
  status: 'In Progress',
  managerName: 'John Doe',
  managerAvatar: '',
  lastUpdate: '2024-10-10',
  resources: '5',
  timeline: { timeStart: '2024-01-01', timeEnd: '2024-12-31' },
  budget: 100000
};

describe('ProjectDetailInfo', () => {
  let renderComponent: (props?: Partial<ProjectDetailInfoProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<ProjectDetailInfoProps> = {}) => {
      return render(<ProjectDetailInfo {...defaultProps} {...props} />);
    };
  });

  it('matches the snapshot for ProjectDetailInfo', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders project name, status, and manager info', () => {
    renderComponent();

    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    const managerNameElements = screen.getAllByText('John Doe');
    expect(managerNameElements).toHaveLength(2);
    expect(managerNameElements[0]).toBeInTheDocument();
    expect(managerNameElements[1]).toBeInTheDocument();
    expect(screen.getByText('2024-10-10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    const statusLabel = screen.getByText('In Progress');
    expect(statusLabel).toBeInTheDocument();
    expect(statusLabel).toHaveClass('text-lg py-[2px] px-3');
  });

  it('renders fallback values when optional props are missing', () => {
    renderComponent({
      projectName: 'Project Beta',
      status: COLORS.DANGER,
      managerName: 'Jane Smith',
      timeline: {}
    });

    const dashElements = screen.getAllByText('-');
    expect(dashElements).toHaveLength(2);
    expect(dashElements[0]).toBeInTheDocument();
    expect(dashElements[1]).toBeInTheDocument();
  });

  it('renders Avatar with manager name and image', () => {
    renderComponent({ managerAvatar: '/path/to/image' });

    const avatar = screen.getByAltText('John Doe avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/image');
  });

  it('renders the correct budget in CurrencyText', () => {
    renderComponent({ budget: 50000 });

    expect(screen.getByText(/\$?50000/)).toBeInTheDocument();
  });

  it('renders default timeline if timeline is missing', () => {
    renderComponent({ timeline: {} });

    const dashElements = screen.getAllByText('-');
    expect(dashElements).toHaveLength(2);
    expect(dashElements[0]).toBeInTheDocument();
    expect(dashElements[1]).toBeInTheDocument();
  });
});

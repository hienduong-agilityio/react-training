// Libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import ProjectTableManager, { IProjectTableManagerProps } from '@/pages/ProjectTable/ProjectTableManager';

// Interfaces
import { IProjectsQueryResult } from '@/interfaces';

const defaultProps: IProjectTableManagerProps = {
  searchField: 'projectName',
  searchKeyword: '',
  searchBoxRef: { current: null },
  isPending: false,
  allProjectsQuery: {
    isFetched: true,
    isFetching: false,
    error: null,
    data: []
  } as IProjectsQueryResult,
  projectData: [],
  rowsPerPage: 10,
  totalPages: 1,
  currentPage: 1,
  selectedProjectId: '',
  isDeleteModalOpen: false,
  rowPerPageOption: [
    <option key='10' value='10'>
      10
    </option>,
    <option key='20' value='20'>
      20
    </option>
  ],
  handleNewProjectClick: jest.fn(),
  handleButtonSearch: jest.fn(),
  handleDropDownChange: jest.fn(),
  handleRowsPerPageChange: jest.fn(),
  handlePageChange: jest.fn(),
  handleOpenDeleteProjectModal: jest.fn(),
  handleDeleteModalClose: jest.fn()
};

describe('ProjectTableManager', () => {
  const queryClient = new QueryClient();

  const renderComponent = (props: Partial<IProjectTableManagerProps> = {}) => {
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ProjectTableManager {...defaultProps} {...props} />
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the SearchBox, Dropdown, and New Project button', () => {
    renderComponent();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Project/i })).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);

    expect(defaultProps.handleButtonSearch).toHaveBeenCalledTimes(1);

    const newProjectButton = screen.getByRole('button', { name: /New Project/i });
    fireEvent.click(newProjectButton);

    expect(defaultProps.handleNewProjectClick).toHaveBeenCalledTimes(1);
  });

  it('displays a spinner when data is loading', () => {
    renderComponent({ isPending: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the ProjectTable when data is available', () => {
    renderComponent({
      allProjectsQuery: {
        isFetched: true,
        isFetching: false,
        error: null,
        data: [
          {
            id: '1',
            projectName: 'Project 1',
            manager: {
              managerName: 'John Doe'
            }
          }
        ]
      } as IProjectsQueryResult,
      projectData: [
        {
          id: '1',
          projectName: 'Project 1',
          manager: {
            managerName: 'John Doe'
          },
          lastUpdate: '',
          status: '',
          resources: '',
          timeline: {}
        }
      ]
    });

    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('renders the delete modal when isDeleteModalOpen is true', () => {
    renderComponent({ isDeleteModalOpen: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls handlePageChange when pagination buttons are clicked', () => {
    renderComponent({
      totalPages: 2,
      currentPage: 1
    });

    const nextPageButton = screen.getByAltText(/Arrow Right/i);
    fireEvent.click(nextPageButton);

    expect(defaultProps.handlePageChange).toHaveBeenCalledTimes(1);
  });
});

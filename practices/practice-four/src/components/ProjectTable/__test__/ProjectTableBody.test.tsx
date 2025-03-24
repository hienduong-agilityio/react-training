// Libraries
import { render, screen, RenderResult } from '@testing-library/react';
import ProjectTableBody from '@/components/ProjectTable/ProjectTableBody';
import { MemoryRouter } from 'react-router-dom';

// Interfaces
import type { IProjectItemProps } from '@/interfaces';

const mockTableData: IProjectItemProps[] = [
  {
    id: '123',
    projectName: 'Test Project 1',
    status: 'In Progress',
    manager: {
      managerName: 'John Doe',
      managerImage: '/path/to/image.jpg'
    },
    timeline: {
      timeStart: '2024-01-01',
      timeEnd: '2024-12-31'
    },
    lastUpdate: '2024-10-10',
    resources: '5',
    budget: 10000
  }
];

// Mock onDeleteProject function
const mockOnDeleteProject = jest.fn();

describe('ProjectTableBody Component', () => {
  let renderComponent: (tableData?: IProjectItemProps[]) => RenderResult;

  beforeEach(() => {
    renderComponent = (tableData = mockTableData) => {
      return render(
        <MemoryRouter>
          <ProjectTableBody tableData={tableData} onDeleteProject={mockOnDeleteProject} />
        </MemoryRouter>
      );
    };
  });

  it('matches the snapshot when no data is provided', () => {
    const { container } = renderComponent([]);
    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot when data is provided', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders project items when tableData is provided', () => {
    renderComponent();

    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe avatar')).toBeInTheDocument();
  });

  it('renders "No results found" when tableData is empty', () => {
    renderComponent([]);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});

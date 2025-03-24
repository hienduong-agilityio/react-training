// Libraries
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import { ProjectItem, IProjectItem } from '@/components';

// Enums
import { STATUS } from '@/enums/status';

// Mock data for ProjectItem
const mockProjectItem: IProjectItem = {
  id: '123456',
  projectName: 'New Project',
  status: 'On hold',
  managerId: 1,
  lastUpdate: '2024-10-10',
  resources: '5',
  timeline: {
    timeStart: '2024-01-01',
    timeEnd: '2024-12-31'
  },
  budget: 10000,
  manager: {
    id: '1',
    managerName: 'John Doe',
    managerImage: '/path/to/image.jpg'
  },
  onDeleteProject: jest.fn()
};

describe('ProjectItem Component', () => {
  const renderComponent = (props: Partial<IProjectItem> = {}) => {
    return render(
      <BrowserRouter>
        <ProjectItem {...mockProjectItem} {...props} />
      </BrowserRouter>
    );
  };

  it('should render with provided props and match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should display the correct project details', () => {
    renderComponent();

    expect(screen.getByText('456')).toBeInTheDocument();
    expect(screen.getByText('New Project')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('On hold')).toBeInTheDocument();
    expect(screen.getByText('2024-10-10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/\$?10000/)).toBeInTheDocument();
  });

  it('should use default props is provided', () => {
    renderComponent({});

    expect(screen.getByText('New Project')).toBeInTheDocument();
    expect(screen.getByText(STATUS.ON_HOLD)).toBeInTheDocument();

    const idCell = screen.getAllByRole('cell')[0];
    expect(idCell).toBeInTheDocument();

    const timelineStart = screen.queryByText('2024-01-01');
    const timelineEnd = screen.queryByText('2024-12-31');

    expect(timelineStart).not.toBeInTheDocument();
    expect(timelineEnd).not.toBeInTheDocument();
  });

  it('should trigger onDeleteProject when the delete option is clicked', () => {
    const mockOnDeleteProject = jest.fn();
    renderComponent({ onDeleteProject: mockOnDeleteProject });

    const row = screen.getByText('New Project').closest('tr');
    fireEvent.mouseEnter(row!);

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);

    expect(mockOnDeleteProject).toHaveBeenCalledWith('123456');
  });
});

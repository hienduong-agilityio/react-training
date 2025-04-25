// Libraries
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ProjectTable } from '@/components';

const mockProjectTableColumn = jest.fn();
const mockProjectTableBody = jest.fn();

jest.mock('@/components/ProjectTable/ProjectTableColumn', () => ({
  __esModule: true,
  default: (props: { [key: string]: unknown }) => {
    mockProjectTableColumn(props);
    return <div>ProjectTableColumn</div>;
  }
}));

jest.mock('@/components/ProjectTable/ProjectTableBody', () => ({
  __esModule: true,
  default: (props: { tableData: unknown[]; onDeleteProject: (id: string) => void }) => {
    mockProjectTableBody(props);
    return <div>ProjectTableBody</div>;
  }
}));

describe('ProjectTable Component', () => {
  const mockOnDeleteProject = jest.fn();

  let renderComponent: () => RenderResult;

  beforeEach(() => {
    renderComponent = () => {
      return render(
        <MemoryRouter>
          <ProjectTable onDeleteProject={mockOnDeleteProject} />
        </MemoryRouter>
      );
    };
    jest.clearAllMocks(); // reset lại giữa các test
  });

  it('renders ProjectTable correctly and matches snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders ProjectTableColumn and ProjectTableBody', () => {
    renderComponent();

    expect(mockProjectTableColumn).toHaveBeenCalled(); // Chỉ cần gọi là đủ, không có props

    expect(mockProjectTableBody).toHaveBeenCalledWith({
      tableData: [],
      onDeleteProject: mockOnDeleteProject,
      isPending: false
    });
  });
});

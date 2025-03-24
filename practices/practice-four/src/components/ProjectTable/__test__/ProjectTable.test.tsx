// Libraries
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ProjectTable } from '@/components';
import ProjectTableColumn from '@/components/ProjectTable/ProjectTableColumn';
import ProjectTableBody from '@/components/ProjectTable/ProjectTableBody';

jest.mock('@/components/ProjectTable/ProjectTableColumn', () => jest.fn(() => <div>ProjectTableColumn</div>));
jest.mock('@/components/ProjectTable/ProjectTableBody', () => jest.fn(() => <div>ProjectTableBody</div>));

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
  });

  it('renders ProjectTable correctly and matches snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders ProjectTableColumn and ProjectTableBody', () => {
    renderComponent();

    expect(ProjectTableColumn).toHaveBeenCalled();
    expect(ProjectTableBody).toHaveBeenCalledWith(
      {
        tableData: [],
        onDeleteProject: expect.any(Function)
      },
      {}
    );
  });
});

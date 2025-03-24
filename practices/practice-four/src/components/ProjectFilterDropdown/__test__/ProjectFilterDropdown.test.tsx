// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { ProjectFilterDropdown, IProjectFilterDropdownProps } from '@/components';

describe('ProjectFilterDropdown Component', () => {
  const defaultOptions = [
    { label: 'Project Name', value: 'projectName' },
    { label: 'Status', value: 'status' }
  ];

  let renderComponent: (props?: Partial<IProjectFilterDropdownProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<IProjectFilterDropdownProps> = {}) => {
      return render(
        <ProjectFilterDropdown options={defaultOptions} searchField='projectName' onChange={jest.fn()} {...props} />
      );
    };
  });

  it('should render with provided props and match snapshot', () => {
    const { container } = renderComponent();
    const dropdown = screen.getByRole('combobox');
    const optionElements = screen.getAllByRole('option');

    expect(dropdown).toBeInTheDocument();
    expect(optionElements).toHaveLength(2);
    expect(container).toMatchSnapshot();
  });

  it('should render with provided options and searchField', () => {
    renderComponent({ searchField: 'status' });

    const dropdown = screen.getByRole('combobox');
    const optionElements = screen.getAllByRole('option');

    expect(dropdown).toBeInTheDocument();
    expect(optionElements).toHaveLength(2);
    expect(optionElements[0]).toHaveTextContent('Project Name');
    expect(optionElements[1]).toHaveTextContent('Status');
    expect(dropdown).toHaveValue('status');
  });

  it('should default to projectName when no searchField is passed', () => {
    renderComponent({ searchField: undefined, onChange: undefined });

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'status' } });

    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue('projectName');
  });

  it('should render correctly when no options are provided', () => {
    renderComponent({ options: undefined });

    const dropdown = screen.getByRole('combobox');
    const optionElements = screen.queryAllByRole('option');

    expect(dropdown).toBeInTheDocument();
    expect(optionElements).toHaveLength(0);
  });
});

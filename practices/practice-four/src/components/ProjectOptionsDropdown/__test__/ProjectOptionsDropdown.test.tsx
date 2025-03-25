// Libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ProjectOptionsDropdown } from '@/components';

const defaultProps = {
  projectId: '123456789',
  onDeleteProject: jest.fn()
};

describe('ProjectOptionsDropdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = defaultProps) => {
    return render(
      <MemoryRouter>
        <ProjectOptionsDropdown {...props} />
      </MemoryRouter>
    );
  };

  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render the dropdown button', () => {
    renderComponent();
    const buttonElement = screen.getByAltText('Menu');

    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Send mail')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should close dropdown when clicking outside', () => {
    const { container } = renderComponent();
    const buttonElement = screen.getByAltText('Menu');

    fireEvent.click(buttonElement);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    fireEvent.mouseDown(container);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('should call onDelete when Delete option is clicked', () => {
    renderComponent();
    const buttonElement = screen.getByAltText('Menu');
    fireEvent.click(buttonElement);

    const deleteOption = screen.getByText('Delete');
    fireEvent.click(deleteOption);

    expect(defaultProps.onDeleteProject).toHaveBeenCalledTimes(1);
  });

  it('should not fail when projectId is an empty string', () => {
    renderComponent({ projectId: '', onDeleteProject: jest.fn() });

    const buttonElement = screen.getByAltText('Menu');
    fireEvent.click(buttonElement);

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});

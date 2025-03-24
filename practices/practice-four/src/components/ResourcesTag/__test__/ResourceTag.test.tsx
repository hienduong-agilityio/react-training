// Libraries
import { render, screen } from '@testing-library/react';

// Components
import { ResourceTag } from '@/components';

/*
ResourceTag Component
  √ should render with resources
  √ should render with dashed border and icon when no resources are provided
  √ should match snapshot with resources
  √ should match snapshot without resources
*/
describe('ResourceTag Component', () => {
  let renderComponent: (resources?: string) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (resources?: string) => {
      return render(<ResourceTag resources={resources} />);
    };
  });

  it('should match snapshot with resources', () => {
    const { container } = renderComponent('5');
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot without resources', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render with resources', () => {
    const resources = '3';
    renderComponent(resources);

    const resourceTag = screen.getByText(resources);
    expect(resourceTag).toBeInTheDocument();
  });

  it('should render with dashed border and icon when no resources are provided', () => {
    renderComponent();

    const addIcon = screen.getByRole('img');
    expect(addIcon).toBeInTheDocument();

    expect(addIcon.parentElement).toHaveClass('cursor-pointer border-dashed border-2 border-primary-400 rounded-md');
  });
});

// Libraries
import { render, screen } from '@testing-library/react';

// Components
import StatusLabel, { IStatusLabelProps } from '@/components/common/StatusLabel';

// Enums
import { COLORS } from '@/enums';

// Constants
import { COLORS_CLASS } from '@/constants';

/**
StatusLabel Component
  √ should render with default props and show dot
  √ should hide the dot when showDot is false
  √ should apply custom color
  √ should apply custom classes
  √ should match snapshot
 */
describe('StatusLabel Component', () => {
  let renderComponent: (props?: Partial<IStatusLabelProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<IStatusLabelProps> = {}) => {
      return render(<StatusLabel {...props}>Status label</StatusLabel>);
    };
  });

  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render with default props and show dot', () => {
    renderComponent();

    const dotElement = screen.getByRole('img');

    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveClass(`inline-flex color-success`);
  });

  it('should hide the dot when showDot is false', () => {
    renderComponent({ showDot: false });

    const dotElement = screen.queryByRole('img');

    expect(dotElement).not.toBeInTheDocument();
  });

  it('should apply custom color', () => {
    renderComponent({ color: COLORS.DANGER });

    const dotElement = screen.getByRole('img');

    expect(dotElement).toHaveClass(COLORS_CLASS.DANGER);
  });

  it('should apply custom classes', () => {
    const customClass = 'my-custom-class';
    renderComponent({ customClasses: customClass });

    const tagElement = screen.getByText('Status label').closest('span');

    expect(tagElement).toHaveClass(customClass);
  });
});

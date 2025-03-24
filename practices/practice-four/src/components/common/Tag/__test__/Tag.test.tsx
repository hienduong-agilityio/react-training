// Libraries
import { render, screen } from '@testing-library/react';

// Components
import Tag, { ITagProps } from '@/components/common/Tag';

// Enums
import { COLORS } from '@/enums';

// Constants
import { COLORS_CLASS } from '@/constants';

/*
Tag Component
  √ should match the snapshot
  √ should render the children content
  √ should apply custom classes
 */
describe('Tag Component', () => {
  let renderComponent: (props?: Partial<ITagProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<ITagProps> = {}) => {
      return render(<Tag {...props}>Tag Content</Tag>);
    };
  });

  it('should match the snapshot', () => {
    const { container } = renderComponent({ color: COLORS.SUCCESS });
    expect(container).toMatchSnapshot();
  });

  it('should render the children content', () => {
    renderComponent();

    const tagElement = screen.getByText('Tag Content');
    expect(tagElement).toBeInTheDocument();
    expect(tagElement).toHaveClass(COLORS_CLASS.DEFAULT);
  });

  it('should apply custom classes', () => {
    const customClass = 'my-custom-class';
    renderComponent({ customClasses: customClass });

    const tagElement = screen.getByText('Tag Content');
    expect(tagElement).toHaveClass(customClass);
  });
});

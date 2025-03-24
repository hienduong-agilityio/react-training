// Libraries
import { render, screen } from '@testing-library/react';

// Components
import { SkeletonLoader } from '@/components';

/*
SkeletonLoader Component
  √ should render with default width and height
  √ should apply custom width and height
  √ should apply rounded-full class when rounded is true
  √ should apply customClassName
  √ should match snapshot
*/
describe('SkeletonLoader Component', () => {
  const renderComponent = (props?: Partial<React.ComponentProps<typeof SkeletonLoader>>) =>
    render(<SkeletonLoader {...props} />);

  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render with default width and height', () => {
    renderComponent();

    const skeletonElement = screen.getByRole('status');
    expect(skeletonElement).toHaveStyle({ width: '100%', height: '20px' });
  });

  it('should apply custom width and height', () => {
    renderComponent({ width: '200px', height: '40px' });

    const skeletonElement = screen.getByRole('status');
    expect(skeletonElement).toHaveStyle({ width: '200px', height: '40px' });
  });

  it('should apply rounded-full class when rounded is true', () => {
    renderComponent({ rounded: true });

    const skeletonElement = screen.getByRole('status');
    expect(skeletonElement).toHaveClass('rounded-full');
  });

  it('should apply customClassName', () => {
    renderComponent({ customClassName: 'custom-class' });

    const skeletonElement = screen.getByRole('status');
    expect(skeletonElement).toHaveClass('custom-class');
  });
});

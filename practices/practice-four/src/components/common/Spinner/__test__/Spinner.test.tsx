/* eslint-disable @typescript-eslint/no-explicit-any */
// Libraries
import { render, screen } from '@testing-library/react';

// Components
import Spinner, { ISpinnerProps } from '@/components/common/Spinner';

/**
 Spinner Component
  √ should render with default size, color, and classes when no props are passed
  √ should render with size
  √ should render with custom color
  √ should apply custom classes
  √ should match the snapshot
 */
describe('Spinner Component', () => {
  let renderComponent: (props?: Partial<ISpinnerProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<ISpinnerProps> = {}) => {
      return render(<Spinner {...props} />);
    };
  });

  it('should match the snapshot', () => {
    const { container } = renderComponent({
      size: 'medium',
      color: 'text-primary-500',
      customClasses: 'custom-spinner'
    });

    expect(container).toMatchSnapshot();
  });

  it('should render with default size, color, and classes when no props are passed', () => {
    renderComponent();

    const spinnerElement = screen.getByRole('progressbar');
    expect(spinnerElement).toHaveClass('animate-spin h-6 w-6 text-primary-500');
  });

  test.each([
    { size: 'large', expectedClass: 'h-8 w-8' },
    { size: undefined, expectedClass: 'h-6 w-6' },
    { size: 'invalid-size' as any, expectedClass: 'h-6 w-6' }
  ])('should render with size: $size', ({ size, expectedClass }) => {
    renderComponent({ size });

    const spinnerElement = screen.getByRole('progressbar');
    expect(spinnerElement).toHaveClass(expectedClass);
  });

  it('should render with custom color', () => {
    renderComponent({ color: 'text-red-500' });

    const spinnerElement = screen.getByRole('progressbar');
    expect(spinnerElement).toHaveClass('text-red-500');
  });

  it('should apply custom classes', () => {
    const customClass = 'my-custom-class';
    renderComponent({ customClasses: customClass });

    const spinnerElement = screen.getByRole('progressbar');
    expect(spinnerElement).toHaveClass(customClass);
  });
});

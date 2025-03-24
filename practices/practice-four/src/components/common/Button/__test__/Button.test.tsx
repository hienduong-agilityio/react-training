// Libraries
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';

// Components
import { Button } from '@/components';

// Enums
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums';

/**
Button component
  √ renders the Button with default props
  √ applies correct variant classes
  √ applies correct size classes
  √ applies correct color classes
  √ applies custom classes
  √ disables the button when disabled is passed
  √ calls onClick when clicked
  √ renders with correct text
 */
describe('Button component', () => {
  let renderResult: RenderResult;

  const defaultProps = {
    children: 'Click me'
  };

  beforeEach(() => {
    renderResult = render(<Button {...defaultProps} />);
  });

  it('renders the Button with default props', () => {
    const buttonElement = screen.getByRole('button', { name: 'Click me' });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'flex gap-2 items-center focus:ring-4 focus:ring-primary-100 rounded-md cursor-pointer disabled:opacity-45'
    );
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('applies correct variant classes', () => {
    renderResult.rerender(<Button variant={BUTTON_VARIANTS.CONTAINED}>Contained</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Contained' });

    expect(buttonElement).toHaveClass('border-0 text-white');
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('applies correct size classes', () => {
    renderResult.rerender(<Button size={BUTTON_SIZES.LARGE}>Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Large Button' });

    expect(buttonElement).toHaveClass('px-6 py-3 text-lg');
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('applies correct color classes', () => {
    renderResult.rerender(<Button color={BUTTON_COLORS.PRIMARY}>Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Primary Button' });

    expect(buttonElement).toHaveClass('bg-primary-500 hover:bg-primary-600 focus:bg-primary-500');
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('applies custom classes', () => {
    renderResult.rerender(<Button customClasses='custom-class'>Custom Class Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Custom Class Button' });

    expect(buttonElement).toHaveClass('custom-class');
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('disables the button when disabled is passed', () => {
    renderResult.rerender(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Disabled Button' });

    expect(buttonElement).toBeDisabled();
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderResult.rerender(<Button onClick={handleClick}>Clickable Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Clickable Button' });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it('renders with correct text', () => {
    renderResult.rerender(<Button>Submit</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Submit' });

    expect(buttonElement).toHaveTextContent('Submit');
    expect(renderResult.asFragment()).toMatchSnapshot();
  });
});

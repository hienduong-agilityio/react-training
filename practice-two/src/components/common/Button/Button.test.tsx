import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const { container } = render(
      <Button
        variant="filled"
        size="large"
        color="primary"
        disabled={false}
        customClasses="extra-class"
        leftIcon={<span>Left Icon</span>}
        rightIcon={<span>Right Icon</span>}
        onClick={() => {}}
      >
        Click me
      </Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables button when disable prop is true', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled={true} onClick={handleClick}>
        Click me
      </Button>
    );
    const button = getByText('Click me');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

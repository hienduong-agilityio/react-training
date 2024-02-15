import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Button from './index';


describe('Button component', () => {
  it('snap shot', () => {
    const container = render(
      <Button variant={'outline'}>Click me</Button>
    );

    expect(container).toMatchSnapshot();
  });
  // it('renders with children', () => {
  //   const { getByText } = render(<Button>Click me</Button>);
  //   expect(getByText('Click me')).toBeInTheDocument();
  // });

  // it('applies the correct variant class', () => {
  //   const { container } = render(<Button variant="outline">Click me</Button>);
  //   expect(container.firstChild).toHaveClass(expect.stringMatching(/outline/));
  // });

  // it('applies the correct size class', () => {
  //   const { container } = render(<Button size="large">Click me</Button>);
  //   expect(container.firstChild).toHaveClass('large');
  // });

  // it('applies the correct type', () => {
  //   const { container } = render(<Button type="submit">Click me</Button>);
  //   expect(container.firstChild).toHaveAttribute('type', 'submit');
  // });

  // it('applies the correct color class', () => {
  //   const { container } = render(<Button color="primary">Click me</Button>);
  //   expect(container.firstChild).toHaveClass('primary');
  // });

  // it('disables the button when disable prop is true', () => {
  //   const { container } = render(<Button disable={true}>Click me</Button>);
  //   expect(container.firstChild).toBeDisabled();
  // });

  // it('applies custom class', () => {
  //   const { container } = render(
  //     <Button customClasses="custom-class">Click me</Button>
  //   );
  //   expect(container.firstChild).toHaveClass('custom-class');
  // });

  // it('renders left icon', () => {
  //   const { container } = render(
  //     <Button leftIcon={<i className="icon-left" />}> Click me</Button>
  //   );
  //   expect(container.querySelector('.leftIcon')).toBeInTheDocument();
  // });

  // it('renders right icon', () => {
  //   const { container } = render(
  //     <Button rightIcon={<i className="icon-right" />}> Click me</Button>
  //   );
  //   expect(container.querySelector('.rightIcon')).toBeInTheDocument();
  // });

  // it('calls onClick function when clicked', () => {
  //   const handleClick = jest.fn();
  //   const { getByText } = render(
  //     <Button onClick={handleClick}>Click me</Button>
  //   );
  //   fireEvent.click(getByText('Click me'));
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });
});

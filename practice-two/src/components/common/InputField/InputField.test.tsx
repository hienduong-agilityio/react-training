import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './index';

describe('InputField component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<InputField />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with value correctly', () => {
    const { asFragment } = render(<InputField value="Test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange handler when input changes', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<InputField placeholder="Enter value" onChange={onChangeMock} />);
    fireEvent.change(getByPlaceholderText('Enter value'), { target: { value: 'test' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('disables input when disabled prop is true', () => {
    const { asFragment } = render(<InputField disabled={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies custom classes correctly', () => {
    const { asFragment } = render(<InputField customClasses="custom-class" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

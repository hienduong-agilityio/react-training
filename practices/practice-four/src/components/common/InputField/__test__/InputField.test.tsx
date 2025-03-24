// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { InputField } from '@/components';

/**
InputField Component
  √ render correctly with a label and input
  √ apply custom classes to the input field
  √ render an error message if errorMessage is provided
  √ render without label if no label is provided
  √ accept user input using fireEvent
  √ handle ref forwarding correctly
 */
describe('InputField Component', () => {
  const inputDefaultClasses =
    'border gap-2 block outline-none focus:ring-4 focus:ring-primary-100 rounded-md py-[6px] px-3 text-gray-900 disabled:text-light disabled:bg-white shadow';
  const inputErrorClasses = 'border-red-600';
  const errorMessagesClasses = 'mt-1 text-sm text-red-600';

  const label = 'Username';
  const errorMessage = 'This field is required';

  let renderResult: ReturnType<typeof render>;

  beforeEach(() => {
    renderResult = render(<InputField label={label} id='username' />);
  });

  it('should render correctly with a label and input', () => {
    const inputElement = screen.getByLabelText(label);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(inputDefaultClasses);

    // Snapshot for InputField with label
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should apply custom classes to the input field', () => {
    renderResult.rerender(<InputField label={label} id='username' customClasses='custom-class' />);
    const inputElement = screen.getByLabelText(label);
    expect(inputElement).toHaveClass('custom-class');
    expect(inputElement).toHaveClass(inputDefaultClasses);

    // Snapshot for InputField with custom classes
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render an error message if errorMessage is provided', () => {
    renderResult.rerender(<InputField label={label} id='username' errorMessage={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass(errorMessagesClasses);

    const inputElement = screen.getByLabelText(label);
    expect(inputElement).toHaveClass(inputErrorClasses);

    // Snapshot for InputField with error message
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should render without label if no label is provided', () => {
    renderResult.rerender(<InputField id='username' />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(screen.queryByLabelText(label)).toBeNull();

    // Snapshot for InputField without label
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should accept user input using fireEvent', () => {
    const inputElement = screen.getByLabelText(label);

    fireEvent.change(inputElement, { target: { value: 'JohnDoe' } });
    expect(inputElement).toHaveValue('JohnDoe');

    // Snapshot for InputField with user input
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should handle ref forwarding correctly', () => {
    const ref = jest.fn();
    render(<InputField label='Password' id='password' ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });
});

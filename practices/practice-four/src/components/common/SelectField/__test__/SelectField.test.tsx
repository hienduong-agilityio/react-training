// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import SelectField, { ISelectFieldProps } from '@/components/common/SelectField';

/*
SelectField Component
  √ should match the snapshot when rendered
  √ should render the select element with children
  √ should have an empty name attribute if not provided
  √ should handle the default onChange function without error if not provided
  √ should render with a label if provided and associate it with the select element
  √ should render the error message if provided
  √ should apply custom classes to the select element
  √ should render with the default value
 */
describe('SelectField Component', () => {
  const onChangeMock = jest.fn();
  let renderComponent: (props?: Partial<ISelectFieldProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    jest.clearAllMocks();

    renderComponent = (props: Partial<ISelectFieldProps> = {}) => {
      return render(
        <SelectField name='test-select' onChange={onChangeMock} {...props}>
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </SelectField>
      );
    };
  });

  it('should match the snapshot when rendered', () => {
    const { container } = renderComponent({ label: 'Select an option', defaultValue: '1' });
    expect(container).toMatchSnapshot();
  });

  it('should render the select element with children', () => {
    renderComponent();
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    const errorMessage = screen.queryByText('This field is required');
    expect(errorMessage).toBeNull();

    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should have an empty name attribute if not provided', () => {
    renderComponent({ name: '' });

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.name).toBe('');
  });

  it('should handle the default onChange function without error if not provided', () => {
    renderComponent({ onChange: undefined });
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;

    expect(() => {
      fireEvent.change(selectElement, { target: { value: '2' } });
    }).not.toThrow();
  });

  it('should render with a label if provided and associate it with the select element', () => {
    renderComponent({ id: 'select-test', label: 'Select an option' });

    const labelElement = screen.getByText('Select an option');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'select-test');
  });

  it('should render the error message if provided', () => {
    renderComponent({ errorMessage: 'This field is required' });

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('should apply custom classes to the select element', () => {
    const customClass = 'custom-select-class';
    renderComponent({ customClasses: customClass });

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toHaveClass(customClass);
  });

  it('should render with the default value', () => {
    renderComponent({ defaultValue: '2' });

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe('1');
  });
});

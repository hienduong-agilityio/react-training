import { IInputProps } from '../InputField';

export interface ICheckboxProps extends IInputProps {
  checked?: boolean;
  label: React.ReactNode;
}

export const Checkbox = ({
  id = 'checkbox',
  name,
  checked,
  disabled = false,
  label,
  required,
  onChange
}: ICheckboxProps) => (
  <div className='flex items-center'>
    <input
      id={id}
      name={name}
      required={required}
      type='checkbox'
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className='w-4 h-4 border rounded bg-gray-50 dark:bg-gray-700 focus:ring-3 focus:ring-blue-300'
    />
    <label
      htmlFor={id}
      className={`ml-2 text-sm font-medium ${
        disabled ? 'text-gray-400 dark:text-gray-100' : 'text-gray-500 dark:text-gray-100'
      }`}
    >
      {label}
    </label>
  </div>
);

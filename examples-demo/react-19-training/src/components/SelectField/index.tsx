// Libraries
import { JSX, memo, ReactNode, SelectHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ISelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  // label: The label displayed above the select element.
  label?: string;
  // errorMessage: The error message to display if validation fails.
  errorMessage?: string;
  // customClasses: The custom CSS classes for styling the select element.
  customClasses?: string;
  // children: The elements to be rendered within the select dropdown.
  children: ReactNode;
}

const selectDefaultClasses: string =
  'border gap-2 block outline-none focus:ring-4 focus:ring-primary-100 rounded-md py-[6px] px-3 text-gray-900 disabled:text-light disabled:bg-white shadow';
const selectErrorClasses: string = 'border-red-600';
const errorMessagesClasses: string = 'mt-1 text-sm text-red-600';
const labelClasses: string = 'mb-2 capitalize text-lg font-medium text-gray-700';

/**
 * SelectField component
 *
 * @returns {JSX.Element} - SelectField element.
 */
const SelectField = ({
  id = '',
  label = '',
  name = '',
  errorMessage = '',
  value = '',
  defaultValue = '',
  customClasses = '',
  children,
  onChange = () => {}
}: ISelectFieldProps): JSX.Element => {
  const selectFieldClasses: string = classNames(selectDefaultClasses, customClasses, {
    [selectErrorClasses]: errorMessage
  });

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <select
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={selectFieldClasses}
      >
        {children}
      </select>
      {errorMessage && <span className={errorMessagesClasses}>{errorMessage}</span>}
    </div>
  );
};

export default memo(SelectField);

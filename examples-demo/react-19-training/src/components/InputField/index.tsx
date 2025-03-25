// Libraries
import { JSX, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { IInputProps } from '../../interfaces';

const baseInputClass: string =
  'flex-1 outline-none px-3 py-2 bg-transparent disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:cursor-pointer';
const baseContainerClass: string = 'flex items-center gap-1 px-3 border rounded-md focus-within:ring-2';
const errorContainerClass: string = 'border-danger-200 focus-within:ring-danger-200';
const normalContainerClass: string = 'border-gray-300 focus-within:ring-primary-100';
const errorMessagesClasses: string = 'text-sm text-danger-200';

/**
 * InputField component
 *
 * @returns {JSX.Element} - InputField element.
 */
const InputField = ({
  customClass: customClassNames = {},
  errorMessage = '',
  startIcon = null,
  endIcon = null,
  type = 'search',
  value,
  onChange,
  ...restProps
}: IInputProps): JSX.Element => {
  const containerClasses = twMerge(
    classNames(
      baseContainerClass,
      errorMessage ? errorContainerClass : normalContainerClass,
      customClassNames.container
    )
  );

  const inputClass = twMerge(baseInputClass, customClassNames.input);

  return (
    <div className='w-full'>
      <div className={containerClasses}>
        {startIcon && <span>{startIcon}</span>}
        <input className={inputClass} type={type} value={value} onChange={onChange} {...restProps} />
        {endIcon && <span>{endIcon}</span>}
      </div>
      {errorMessage && <span className={errorMessagesClasses}>{errorMessage}</span>}
    </div>
  );
};

export default memo(InputField);

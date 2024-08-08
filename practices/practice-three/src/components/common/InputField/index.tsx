// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Types
import type { InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // label: The label text for the input.
  label?: string;
  // customClasses: Custom class for the input.
  customClasses?: string;
  // errorMessage: Error messages for input.
  errorMessage?: string;
}

const inputDefaultClasses: string =
  'border gap-2 block outline-none focus:ring-4 focus:ring-primary-100 rounded-md py-[6px] px-3 text-dark disabled:text-light disabled:bg-white shadow';
const inputErrorClasses: string = 'border-red-600';
const errorMessagesClasses: string = 'mt-1 text-sm text-red-600';
const labelClasses: string = 'mb-2 capitalize text-sm font-medium text-gray-700';

/**
 * InputField component
 *
 * @returns {JSX.Element} - InputField element.
 */

const InputField = ({ label = '', customClasses = '', errorMessage = '', ...restProps }: IInputProps): JSX.Element => {
  const inputFieldClasses: string = classNames(inputDefaultClasses, customClasses, {
    [inputErrorClasses]: errorMessage
  });

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={restProps.id} className={labelClasses}>
          {label}
        </label>
      )}
      <input className={inputFieldClasses} {...restProps} />
      {errorMessage && <span className={errorMessagesClasses}>{errorMessage}</span>}
    </div>
  );
};

export default memo(InputField);

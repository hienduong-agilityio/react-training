// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Types
import type { InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  customClasses?: string;
  errorMessage?: string;
}

const inputDefaultClasses: string =
  'border gap-2 block outline-none focus:ring-4 focus:ring-primary-100 rounded-md py-[6px] px-3 text-dark disabled:text-light disabled:bg-white shadow';
const inputErrorClasses: string = 'border-red-600';
const errorMessagesClasses: string = 'mt-1 text-sm text-red-600';

/**
 * InputField component
 * @param customClasses Custom class for the input.
 * @param errorMessage Error messages for input.
 *
 * @returns {JSX.Element} - InputField element.
 */

const InputField = ({ customClasses = '', errorMessage = '', ...restProps }: IInputProps): JSX.Element => {
  const inputFieldClasses: string = classNames(inputDefaultClasses, customClasses, {
    [inputErrorClasses]: errorMessage
  });

  return (
    <div>
      <input className={inputFieldClasses} {...restProps} />
      {errorMessage && <span className={errorMessagesClasses}>{errorMessage}</span>}
    </div>
  );
};

export default memo(InputField);

// Library
import classNames from 'classnames';

// Types
import { InputHTMLAttributes, LegacyRef } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  customClasses?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
}

const inputDefaultClasses: string = 'border pl-5 rounded-lg transition focus:border-primary focus:outline-none';

/**
 * InputField component
 * @param customClasses - Additional custom classes for the input field.
 *
 * @returns {JSX.Element} - The InputField element.
 */

const InputField = ({ customClasses = '', inputRef, ...restProps }: IInputProps): JSX.Element => {
  const inputFiledClasses: string = classNames(inputDefaultClasses, [customClasses]);

  return <input ref={inputRef} className={inputFiledClasses} {...restProps}></input>;
};

export default InputField;

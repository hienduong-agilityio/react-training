import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  customClasses?: string;
}

const inputDefaultClasses: string =
  'w-full h-10 border pl-5 rounded-lg transition focus:border-primary focus:outline-none';

/**
 * InputField component
 * @param customClasses - Additional custom classes for the input field.
 *
 * @returns {JSX.Element} - The InputField element.
 */

const InputField = ({ customClasses = '', ...restProps }: IInputProps): JSX.Element => {
  const inputFiledClasses: string = classNames(inputDefaultClasses, [customClasses]);

  return <input className={inputFiledClasses} {...restProps}></input>;
};

export default InputField;

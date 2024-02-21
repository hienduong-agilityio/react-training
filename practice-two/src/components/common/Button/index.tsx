// Library
import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outline' | 'filled' | 'filledTonal';
  size?: 'small' | 'medium' | 'large';
  btnType?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'default';
  customClasses?: string;
}

export enum BUTTON_VARIANT {
  TEXT = 'text',
  OUTLINE = 'outline',
  FILLED = 'filled',
  FILLED_TONAL = 'filledTonal'
}

const buttonDefault: string =
  'flex gap-2 items-center hover:opacity-80 active:shadow-buttonActive cursor-pointer disabled:opacity-60';

const variantClasses: { [key in BUTTON_VARIANT]: string } = {
  text: 'bg-primary hover:bg-blue-700 border-blue-600 border hover:border-blue-700 hover:text-white',
  outline: 'border border-primary',
  filled: 'bg-primary text-white rounded-lg',
  filledTonal: 'bg-primary text-white border border-primary'
};

const sizeClasses: { [key in 'small' | 'medium' | 'large']: string } = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg'
};

const colorClasses: { [key in 'default' | 'primary' | 'secondary']: string } = {
  default: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary'
};

/**
 * Button component
 * @param variant Variant of the button. Can be one of 'text', 'outline', 'filled', or 'filledTonal'.
 * @param size Size of the button. Can be one of 'small', 'medium', or 'large'.
 * @param color Color of the button. Can be one of 'primary', 'secondary', 'light'.
 * @param customClasses Custom variant class for the button.
 *
 * @returns {JSX.Element} - Button element.
 */

const Button = ({
  children,
  variant = 'text',
  size = 'medium',
  color = 'default',
  customClasses = '',
  ...restProps
}: IButtonProps): JSX.Element => {
  const buttonClasses: string = classNames([
    buttonDefault,
    variantClasses[variant],
    sizeClasses[size],
    colorClasses[color],
    customClasses
  ]);

  return (
    <button className={buttonClasses} {...restProps}>
      {children}
    </button>
  );
};

export default Button;

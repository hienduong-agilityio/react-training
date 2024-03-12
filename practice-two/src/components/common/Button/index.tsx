// Library
import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outline' | 'filled' | 'filledTonal';
  size?: 'small' | 'medium' | 'large';
  btnType?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'default' | 'danger';
  customClasses?: string;
}

export enum BUTTON_VARIANT {
  TEXT = 'text',
  OUTLINE = 'outline',
  FILLED = 'filled',
  FILLED_TONAL = 'filledTonal'
}

const buttonDefault: string =
  'rounded-2xl justify-center font-semibold flex gap-2 items-center hover:opacity-80 active:shadow-buttonActive cursor-pointer disabled:opacity-60';

const variantClasses: { [key in BUTTON_VARIANT]: string } = {
  text: 'hover:bg-gray-200',
  outline: 'bg-white border',
  filled: 'text-white',
  filledTonal: 'text-white shadow-mg hover:shadow-lg'
};

const sizeClasses: { [key in 'small' | 'medium' | 'large']: string } = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg'
};

const colorClasses: { [key in 'default' | 'primary' | 'secondary' | 'danger']: string } = {
  default: 'text-primary border-primary',
  primary: 'bg-primary border-primary',
  secondary: 'bg-secondary border-secondary',
  danger: 'bg-danger border-danger'
};

/**
 * Button component
 * @param variant Variant of the button. Can be one of 'text', 'outline', 'filled', or 'filledTonal'.
 * @param size Size of the button. Can be one of 'small', 'medium', or 'large'.
 * @param color Color of the button. Can be one of 'primary', 'secondary', 'default'.
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

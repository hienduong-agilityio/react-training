import { useCallback, ButtonHTMLAttributes } from 'react';

// Styles
import classNames from 'classnames';

// Constants
import { BUTTON_VARIANT } from '@/constants/common';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outline' | 'filled' | 'filledTonal';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'default';
  customClasses?: string;
}

const buttonDefault: string =
  'inline-flex rounded-xl font-medium uppercase flex gap-2 w-max items-center hover:opacity-80 active:shadow-buttonActive cursor-pointer disabled:opacity-60';

const variantClasses: { [key in BUTTON_VARIANT]: string } = {
  text: 'bg-primary hover:bg-blue-700 border-blue-600 border hover:border-blue-700',
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
 * @param children Text for the button.
 * @param variant Variant of the button. Can be one of 'text', 'outline', 'filled', or 'filledTonal'.
 * @param size Size of the button. Can be one of 'small', 'medium', or 'large'.
 * @param type Type of the button. Can be one of 'button', 'submit', or 'reset'.
 * @param color Color of the button. Can be one of 'primary', 'secondary', 'light'.
 * @param disable Disable of the button. Can be one of 'true' to disable or 'false' to none disable.
 * @param customClasses Custom variant class for the button.
 * @param onClick Click event handler function for the button.
 * @returns {JSX.Element} - Button element.
 */
const Button = ({
  children,
  variant = 'text',
  size = 'medium',
  type = 'button',
  color = 'default',
  disabled = false,
  customClasses = '',
  onClick = () => {},
  ...restProps
}: IButtonProps): JSX.Element => {
  const handleButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void =
    useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(e);
      },
      [onClick]
    );

  const buttonClasses: string = classNames([
    buttonDefault,
    variantClasses[variant],
    sizeClasses[size],
    colorClasses[color],
    customClasses
  ]);

  return (
    <button
      type={
        type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'
      }
      className={buttonClasses}
      disabled={disabled}
      onClick={handleButtonClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;

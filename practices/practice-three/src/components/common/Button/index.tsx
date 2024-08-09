// Type
import type { ButtonHTMLAttributes } from 'react';

// Libraries
import { memo } from 'react';
import classNames from 'classnames';

// Enums
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums/theme';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // variant: Variant of the button. Can be one of 'text', 'outline', 'contained'.
  variant?: BUTTON_VARIANTS;
  // size: Size of the button. Can be one of 'small', 'medium', or 'large'.
  size?: BUTTON_SIZES;
  // color: Color of the button. Can be one of 'primary', 'default'.
  color?: BUTTON_COLORS;
  // customClasses: Custom variant class for the button.
  customClasses?: string;
}

const defaultClasses: string =
  'flex gap-2 items-center focus:ring-4 focus:ring-primary-100 rounded-md cursor-pointer disabled:opacity-45';

const variantClasses: { [key in BUTTON_VARIANTS]: string } = {
  [BUTTON_VARIANTS.TEXT]: 'border-white text-primary-400 hover:border-2 hover:border-primary-100',
  [BUTTON_VARIANTS.CONTAINED]: 'border-0 text-white',
  [BUTTON_VARIANTS.OUTLINED]: 'bg-white border-2 text-black'
};

const sizeClasses: { [key in BUTTON_SIZES]: string } = {
  [BUTTON_SIZES.SMALL]: 'px-3 py-1 text-sm',
  [BUTTON_SIZES.MEDIUM]: 'px-4 py-2 text-base',
  [BUTTON_SIZES.LARGE]: 'px-6 py-3 text-lg'
};

const colorClasses: { [key in BUTTON_COLORS]: string } = {
  [BUTTON_COLORS.DEFAULT]: 'text-black',
  [BUTTON_COLORS.PRIMARY]: 'bg-primary-500 hover:bg-primary-600 focus:bg-primary-500',
  [BUTTON_COLORS.DANGER]:
    'bg-danger-400 border hover:bg-danger-500 focus:bg-danger-400 hover:text-light focus:text-light'
};

/**
 * Button component
 *
 * @returns {JSX.Element} - Button element.
 */

const Button = ({
  children,
  variant = BUTTON_VARIANTS.TEXT,
  size = BUTTON_SIZES.MEDIUM,
  color = BUTTON_COLORS.DEFAULT,
  customClasses = '',
  ...restProps
}: IButtonProps): JSX.Element => {
  const buttonClasses: string = classNames(
    defaultClasses,
    variantClasses[variant],
    sizeClasses[size],
    colorClasses[color],
    customClasses
  );

  return (
    <button className={buttonClasses} {...restProps}>
      {children}
    </button>
  );
};

export default memo(Button);

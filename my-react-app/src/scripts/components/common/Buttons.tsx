const BUTTON = {
  LIGHT: 'hover:border-secondary border-2 border-light',
  DEFAULT: 'rounded text-white text-xl font-semibold justify-center',
};

const variantClasses = {
  primary: `${BUTTON.DEFAULT} bg-blue-600 hover:bg-blue-700 border-blue-600 border hover:border-blue-700`,
  secondary: `${BUTTON.DEFAULT} bg-gray-300 hover:bg-gray-400 border-gray-300 border hover:border-gray-400`,
  light: `${BUTTON.LIGHT} border hover:border-secondary border-gray rounded-lg`,
};

const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const colorClasses = {
  red: 'border-primary',
  blue: 'border-secondary',
  light: 'border-light',
};

const rounderClasses = {
  soft: 'rounded-lg',
  double: 'rounded-[50px]',
};

/**
 * Button component
 * @param children Text for the button.
 * @param variant Variant of the button. Can be one of 'primary', 'secondary', 'light', or a custom variant.
 * @param size Size of the button. Can be one of 'small', 'medium', or 'large'.
 * @param type Type of the button. Can be one of 'button', 'submit', or 'reset'.
 * @param color Color of the button. Can be one of 'red', 'blue', 'light'.
 * @param rounder Rounder of the button. Can be one of 'soft', 'double'.
 * @param customClasses  Custom variant class for the button.
 * @param onClick Click event handler function for the button.
 * @returns {JSX.Element} - Button element.
 */
const Button = ({
  children,
  variant = 'light',
  size = 'medium',
  type = 'button',
  color = 'light',
  rounder = 'soft',
  customClasses = '',
  onClick = () => {},
  ...restProps
}) => {
  const handleButtonClick = (e) => {
    onClick(e);
  };

  const buttonClasses = [
    'inline-flex items-center gap-2 pl-2 pr-2',
    sizeClasses[size],
    variantClasses[variant],
    colorClasses[color],
    rounderClasses[rounder],
    customClasses,
  ].join(' ');

  return (
    <button type={type} className={buttonClasses} color="red" onClick={handleButtonClick} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
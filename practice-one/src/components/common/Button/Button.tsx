import React, { useCallback } from 'react';

// Styles
import styles from './index.module.css';
import classNames from 'classnames';

interface IButtonProps {
  children: React.ReactNode;
  variant?: 'text' | 'outline' | 'filled' | 'filledTonal';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'icon' | 'light';
  disable?: boolean;
  customClasses?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button component
 * @param children Text for the button.
 * @param variant Variant of the button. Can be one of 'text', 'outline', 'filled', or 'filledTonal.
 * @param size Size of the button. Can be one of 'small', 'medium', or 'large'.
 * @param type Type of the button. Can be one of 'button', 'submit', or 'reset'.
 * @param color Color of the button. Can be one of 'primary', 'secondary', 'light'.
 * @param disable Disable of the button. Can be one of 'true' to disable or 'false' to none disable.
 * @param customClasses  Custom variant class for the button.
 * @param startIcon To add icon before content button.
 * @param endIcon To add icon after content button.
 * @param onClick Click event handler function for the button.
 * @returns {JSX.Element} - Button element.
 */
const Button = ({
  children,
  variant = 'text',
  size = 'medium',
  type = 'button',
  color = 'light',
  disable = false,
  customClasses = '',
  startIcon,
  endIcon,
  onClick = () => {},
  ...restProps
}: IButtonProps): JSX.Element => {
  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick(e);
    },
    [onClick],
  );

  const buttonClasses = classNames([
    styles.button,
    styles[size],
    styles[variant],
    styles[color],
    customClasses,
  ]);

  return (
    <button
      type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
      className={buttonClasses}
      disabled={disable}
      onClick={handleButtonClick}
      {...restProps}
    >
      {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
};

export default Button;

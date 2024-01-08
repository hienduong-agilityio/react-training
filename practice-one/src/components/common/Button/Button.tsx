import classNames from 'classnames';
import { BUTTON_VARIANT } from '../../../types/common';
import styles from './index.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: BUTTON_VARIANT;
  className: string;
  onClick?: () => void;
}

const Button = ({ children, variant = BUTTON_VARIANT.PRIMARY, className, onClick }: ButtonProps) => {
  const buttonClasses = classNames(styles[variant], className);

  return (
    <button type="button" onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;

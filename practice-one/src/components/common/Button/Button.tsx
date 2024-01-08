import { BUTTON_VARIANT } from '../../../types/common';
import style from './index.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: BUTTON_VARIANT;
  className: string;
  onClick?: () => void;
}

const Button = ({ children, variant = BUTTON_VARIANT.PRIMARY, className, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={`${style.button} ${style[variant]} ${style[className]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;

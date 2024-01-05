import { TEXT_VARIANT } from '../../../types/common';
import style from './index.module.css';

export interface Props {
  children: string;
  variant?: TEXT_VARIANT;
  className: string;
}

const Text = ({ children, variant = TEXT_VARIANT.NORMAL, className }: Props) => {
  return <p className={`${style.text} ${style[variant]} ${style[className]}`}>{children}</p>;
};

export default Text;

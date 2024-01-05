import { TEXT_SIZE } from '../../../types/common';
import style from './index.module.css';

export interface Props {
  children: string;
  size?: TEXT_SIZE;
  className: string;
}

const Text = ({ children, size = TEXT_SIZE.NORMAL, className }: Props) => {
  return <p className={`${style.text} ${style[size]} ${style[className]}`}>{children}</p>;
};

export default Text;

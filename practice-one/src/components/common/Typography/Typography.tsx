import classNames from 'classnames';
import { TEXT_SIZE } from '../../../types/common';
import styles from './index.module.css';

export interface Props {
  children: string;
  size?: TEXT_SIZE;
  className: string;
}

const Text = ({ children, size = TEXT_SIZE.NORMAL, className }: Props) => {
  const textClasses = classNames(styles.text, styles[size], styles[className], [className]);

  return <p className={textClasses}>{children}</p>;
};

export default Text;

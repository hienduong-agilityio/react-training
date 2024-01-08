import { LINK_TYPE } from '../../../types/common';
import styles from './index.module.css';

export interface Props {
  children: string;
  type?: LINK_TYPE;
  href: string;
  className: string;
}

const Link = ({ children, href = '#', type = LINK_TYPE.UNDERLINE, className }: Props) => {
  return (
    <a href={href} className={`${styles[type]} ${styles[className]} ${className}`}>
      {children}
    </a>
  );
};

export default Link;

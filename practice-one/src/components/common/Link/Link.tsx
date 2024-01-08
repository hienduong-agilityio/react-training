import classNames from 'classnames';
import { LINK_TYPE } from '../../../types/common';
import styles from './index.module.css';

export interface Props {
  children: React.ReactNode;
  type?: LINK_TYPE;
  href: string;
  className?: string;
}

const Link = ({ children, href = '#', type = LINK_TYPE.UNDERLINE, className }: Props) => {
  const linkClasses = classNames(styles[type], className);

  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
};

export default Link;

import classNames from 'classnames';
import { LINK_TYPE } from '../../../types/common';
import styles from './index.module.css';

export interface Props {
  children: string;
  type?: LINK_TYPE;
  href: string;
  customClasses?: string;
}

const Link = ({ children, href = '#', type = LINK_TYPE.UNDERLINE, customClasses }: Props) => {
  const linkClasses = classNames(styles[type], customClasses);

  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
};

export default Link;

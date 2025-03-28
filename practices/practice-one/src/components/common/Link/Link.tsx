// Const
import { LINK_TYPE } from '../../../constants/common';

// Styles
import classNames from 'classnames';
import styles from './index.module.css';

export interface ILinkProps {
  children: React.ReactNode;
  type?: LINK_TYPE;
  href?: string;
  customClasses?: string;
}

// TODO: Add comments params for component
const Link = ({
  children,
  href = '#',
  type = LINK_TYPE.UNDERLINE,
  customClasses,
}: ILinkProps) => {
  const linkClasses = classNames(styles[type], customClasses);

  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
};

export default Link;

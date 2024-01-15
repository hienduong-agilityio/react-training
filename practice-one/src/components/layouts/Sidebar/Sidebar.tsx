import React from 'react';

// Component
import Link from '../../common/Link/Link';

// Style
import styles from './index.module.css';

// Constant
import { LINK_TYPE } from '../../../constants/common';

interface ISidebar {
  children: React.ReactNode;
  title: string;
}

// TODO: Add comments params for component
const Sidebar = ({ children, title = '' }: ISidebar) => {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebarMenu}>
        <h2 className={styles.sidebarTitle}>{title}</h2>
        <ul className={styles.sidebarList}>{children}</ul>
      </section>
    </aside>
  );
};

// TODO: Add comments params for component
const SidebarItem = ({ children, title = '' }: ISidebar) => {
  return (
    <li className={styles.sidebarItem}>
      <Link type={LINK_TYPE.NONE} customClasses={styles.sidebarLink}>
        {children}
        <h3 className={styles.linkText}>{title}</h3>
      </Link>
    </li>
  );
};

export { Sidebar, SidebarItem };

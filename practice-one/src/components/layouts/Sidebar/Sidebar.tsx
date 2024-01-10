import React from 'react';
import Link from '../../common/Link/Link';
import styles from './index.module.css';
import { LINK_TYPE } from '../../../types/common';

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
      <Link type={LINK_TYPE.NONE} href="javascript:void(0)" customClasses={styles.sidebarLink}>
        {children}
        <h3 className={styles.linkText}>{title}</h3>
      </Link>
    </li>
  );
};

export { Sidebar, SidebarItem };

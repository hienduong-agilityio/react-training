import React, { useState } from 'react';
import Link from '../../common/Link/Link';
import Button from '../../common/Button/Button';
import styles from './index.module.css';
import { BUTTON_VARIANT, LINK_TYPE } from '../../../types/common';

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
  const [isActive, setIsActive] = useState(false);

  const handleItemClick = () => {
    setIsActive(!isActive);
  };

  return (
    <li className={`sidebarItem ${isActive ? 'sidebarItem--active' : ''}`}>
      <Button
        variant={BUTTON_VARIANT.OUTLINE}
        customClasses={styles.sidebarLink}
        onClick={handleItemClick}
      >
        <Link type={LINK_TYPE.NONE} href="javascript:void(0)" customClasses={styles.sidebarLink}>
          <h3 className={styles.linkText}>{title}</h3>
          {children}
        </Link>
      </Button>
    </li>
  );
};

export { Sidebar, SidebarItem };

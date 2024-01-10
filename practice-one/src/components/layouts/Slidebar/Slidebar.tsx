import React, { useState } from 'react';
import Link from '../../common/Link/Link';
import Button from '../../common/Button/Button';
import styles from './index.module.css';
import { BUTTON_VARIANT, LINK_TYPE } from '../../../types/common';

interface ISidebar {
  children: React.ReactNode;
  title: string;
}

const Sidebar = ({ children, title = '' }: ISidebar) => {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebar__menu}>
        <h2 className={styles.sidebar__title}>{title}</h2>
        <ul className={styles.sidebar__list}>{children}</ul>
      </section>
    </aside>
  );
};

const SidebarItem = ({ children, title = '' }: ISidebar) => {
  const [isActive, setIsActive] = useState(false);

  const handleItemClick = () => {
    setIsActive(!isActive);
  };

  return (
    <li className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}>
      <Button
        variant={BUTTON_VARIANT.OUTLINE}
        customClasses={styles.sidebar__link}
        onClick={handleItemClick}
      >
        <Link type={LINK_TYPE.NONE} href="javascript:void(0)" customClasses={styles.sidebar__link}>
          <h3 className={styles.link__text}>{title}</h3>
          {children}
        </Link>
      </Button>
    </li>
  );
};

export { Sidebar, SidebarItem };

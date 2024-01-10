import { BUTTON_VARIANT, LINK_TYPE } from '../../../types/common';
import Button from '../../common/Button/Button';
import Link from '../../common/Link/Link';
import styles from './index.module.css';

interface INavbarProps {
  logoSrc: string;
  altText: string;
}

const Navbar = ({ logoSrc = '', altText = '' }: INavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <NavbarButton />
      <div className={styles.navbarLogo}>
        <Link type={LINK_TYPE.NONE} href="#">
          <img src={logoSrc} className={styles.logo} alt={altText} />
        </Link>
      </div>
    </nav>
  );
};

const NavbarButton = () => {
  return (
    <Button variant={BUTTON_VARIANT.TEXT} customClasses={styles.navbarButton}>
      <div className={styles.icon}>
        <span className={styles.icon__line}></span>
        <span className={styles.icon__line}></span>
        <span className={styles.icon__line}></span>
      </div>
    </Button>
  );
};

export default Navbar;

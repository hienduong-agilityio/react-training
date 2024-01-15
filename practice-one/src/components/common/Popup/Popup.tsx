import React from 'react';

// Component
import Button from '../Button/Button';

// Style
import styles from './index.module.css';

interface IPopupProps {
  isOpen: boolean;
  onClosePopup?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeButton?: boolean;
  closeButtonContent?: string;
  customClasses?: string;
  arrowPopup?: boolean;
  isFixed?: boolean;
  children?: React.ReactNode | string;
}

// TODO: Add comments params for component
const Popup = ({
  isOpen = false,
  onClosePopup = () => {},
  closeButton = true,
  closeButtonContent = 'Close',
  children,
  customClasses,
  arrowPopup = true,
  isFixed = false,
}: IPopupProps) => {
  const popupClasses = customClasses ? `${customClasses}` : styles.popup;

  return isOpen ? (
    <>
      {isFixed && (
        <Button
          type="button"
          customClasses={styles.overlay}
          onClick={onClosePopup}
          aria-label="Close popup"
        >
          {undefined}
        </Button>
      )}
      <div className={styles.container}>
        <div className={popupClasses}>
          <div className={styles.flexContainer}>
            {children}
            {closeButton && (
              <div className={styles.closeButton}>
                <Button onClick={onClosePopup}>{closeButtonContent}</Button>
              </div>
            )}
          </div>
        </div>
        {arrowPopup && <div className={styles.arrow} />}
      </div>
    </>
  ) : null;
};

export default Popup;

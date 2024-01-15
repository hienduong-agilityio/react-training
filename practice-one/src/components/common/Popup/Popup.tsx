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
  isFixed?: boolean;
  children?: React.ReactNode | string;
}

// TODO: Add comments params for component
const Popup = ({
  isOpen = false,
  onClosePopup = () => {},
  closeButton = true,
  closeButtonContent = 'X',
  children,
  customClasses,
  isFixed = false,
}: IPopupProps) => {
  const popupClasses = customClasses ? `${customClasses}` : styles.popupDefault;

  return isOpen ? (
    <>
      {isFixed && (
        <button type="button" className={styles.overlay} onClick={onClosePopup} aria-label="Close popup">
          {undefined}
        </button>
      )}
      <div className={styles.container}>
        <div className={popupClasses}>
          <div className={styles.flexContainer}>
            {children}
            {closeButton && (
              <div className={styles.closeButtonContent}>
                <Button customClasses={styles.closeButton} onClick={onClosePopup}>{closeButtonContent}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Popup;

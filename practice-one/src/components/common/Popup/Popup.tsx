import React from 'react';
import styles from './index.module.css';
import Button from '../Button/Button';

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
  closeButtonContent = 'Close',
  children,
  customClasses,
  isFixed = false,
}: IPopupProps) => {
  const popupClasses = customClasses ? `${customClasses}` : styles.popup;

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
              <div className={styles.closeButton}>
                <Button onClick={onClosePopup}>{closeButtonContent}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Popup;

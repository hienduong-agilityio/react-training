import React from 'react';
import styles from './index.module.css'; // Import module CSS
import Button from '../Button/Button';

interface IPopoverProps {
  isOpen: boolean;
  onClosePopover?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeButton?: boolean;
  closeButtonContent?: string;
  popoverClassName?: string;
  arrowPopover?: boolean;
  isFixed?: boolean;
  children?: React.ReactNode | string;
}

const Popover = ({
  isOpen = false,
  onClosePopover = () => {},
  closeButton = true,
  closeButtonContent = 'Close',
  children,
  popoverClassName,
  arrowPopover = true,
  isFixed = false,
}: IPopoverProps) => {
  const defaultPopoverClassName = styles.defaultPopoverClassName; // Use styles from module CSS
  const customPopoverClassName = popoverClassName ? `${popoverClassName}` : defaultPopoverClassName;

  return isOpen ? (
    <>
      {isFixed && (
        <Button
          type="button"
          customClasses={styles.overlay}
          onClick={onClosePopover}
          aria-label="Close popover"
        >
          {undefined}
        </Button>
      )}
      <div className={styles.container}>
        <div className={customPopoverClassName}>
          <div className={styles.flexContainer}>
            {children}
            {closeButton && (
              <div className={styles.closeButton}>
                <Button onClick={onClosePopover}>{closeButtonContent}</Button>
              </div>
            )}
          </div>
        </div>
        {arrowPopover && <div className={styles.arrow} />}
      </div>
    </>
  ) : null;
};

export default Popover;

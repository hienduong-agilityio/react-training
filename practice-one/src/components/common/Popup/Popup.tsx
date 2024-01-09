import classNames from 'classnames';
import React from 'react';
import styles from './index.module.css';
import Button from '../Button/Button';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Popup = ({ isOpen, onClose, children, className }: PopupProps) => {
  const overlayClasses = classNames(styles.overlay, className);
  if (!isOpen) return null;

  return (
    <div className={overlayClasses}>
      <div className={styles.popup}>
        <Button customClasses={styles.closeButton} onClick={onClose}>
          Close
        </Button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;

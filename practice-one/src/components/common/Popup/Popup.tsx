import React from 'react';
import style from './index.module.css';
import Button from '../Button/Button';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Popup = ({ isOpen, onClose, children, className }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={`${style.overlay} ${className}`}>
      <div className={style.popup}>
        <Button className={style.closeButton} onClick={onClose}>
          Close
        </Button>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;

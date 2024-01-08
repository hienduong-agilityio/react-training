import React from 'react';
import style from './index.module.css';

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
        <button type="button" className={style.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;

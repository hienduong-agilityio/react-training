import { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from '../Button/Button';
import { BUTTON_VARIANT } from '../../../types/common';

interface MessageProps {
  onClose?: () => void;
  text?: string;
  title?: string;
}

const Message = ({ onClose = () => {}, title, text }: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return isVisible ? (
    <div className={styles.messageContainer}>
      <div className={styles.messageBox}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{text}</p>
        <Button customClasses={styles.button} variant={BUTTON_VARIANT.TEXT} onClick={onClose}>
          Close message
        </Button>
      </div>
    </div>
  ) : null;
};

export default Message;

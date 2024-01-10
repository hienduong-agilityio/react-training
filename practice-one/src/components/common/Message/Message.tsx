import { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from '../Button/Button';
import { BUTTON_VARIANT } from '../../../types/common';

interface IMessageProps {
  onClose?: () => void;
  text?: string;
  title?: string;
  closeButtonEnabled?: boolean;
  timeoutDuration?: number;
}

const Message = ({
  onClose = () => {},
  title,
  text,
  closeButtonEnabled = true,
  timeoutDuration = 2000,
}: IMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, timeoutDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, timeoutDuration]);

  return isVisible ? (
    <div className={styles.messageContainer}>
      <div className={styles.messageBox}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{text}</p>
        {closeButtonEnabled && (
          <Button customClasses={styles.button} variant={BUTTON_VARIANT.TEXT} onClick={onClose}>
            Close message
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

export default Message;

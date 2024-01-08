import { useState, useEffect } from 'react';
import styles from './index.module.css';
import Button from '../Button/Button';
import { BUTTON_VARIANT } from '../../../types/common';

interface MessageProps {
  onClose?: () => void;
}

const Message = ({ onClose = () => {} }: MessageProps) => {
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
        <h2 className={styles.title}>Product Added to Cart</h2>
        <p className={styles.content}>The selected product has been added to your cart.</p>
        <Button className={styles.button} variant={BUTTON_VARIANT.PRIMARY}>
          Continue Shopping
        </Button>
      </div>
    </div>
  ) : null;
};

export default Message;

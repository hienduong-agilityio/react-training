// Libraries
import { memo } from 'react';

// Hooks
import { useClickOutside } from '@/hooks';

export interface IModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

/**
 * Modal component
 *
 * @returns Modal element.
 */
const Modal = ({ isOpen = false, onClose = () => {}, children }: IModalProps) => {
  const attachRef = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-60'>
      <div role='dialog' ref={attachRef} className='relative rounded-2xl max-w-2xl bg-gray-50 shadow-lg'>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);

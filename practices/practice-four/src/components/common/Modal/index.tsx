// Libraries
import { memo, useRef } from 'react';

// Hooks
import { useClickOutside } from '@/hooks';

export interface IModalProps {
  // isOpen: Determines whether the modal is visible or hidden
  isOpen?: boolean;
  // onClose: Callback function to close the modal
  onClose?: () => void;
  // children: The content to be displayed inside the modal
  children: React.ReactNode;
}

/**
 * Modal component
 *
 * @returns Modal element.
 */
const Modal = ({ isOpen = false, onClose = () => {}, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-60'>
      <div role='dialog' ref={modalRef} className='relative rounded-2xl max-w-2xl bg-gray-50 shadow-lg'>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);

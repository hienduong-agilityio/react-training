'use client';

import { Toast } from '..';
import { ToastStore } from '../../stores';

// Stores

// Components

export const ToastContainer = () => {
  const { message, type, isVisible, timeoutDuration, hideToast } = ToastStore();

  return (
    <>
      {isVisible && (
        <div className='fixed top-9 z-40 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-2rem)] flex justify-center'>
          <Toast type={type} timeoutDuration={timeoutDuration} onClose={hideToast}>
            {message}
          </Toast>
        </div>
      )}
    </>
  );
};

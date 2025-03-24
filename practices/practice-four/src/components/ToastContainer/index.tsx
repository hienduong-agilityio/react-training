// Stores
import { ToastStore } from '@/stores';

// Components
import { Toast } from '@/components';

export const ToastContainer = () => {
  const { message, type, isVisible, undoEnabled, timeoutDuration, hideToast } = ToastStore();

  return (
    <>
      {isVisible && (
        <div className='fixed top-9 left-1/2 transform -translate-x-1/2'>
          <Toast type={type} undoEnabled={undoEnabled} timeoutDuration={timeoutDuration} onClose={hideToast}>
            {message}
          </Toast>
        </div>
      )}
    </>
  );
};

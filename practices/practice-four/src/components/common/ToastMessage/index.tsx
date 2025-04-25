// Libraries
import { useRef, useDeferredValue } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Svg
import successIcon from '@public/images/successIcon.svg';
import errorIcon from '@public/images/errorIcon.svg';

// Constants
import { ROUTE } from '@/constants/route';

export interface IToastProps {
  onClose?: () => void;
  children: React.ReactNode;
  undoEnabled?: boolean;
  timeoutDuration?: number;
  type?: 'success' | 'error';
}

/**
 * Toast component
 *
 * @returns {JSX.Element | null} - Toast message element or null if not visible
 */
const Toast = ({
  onClose = () => {},
  children,
  undoEnabled = false,
  timeoutDuration = 5_000,
  type = 'success'
}: IToastProps): JSX.Element | null => {
  const isVisibleRef = useRef(true);
  const timerRef = useRef<number>(0);
  const deferredType = useDeferredValue(type);

  const attachToast: React.RefCallback<HTMLDivElement> = (node) => {
    if (!node) return;

    timerRef.current = window.setTimeout(() => {
      isVisibleRef.current = false;
      onClose();
    }, timeoutDuration);

    return () => {
      clearTimeout(timerRef.current);
    };
  };

  const containerClass = classNames(
    'flex items-center divide-x rtl:divide-x-reverse p-4 w-full max-w-xs rounded-lg shadow',
    {
      'text-success-100 bg-success-800 divide-green-950': deferredType === 'success',
      'text-red-100 bg-red-800 divide-red-950': deferredType === 'error'
    }
  );

  const icon = deferredType === 'success' ? successIcon : errorIcon;

  return isVisibleRef.current ? (
    <div ref={attachToast} className={containerClass}>
      <div className='text-sm font-normal inline-flex items-center gap-3 pl-1'>
        <img src={icon} alt={deferredType} />
        {children}
      </div>

      {undoEnabled && (
        <div className='flex items-center ml-4 pl-4 space-x-2 rtl:space-x-reverse'>
          <Link to={ROUTE.PROJECT} className='text-sm font-medium hover:underline'>
            Undo
          </Link>
        </div>
      )}
    </div>
  ) : null;
};

export default Toast;

// Libraries
import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Svg
import successIcon from '@public/images/successIcon.svg';
import errorIcon from '@public/images/errorIcon.svg';

// Constants
import { ROUTE } from '@/constants/route';

export interface IToastProps {
  // onClose: Callback function triggered when the message is closed.
  onClose: () => void;
  // children: The content to be displayed within the message.
  children: React.ReactNode;
  // title: Optional title for the message.
  title?: string;
  // undoEnabled: Enables or disables the 'Undo' option within the message.
  undoEnabled?: boolean;
  // timeoutDuration: The duration (in milliseconds) before the message automatically disappears.
  timeoutDuration?: number;
  // type: Specifies the type of message, either 'success' or 'error'.
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
  timeoutDuration = 5000,
  type = 'success'
}: IToastProps): JSX.Element | null => {
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

  const containerClass = classNames(
    'flex items-center divide-x rtl:divide-x-reverse p-4 w-full max-w-xs rounded-lg shadow',
    {
      'text-success-100 bg-success-800 divide-green-950': type === 'success',
      'text-red-100 bg-red-800 divide-red-950': type === 'error'
    }
  );

  const icon = type === 'success' ? successIcon : errorIcon;

  return isVisible ? (
    <div className={containerClass}>
      <div className='text-sm font-normal inline-flex items-center gap-3 pl-1'>
        <img src={icon} alt={type} />
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

export default memo(Toast);

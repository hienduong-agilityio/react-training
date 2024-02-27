// Component
import Button from '../Button';

interface IPopupProps {
  isOpen: boolean;
  children?: React.ReactNode | string;
  buttonClosesPopup?: boolean;
  closeButtonContent?: React.ReactNode | string;
  onClosePopup?: () => void;
}

/**
 * Popup component to display content in a modal-like dialog
 *
 * @param isOpen - Indicates whether the popup is open or closed
 * @param children - Content to be displayed inside the popup
 * @param buttonClosesPopup - Indicates whether clicking a button should close the popup
 * @param closeButtonContent - Content for the close button
 * @param onClosePopup - Callback function to handle popup close event
 * @returns {JSX.Element} Popup component
 */

export default function Popup({
  isOpen = false,
  children,
  buttonClosesPopup = true,
  closeButtonContent = 'Closes',
  onClosePopup = () => {}
}: Readonly<IPopupProps>): JSX.Element {
  return (
    <div
      onClick={onClosePopup}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'visible bg-black/20' : 'invisible'}`}
    >
      {/* popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all z-50 ${isOpen ? 'scale-100 opacity-100 z-50' : 'scale-125 opacity-0 z-50'}`}
      >
        {buttonClosesPopup && (
          <Button
            onClick={onClosePopup}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            {closeButtonContent}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}

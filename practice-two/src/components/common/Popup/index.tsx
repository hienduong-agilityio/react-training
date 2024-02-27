interface IPopupProps {
  isOpen: boolean;
  children?: React.ReactNode | string;
  onClosePopup?: () => void;
}

/**
 * Popup component to display content in a modal-like dialog
 * @param isOpen - Indicates whether the popup is open or closed
 * @param children - Content to be displayed inside the popup
 * @param onClosePopup - Callback function to handle popup close event
 *
 * @returns {JSX.Element} Popup component
 */

export default function Popup({
  isOpen = false,
  children,
  onClosePopup = () => {}
}: Readonly<IPopupProps>): JSX.Element {
  return (
    <div
      onClick={onClosePopup}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'block bg-black/20' : 'hidden'}`}
    >
      {/* popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl p-6 z-50 ${isOpen ? 'scale-100 opacity-100 z-50' : 'scale-125 opacity-0 z-50'}`}
      >
        {children}
      </div>
    </div>
  );
}

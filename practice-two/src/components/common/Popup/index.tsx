import Button from '../Button';

interface IPopupProps {
  isOpen: boolean;
  children?: React.ReactNode | string;
  closeButton?: boolean;
  closeButtonContent?: React.ReactNode | string;
  onClosePopup?: () => void;
}

export default function Modal({
  isOpen = false,
  children,
  closeButton,
  closeButtonContent = 'Closes',
  onClosePopup
}: IPopupProps) {
  return (
    <section
      onClick={onClosePopup}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${isOpen ? 'visible bg-black/20' : 'invisible'}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-white rounded-xl shadow p-6 transition-all z-50
            ${isOpen ? 'scale-100 opacity-100 z-50' : 'scale-125 opacity-0 z-50'}
          `}
      >
        {closeButton && (
          <Button
            onClick={onClosePopup}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            {closeButtonContent}
          </Button>
        )}
        {children}
      </div>
    </section>
  );
}

interface ISideBarProps {
  isOpen: boolean;
  children?: React.ReactNode | string;
  onCloseSideBar?: () => void;
}

/**
 * SideBar component to display content in a modal-like dialog
 * @param isOpen - Indicates whether the SideBar is open or closed
 * @param children - Content to be displayed inside the SideBar
 * @param onCloseSideBar - Callback function to handle SideBar close event
 *
 * @returns {JSX.Element} SideBar component
 */

export default function SideBar({
  isOpen = false,
  children,
  onCloseSideBar = () => {}
}: Readonly<ISideBarProps>): JSX.Element {
  const handleCloseSideBar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onCloseSideBar();
    }
  };

  return (
    <div
      onClick={handleCloseSideBar}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${isOpen ? 'block bg-black/20 z-50' : 'hidden'}`}
    >
      {/* SideBar */}
      <div
        className={
          'fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:text-black md:w-[50%] lg:w-[25%] translate-x-0'
        }
      >
        {children}
      </div>
    </div>
  );
}

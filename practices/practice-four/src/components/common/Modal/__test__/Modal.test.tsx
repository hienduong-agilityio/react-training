// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Libraries
import { Modal } from '@/components';

/**
Modal Component
  √ should not render when isOpen is false or isOpen is not provided
  √ should render when isOpen is true
  √ should call onClose when clicking outside the modal
  √ should handle modal click behavior correctly
  √ should match the snapshot when open
*/
describe('Modal Component', () => {
  const onCloseMock = jest.fn();
  const modalContent = <div>Modal content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = (isOpen?: boolean, onClose?: () => void) => {
    render(
      <Modal isOpen={isOpen} onClose={onClose}>
        {modalContent}
      </Modal>
    );
  };

  it('should match the snapshot when open', () => {
    expect(renderModal).toMatchSnapshot();
  });

  it('should not render when isOpen is false or isOpen is not provided', () => {
    // When isOpen is false
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // When isOpen is not provided
    renderModal();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    renderModal(true);

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should call onClose when clicking outside the modal', () => {
    renderModal(true, onCloseMock);

    const backdropElement = screen.getByRole('dialog').parentElement;
    fireEvent.mouseDown(backdropElement!);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should handle modal click behavior correctly', () => {
    // Render modal with onCloseMock
    renderModal(true, onCloseMock);

    const modalElement = screen.getByRole('dialog');
    fireEvent.mouseDown(modalElement);

    // Expect onClose not to be called when clicking inside the modal
    expect(onCloseMock).not.toHaveBeenCalled();

    // Check that the modal is in the document
    expect(modalElement).toBeInTheDocument();

    // Simulate clicking outside the modal without `onClose` prop
    renderModal(true);
    const backdropElement = modalElement.parentElement;
    fireEvent.mouseDown(backdropElement!);

    // Modal should still be rendered
    expect(modalElement).toBeInTheDocument();
  });
});

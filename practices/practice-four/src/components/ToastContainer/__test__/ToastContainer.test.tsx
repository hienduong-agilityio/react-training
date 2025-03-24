// Libraries
import { render, screen } from '@testing-library/react';

// Stores
import { ToastStore } from '@/stores';

// Components
import { ToastContainer } from '@/components';

jest.mock('@/stores/toastStore', () => ({
  ToastStore: jest.fn()
}));

describe('ToastContainer Component', () => {
  const mockHideToast = jest.fn();

  // Default mock values for ToastStore
  const defaultStoreMock = {
    message: 'Test Toast Message',
    type: 'success',
    isVisible: true,
    undoEnabled: false,
    timeoutDuration: 3000,
    hideToast: mockHideToast
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (ToastStore as jest.MockedFunction<typeof ToastStore>).mockReturnValue(defaultStoreMock);
  });

  it('should match the snapshot when toast is visible', () => {
    const { container } = render(<ToastContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should render the toast message when visible', () => {
    render(<ToastContainer />);
    expect(screen.getByText('Test Toast Message')).toBeInTheDocument();
  });

  it('should not render the toast when isVisible is false', () => {
    (ToastStore as jest.MockedFunction<typeof ToastStore>).mockReturnValue({
      ...defaultStoreMock,
      isVisible: false
    });

    render(<ToastContainer />);
    expect(screen.queryByText('Test Toast Message')).not.toBeInTheDocument();
  });

  it('should hide the toast after the timeout duration', () => {
    jest.useFakeTimers();
    render(<ToastContainer />);

    jest.advanceTimersByTime(3000);
    expect(mockHideToast).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

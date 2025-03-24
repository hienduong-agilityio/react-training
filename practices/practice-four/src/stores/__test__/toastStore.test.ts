import { ToastStore } from '@/stores/toastStore';

describe('ToastStore', () => {
  afterEach(() => {
    ToastStore.setState({
      message: '',
      type: 'success',
      isVisible: false,
      undoEnabled: false,
      timeoutDuration: 3000
    });
  });

  it('should show toast with correct parameters', () => {
    const { showToast } = ToastStore.getState();

    showToast('Test message', 'success', 5000, true);

    const updatedState = ToastStore.getState();
    expect(updatedState.message).toBe('Test message');
    expect(updatedState.type).toBe('success');
    expect(updatedState.isVisible).toBe(true);
    expect(updatedState.undoEnabled).toBe(true);
    expect(updatedState.timeoutDuration).toBe(5000);
  });

  it('should hide the toast', () => {
    const { hideToast } = ToastStore.getState();

    // Initially show the toast
    ToastStore.setState({
      message: 'Test message',
      type: 'success',
      isVisible: true
    });

    hideToast();

    const updatedState = ToastStore.getState();
    expect(updatedState.isVisible).toBe(false);
  });

  it('should set default values for timeoutDuration and undoEnabled', () => {
    const { showToast } = ToastStore.getState();

    showToast('Another test', 'error');

    const updatedState = ToastStore.getState();
    expect(updatedState.timeoutDuration).toBe(3000);
    expect(updatedState.undoEnabled).toBe(false);
    expect(updatedState.type).toBe('error');
  });
});

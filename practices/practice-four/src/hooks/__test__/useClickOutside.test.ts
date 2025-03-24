// Libraries
import { renderHook, act } from '@testing-library/react';
import { RefObject } from 'react';

// Hooks
import { useClickOutside } from '@/hooks';

describe('useClickOutside', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (args[0].includes('ReactDOMTestUtils.act')) {
        return;
      }
      originalError(...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should call the callback when clicking outside the referenced element', () => {
    const callback = jest.fn();
    const mockElement = document.createElement('div');

    const ref = {
      current: mockElement
    } as RefObject<HTMLElement>;

    renderHook(() => useClickOutside(ref, callback));

    act(() => {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('should clean up the event listener when the hook is unmounted', () => {
    const callback = jest.fn();
    const ref = { current: null } as RefObject<HTMLElement>;
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useClickOutside(ref, callback));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});

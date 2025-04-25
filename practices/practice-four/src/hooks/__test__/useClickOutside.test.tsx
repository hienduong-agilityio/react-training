import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '@/hooks';
import { useState } from 'react';

function TestComponent({ onClickOutside }: { onClickOutside: () => void }) {
  const [show, setShow] = useState(true);
  const ref = useClickOutside(onClickOutside);

  return (
    <div>
      {show && (
        <div ref={ref} data-testid='inside'>
          Inside
        </div>
      )}
      <button data-testid='outside' onClick={() => {}}>
        Outside
      </button>
      <button data-testid='unmount' onClick={() => setShow(false)}>
        Unmount
      </button>
    </div>
  );
}

describe('useClickOutside (ref-style)', () => {
  it('calls the callback when clicking outside the element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.mouseDown(getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does NOT call the callback when clicking inside the element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);

    fireEvent.mouseDown(getByTestId('inside'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('cleans up the listener when unmounted', () => {
    const callback = jest.fn();
    const removeSpy = jest.spyOn(document, 'removeEventListener');

    const { getByTestId } = render(<TestComponent onClickOutside={callback} />);
    fireEvent.click(getByTestId('unmount')); // Triggers unmount of the ref element

    expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('handles case where node is null (no error thrown)', () => {
    const callback = jest.fn();

    // simulate a component where the ref is immediately null
    function NullRefComponent() {
      const ref = useClickOutside(callback);
      return <div ref={() => ref(null)} />;
    }

    const { unmount } = render(<NullRefComponent />);
    unmount();
    expect(callback).not.toHaveBeenCalled();
  });
});

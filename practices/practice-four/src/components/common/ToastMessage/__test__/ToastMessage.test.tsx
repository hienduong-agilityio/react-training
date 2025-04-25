// Libraries
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import Toast from '@/components/common/ToastMessage';

/*
Toast Component
  √ should match snapshot
  √ should render success toast with default content
  √ should render error toast with custom content
  √ should render with undo option when undoEnabled is true
  √ should call onClose after timeoutDuration
*/
describe('Toast Component', () => {
  const onCloseMock = jest.fn();
  let renderComponent: (props?: Partial<React.ComponentProps<typeof Toast>>) => ReturnType<typeof render>;

  beforeEach(() => {
    jest.clearAllMocks();
    renderComponent = (props = {}) =>
      render(
        <MemoryRouter>
          <Toast onClose={onCloseMock} {...props}>
            {props.children || 'Default toast message'}
          </Toast>
        </MemoryRouter>
      );
  });

  it('should match snapshot', () => {
    const { container } = renderComponent({ children: 'Snapshot test' });
    expect(container).toMatchSnapshot();
  });

  it('should render success toast with default content', () => {
    const { container } = renderComponent({ children: 'This is a success message' });

    const toastElement = screen.getByText('This is a success message');
    expect(toastElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-success-100 bg-success-800');
  });

  it('should render error toast with custom content', () => {
    const { container } = renderComponent({ type: 'error', children: 'Error occurred' });

    const toastElement = screen.getByText('Error occurred');
    expect(toastElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-red-100 bg-red-800');
  });

  it('should render with undo option when undoEnabled is true', () => {
    renderComponent({ undoEnabled: true, children: 'Undo test' });

    const undoLink = screen.getByText('Undo');
    expect(undoLink).toBeInTheDocument();
    expect(undoLink).toHaveAttribute('href', '/projects');
  });

  it('should call onClose after timeoutDuration', async () => {
    jest.useFakeTimers();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(0);
    jest.useRealTimers();
  });
});

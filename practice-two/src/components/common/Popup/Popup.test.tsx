import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Modal from './index';

describe('Modal Component', () => {
  it('renders correctly when isOpen is true', () => {
    const onClosePopup = jest.fn();
    const { container, getByText } = render(
      <Modal isOpen={true} onClosePopup={onClosePopup}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container.firstChild).toHaveClass('visible');
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders correctly when isOpen is false', () => {
    const onClosePopup = jest.fn();
    const { container, queryByText } = render(
      <Modal isOpen={false} onClosePopup={onClosePopup}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container.firstChild).toHaveClass('invisible');
    expect(queryByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClosePopup when clicking on close button', () => {
    const onClosePopup = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClosePopup={onClosePopup} closeButton={true}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(getByText('Closes'));
    expect(onClosePopup).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const onClosePopup = jest.fn();
    const { asFragment } = render(
      <Modal isOpen={true} onClosePopup={onClosePopup}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

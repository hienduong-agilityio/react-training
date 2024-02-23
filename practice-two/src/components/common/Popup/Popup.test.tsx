import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Popup from './index';

describe('Popup Component', () => {
  it('renders correctly when isOpen is true', () => {
    const onClosePopup = jest.fn();
    const { container, getByText } = render(
      <Popup isOpen={true} onClosePopup={onClosePopup}>
        <div>Popup Content</div>
      </Popup>
    );

    expect(container.firstChild).toHaveClass('visible');
    expect(getByText('Popup Content')).toBeInTheDocument();
  });

  it('renders correctly when isOpen is false', () => {
    const onClosePopup = jest.fn();
    const { container, queryByText } = render(
      <Popup isOpen={false} onClosePopup={onClosePopup}>
        <div>Popup Content</div>
      </Popup>
    );

    expect(container.firstChild).toHaveClass('invisible');
    expect(queryByText('Popup Content')).toBeInTheDocument();
  });

  it('calls onClosePopup when clicking on close button', () => {
    const onClosePopup = jest.fn();
    const { getByText } = render(
      <Popup isOpen={true} onClosePopup={onClosePopup} closeButton={true}>
        <div>Popup Content</div>
      </Popup>
    );

    fireEvent.click(getByText('Closes'));
    expect(onClosePopup).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const onClosePopup = jest.fn();
    const { asFragment } = render(
      <Popup isOpen={true} onClosePopup={onClosePopup}>
        <div>Popup Content</div>
      </Popup>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

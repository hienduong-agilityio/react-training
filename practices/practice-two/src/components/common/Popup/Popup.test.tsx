import { render } from '@testing-library/react';
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

    expect(container.firstChild).toHaveClass('block');
    expect(getByText('Popup Content')).toBeInTheDocument();
  });

  it('renders correctly when isOpen is false', () => {
    const onClosePopup = jest.fn();
    const { container, queryByText } = render(
      <Popup isOpen={false} onClosePopup={onClosePopup}>
        <div>Popup Content</div>
      </Popup>
    );

    expect(container.firstChild).toHaveClass('hidden');
    expect(queryByText('Popup Content')).toBeInTheDocument();
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

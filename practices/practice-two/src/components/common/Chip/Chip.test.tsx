import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Chip, { CHIP_COLOR } from './index';

describe('Chip tests', () => {
  it('Should match snapshot', async () => {
    const { findByTestId } = render(<Chip color={CHIP_COLOR.FIRE} label="fire" />);

    expect(findByTestId).toMatchSnapshot();
  });
});

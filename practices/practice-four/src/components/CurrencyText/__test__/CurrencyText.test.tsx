// Libraries
import { render, screen } from '@testing-library/react';

// Components
import { CurrencyText, ICurrencyTextProps } from '@/components';

/**
CurrencyText Component
  √ should render with default props and make snapshot
  √ should ender with provided currency value and apply custom className
*/
describe('CurrencyText Component', () => {
  let renderComponent: (props?: Partial<ICurrencyTextProps>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props: Partial<ICurrencyTextProps> = {}) => {
      return render(<CurrencyText {...props}>Tag Content</CurrencyText>);
    };
  });

  it('should render with default props and make snapshot', () => {
    const { container } = renderComponent();
    const currencyElement = screen.getByText('-');

    expect(currencyElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should ender with provided currency value and apply custom className', () => {
    const { container } = renderComponent({ currency: 1000, className: 'custom-class' });
    const currencyElement = screen.getByText('US$ 1000k');

    expect(currencyElement).toBeInTheDocument();
    expect(currencyElement).toHaveClass('custom-class');
    expect(container).toMatchSnapshot();
  });
});

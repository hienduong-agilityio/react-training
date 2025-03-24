// Libraries
import { render, screen } from '@testing-library/react';

// Components
import { Timeline } from '@/components';

/*
Timeline Component
  √ matches the snapshot
  √ renders correctly with default props
  √ renders the correct timeStart and timeEnd
  √ renders correctly when one of the times is not provided
*/
describe('Timeline Component', () => {
  let renderComponent: (props?: Partial<{ timeStart: string; timeEnd: string }>) => ReturnType<typeof render>;

  beforeEach(() => {
    renderComponent = (props = {}) => {
      const { timeStart, timeEnd } = props;
      return render(<Timeline timeStart={timeStart} timeEnd={timeEnd} />);
    };
  });

  it('matches the snapshot', () => {
    const { asFragment } = renderComponent({ timeStart: '10:00 AM', timeEnd: '12:00 PM' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    renderComponent();

    const defaultTimes = screen.getAllByText('-');
    expect(defaultTimes).toHaveLength(2);
  });

  it('renders the correct timeStart and timeEnd', () => {
    renderComponent({ timeStart: '10:00 AM', timeEnd: '12:00 PM' });

    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('renders correctly when one of the times is not provided', () => {
    renderComponent({ timeEnd: '12:00 PM' });

    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });
});

// Libraries
import { render } from '@testing-library/react';
import { lazy } from 'react';

// Components
import { SuspenseLoader } from '@/components';

/*
SuspenseLoader Component
  √ matches snapshot with default fallback
  √ matches snapshot with custom fallback
*/
describe('SuspenseLoader Component', () => {
  it('matches snapshot with default fallback', () => {
    const LazyMockComponent = lazy(() => new Promise(() => {}));

    const WrappedComponent = SuspenseLoader(LazyMockComponent);

    const { asFragment } = render(<WrappedComponent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with custom fallback', () => {
    const customFallback = <div>Custom Fallback</div>;

    const LazyMockComponent = lazy(() => new Promise(() => {}));
    const WrappedComponent = SuspenseLoader(LazyMockComponent, customFallback);

    const { asFragment } = render(<WrappedComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});

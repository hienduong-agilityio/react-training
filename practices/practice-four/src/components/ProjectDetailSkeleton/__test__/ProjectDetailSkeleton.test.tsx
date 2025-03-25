// Libraries
import { render } from '@testing-library/react';

// Components
import { ProjectDetailSkeleton } from '@/components';

describe('ProjectDetailSkeleton Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<ProjectDetailSkeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});

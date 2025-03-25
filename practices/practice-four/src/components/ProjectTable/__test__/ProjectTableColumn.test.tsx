// Libraries
import { render } from '@testing-library/react';

// Components
import ProjectTableColumn from '@/components/ProjectTable/ProjectTableColumn';

describe('ProjectTableColumn Component', () => {
  it('should render and match snapshot', () => {
    const { container } = render(<ProjectTableColumn />);
    expect(container).toMatchSnapshot();
  });
});

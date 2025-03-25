// Libraries
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

// Components
import { SearchBox } from '@/components';

// SVG
import iconSearch from '@public/images/searchIcon.svg';

describe('SearchBox Component', () => {
  const mockValue = 'Test Search';
  let ref: React.RefObject<HTMLInputElement>;
  let asFragment: () => DocumentFragment;

  beforeEach(() => {
    ref = createRef<HTMLInputElement>();
    const result = render(<SearchBox value={mockValue} ref={ref} />);
    asFragment = result.asFragment;
  });

  it('matches the snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders SearchBox correctly', () => {
    const searchIcon = screen.getByAltText('Search');
    expect(searchIcon).toHaveAttribute('src', iconSearch);

    const inputField = screen.getByPlaceholderText('Search');
    expect(inputField).toBeInTheDocument();
  });

  it('should forward the ref to the input field', () => {
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

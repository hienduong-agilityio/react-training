// Libraries
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

// Components
import { SearchBox } from '@/components';

describe('SearchBox Component', () => {
  const mockValue = 'Test Search';
  let ref: React.RefObject<HTMLInputElement | null>;
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
    const inputField = screen.getByPlaceholderText('Search');
    expect(inputField).toBeInTheDocument();
  });

  it('should forward the ref to the input field', () => {
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
  });
});

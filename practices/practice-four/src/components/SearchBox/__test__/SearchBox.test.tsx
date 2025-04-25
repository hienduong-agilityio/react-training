import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { SearchBox } from '@/components';

describe('SearchBox component', () => {
  it('renders correctly with default props', () => {
    render(<SearchBox name='search' />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'search');
    expect(input).toHaveAttribute('placeholder', 'Search');
  });

  it('renders with a defaultValue', () => {
    render(<SearchBox name='search' defaultValue='initial' />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('updates input value when typed in', async () => {
    const user = userEvent.setup();
    render(<SearchBox name='search' />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    await user.type(input, 'test input');
    expect(input.value).toBe('test input');
  });

  it('renders search icon', () => {
    render(<SearchBox name='search' />);
    const img = screen.getByAltText('Search');
    expect(img).toBeInTheDocument();
  });
});

// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { Pagination } from '@/components';

/**
 Pagination Component
  √ should match snapshots pagination states
  √ should display the current page and total pages and disable pre button
  √ should call onPageChange with correct parameters when navigating pages
  √ should not call onPageChange if the buttons are disabled
  √ should use default prop values when no props are provided
 */
describe('Pagination Component', () => {
  const onPageChangeMock = jest.fn();

  // Helper function to render Pagination component
  const renderPagination = (currentPage?: number, totalPages?: number, onPageChange?: (page: number) => void) => {
    return render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />);
  };

  // Helper function to get prev and next buttons
  const getNavigationButtons = () => {
    const prevButton = screen.getByAltText('Arrow Left').closest('button');
    const nextButton = screen.getByAltText('Arrow Right').closest('button');
    return { prevButton, nextButton };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshots pagination states', () => {
    const { container } = renderPagination(1, 5, onPageChangeMock);

    // Initial render on first page
    expect(container).toMatchSnapshot('Initial Render (Page 1 of 5)');
  });

  it('should use default onPageChange prop without throwing an error', () => {
    const { container } = renderPagination(1, 5);

    expect(container).toMatchSnapshot('Render with default onPageChange');
  });

  it('should display the current page and total pages and disable pre button', () => {
    renderPagination(5, 5, onPageChangeMock);

    // Check if current page and total pages are rendered correctly
    expect(screen.getByText('5 / 5')).toBeInTheDocument();

    const { prevButton, nextButton } = getNavigationButtons();

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange with correct parameters when navigating pages', () => {
    renderPagination(3, 5, onPageChangeMock);

    // Get navigation buttons
    const { prevButton, nextButton } = getNavigationButtons();

    // Click previous button
    fireEvent.click(prevButton!);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);

    // Click next button
    fireEvent.click(nextButton!);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('should not call onPageChange if the buttons are disabled', () => {
    renderPagination(1, 1, onPageChangeMock);

    // Get navigation buttons
    const { prevButton, nextButton } = getNavigationButtons();

    // Buttons should be disabled, so clicking should not trigger onPageChange
    fireEvent.click(prevButton!);
    fireEvent.click(nextButton!);

    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('should use default prop values when no props are provided', () => {
    renderPagination();

    // Default currentPage is 1, totalPages is 1
    expect(screen.getByText('1 / 1')).toBeInTheDocument();

    // Get navigation buttons
    const { prevButton, nextButton } = getNavigationButtons();

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});

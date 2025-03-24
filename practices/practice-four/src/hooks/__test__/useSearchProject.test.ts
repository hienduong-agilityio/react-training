// Libraries
import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

// Hooks
import { useSearchProject } from '@/hooks';

// Mock useSearchParams from react-router-dom
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn()
}));

describe('useSearchProject', () => {
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();

    // Mock the initial state of useSearchParams
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('searchField=projectName&projectName=test'),
      mockSetSearchParams
    ]);
  });

  it('should initialize search field and keyword from URL params', () => {
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    expect(result.current.searchField).toBe('projectName');
    expect(result.current.searchKeyword).toBe('test');
  });

  it('should handle invalid search field in URL params gracefully', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('searchField=invalidField&projectName=test'),
      mockSetSearchParams
    ]);
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    expect(result.current.searchField).toBe('invalidField');
    expect(result.current.searchKeyword).toBe('test');
  });

  it('should use default values when URL params are missing', () => {
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    const { result } = renderHook(() => useSearchProject('projectName', ''));

    expect(result.current.searchField).toBe('projectName');
    expect(result.current.searchKeyword).toBe('');
  });

  it('should update search term and URL params correctly', () => {
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    act(() => {
      result.current.updateSearchTerm('newProject');
    });

    expect(result.current.searchKeyword).toBe('newProject');
    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('searchField=projectName&projectName=newProject&page=1')
    );
  });

  it('should update search field and URL params correctly', () => {
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    act(() => {
      result.current.updateSearchField('status');
    });

    expect(result.current.searchField).toBe('status');
    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams('searchField=status&status=test&page=1'));
  });

  it('should clear search term when empty string is provided', () => {
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    act(() => {
      result.current.updateSearchTerm('');
    });

    expect(result.current.searchKeyword).toBe('');
    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams('page=1'));
  });

  it('should reset pagination to page 1 when search term is updated', () => {
    const { result } = renderHook(() => useSearchProject('projectName', 'test'));

    act(() => {
      result.current.updateSearchTerm('anotherProject');
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('searchField=projectName&projectName=anotherProject&page=1')
    );
  });
});

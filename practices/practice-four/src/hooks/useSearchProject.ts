// Libraries
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook used for multiple search fields and is more extensible.
 *
 * @param searchFiled - The search field.
 * @param filterKeyword - The search filterKeyword.
 *
 * @returns The current search field, search filterKeyword, and updater functions.
 */
export const useSearchProject = (searchFiled: string, filterKeyword: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchField, setSearchField] = useState<string>(searchFiled || 'projectName');
  const [searchKeyword, setSearchKeyword] = useState<string>(filterKeyword || '');

  // Sync search field and search filterKeyword with URL params
  useEffect(() => {
    const fieldParam = searchParams.get('searchField') || searchFiled;
    const searchValue = searchParams.get(fieldParam) || filterKeyword;

    setSearchField(fieldParam || 'projectName');
    setSearchKeyword(searchValue || '');
  }, [searchParams, searchFiled, filterKeyword]);

  const updateSearchParams = useCallback(
    (field: string, searchTerm: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      // Remove the other search field based on the new field
      ['projectName', 'status'].forEach((key) => {
        if (key !== field) newSearchParams.delete(key);
      });

      // Set or remove search parameters based on the search term
      if (searchTerm) {
        newSearchParams.set(field, searchTerm);
        newSearchParams.set('searchField', field);
      } else {
        newSearchParams.delete(field);
        newSearchParams.delete('searchField');
      }

      // Reset pagination to page 1 when search is updated
      newSearchParams.set('page', '1');

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  // Update search term
  const updateSearchTerm = useCallback(
    (searchTerm: string) => {
      setSearchKeyword(searchTerm);
      updateSearchParams(searchField, searchTerm);
    },
    [searchField, updateSearchParams]
  );

  // Update search field
  const updateSearchField = useCallback(
    (field: string) => {
      setSearchField(field);
      updateSearchParams(field, searchKeyword);
    },
    [searchKeyword, updateSearchParams]
  );

  return { searchField, searchKeyword, updateSearchTerm, updateSearchField };
};

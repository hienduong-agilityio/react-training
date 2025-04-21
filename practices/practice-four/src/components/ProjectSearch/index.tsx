// Libraries
import { useActionState } from 'react';

// Components
import { ProjectFilterDropdown, SearchBox, FormActionButton } from '@/components';

// Enums
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums';

// Constants
import { SEARCH_OPTION } from '@/constants';

interface SearchFormState {
  searchValue: string;
}

interface ProjectSearchProps {
  searchField: string;
  initialKeyword: string;
  updateSearchField: (field: string) => void;
  updateSearchTerm: (term: string) => void;
}

const searchAction = async (_prevState: SearchFormState, formData: FormData): Promise<SearchFormState> => {
  const searchValue = formData.get('search') as string;
  return { searchValue };
};

export const ProjectSearch = ({
  searchField,
  initialKeyword,
  updateSearchField,
  updateSearchTerm
}: ProjectSearchProps) => {
  const [formState, formActionDispatcher] = useActionState(searchAction, { searchValue: initialKeyword });

  if (formState.searchValue !== initialKeyword) {
    updateSearchTerm(formState.searchValue);
  }

  return (
    <form key={searchField ?? initialKeyword} className='flex h-auto' action={formActionDispatcher}>
      <ProjectFilterDropdown options={SEARCH_OPTION} onChange={updateSearchField} searchField={searchField} />
      <SearchBox name='search' defaultValue={initialKeyword} />
      <FormActionButton
        customClass='ml-2 focus:bg-gray-200 hover:bg-gray-200 focus:outline-none'
        variant={BUTTON_VARIANTS.OUTLINED}
        color={BUTTON_COLORS.DEFAULT}
        size={BUTTON_SIZES.SMALL}
        showSpinner={false}
      >
        Search
      </FormActionButton>
    </form>
  );
};

import { ProjectFilterDropdown, SearchBox, FormActionButton } from '@/components';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums';
import { SEARCH_OPTION } from '@/constants';
import { Options, useScan } from 'react-scan';

interface ProjectSearchProps {
  searchField: string;
  initialKeyword: string;
  formAction: (formData: FormData) => void;
  updateSearchField: (field: string) => void;
}

export const ProjectSearch = ({ searchField, initialKeyword, updateSearchField, formAction }: ProjectSearchProps) => {
  useScan({
    name: 'ProjectTableManager',
    enabled: import.meta.env.DEV,
    logProps: true
  } as Options);
  return (
    <form key={searchField + initialKeyword} className='flex h-auto' action={formAction}>
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

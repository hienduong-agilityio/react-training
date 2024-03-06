// Components
import SearchField, { ISearchFieldProps } from '@components/SearchField';
import SearchFilter from '@components/SearchFilter';

const SearchBar = ({ onSearch }: ISearchFieldProps): JSX.Element => {
  return (
    <>
      <SearchField onSearch={onSearch} />
      <SearchFilter />
    </>
  );
};

export default SearchBar;

// Components
import SearchField from '@components/SearchField';
import SearchFilter from '@components/SearchFilter';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
  return (
    <>
      <SearchField onSearch={onSearch} />
      <SearchFilter />
    </>
  );
};

export default SearchBar;

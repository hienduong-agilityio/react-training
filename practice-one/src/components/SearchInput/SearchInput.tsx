// Style
import styles from './index.module.css';

interface ISearchProps {
  title: string;
  placeholder?: string;
  onSearchInput: (value: string) => void;
}

export const SearchInput = ({ title, placeholder = '', onSearchInput }: ISearchProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInput(event.target.value);
  };

  return (
    <>
      <label htmlFor="search">{title}</label>
      <input
        type="text"
        className={styles.formInput}
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </>
  );
};

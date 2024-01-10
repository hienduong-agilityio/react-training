import styles from './inde.module.css';

interface ISearchProps {
  title: string;
  placeholder?: string;
  getValue: (value: string) => void;
}

export const Search = ({ title, placeholder = '', getValue }: ISearchProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getValue(event.target.value);
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

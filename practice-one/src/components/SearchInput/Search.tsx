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
    <form>
      <label htmlFor="search" className="form__label">
        {title}
      </label>
      <input
        type="text"
        className="form__input"
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </form>
  );
};

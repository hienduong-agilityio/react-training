import { memo, JSX, RefObject } from 'react';
import { InputField } from '../../components';

interface SearchBoxProps {
  value: string;
  inputRef?: RefObject<HTMLElement>; // 👈 rename to avoid reserved "ref"
}

const SearchBox = ({ value, inputRef }: SearchBoxProps): JSX.Element => {
  return (
    <div className='relative'>
      <InputField id='searchInput' defaultValue={value} placeholder='Search' {...(inputRef ? { ref: inputRef } : {})} />
    </div>
  );
};

export default memo(SearchBox);

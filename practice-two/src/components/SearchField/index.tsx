// SVG
import iconSearch from '@assets/images/mingcute_search-line.svg';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

const SearchField = (): JSX.Element => {
  return (
    <section className="relative h-14 ">
      <img src={iconSearch} alt="search-icon" className="pl-4 p-2 top-2 left-0 absolute" />
      <div className="right-5 top-2 absolute text-center w-32">
        <Button
          variant="text"
          color="secondary"
          customClasses="border-none rounded-xl capitalize w-full font-bold text-primary flex-col "
          size="medium"
        >
          search
        </Button>
      </div>
      <InputField
        placeholder="Pokemon name, number or type"
        customClasses="text-primary font-bold placeholder-primary h-full w-full pl-12 border-white focus:border-primary focus:outline-none rounded-2xl shadow-2xl "
      />
    </section>
  );
};

export default SearchField;

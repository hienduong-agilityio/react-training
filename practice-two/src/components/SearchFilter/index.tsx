// SVG
import iconFilter from '@assets/images/octicon_filter-16.svg';

// Components
import Button from '@components/common/Button';

const SearchFilter = (): JSX.Element => {
  return (
    <section className="pt-10 flex justify-end">
      <div className="relative">
        <img src={iconFilter} alt="icon-filter" className="pl-4 p-2 top-1 left-0 absolute" />
        <Button customClasses="border-4 border-gray-500 rounded-3xl w-25 pl-10" variant="outline">
          Filter
        </Button>
      </div>
    </section>
  );
};

export default SearchFilter;

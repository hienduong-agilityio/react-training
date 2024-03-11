// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Constant
import { LIST_INPUTS } from '@constants/index';

interface IPokemonForm {
  onClosePokemonForm?: () => void;
}

const PokemonForm = ({ onClosePokemonForm = () => {} }: IPokemonForm): JSX.Element => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="bg-white rounded-lg p-5 w-[500px] flex flex-col">
      <span className="mb-4 text-3xl font-bold">Create pokemon</span>
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        {/* Form input*/}
        {LIST_INPUTS.map((input) => (
          <div key={input.label} className="">
            <label className="text-sm text-primary" htmlFor="name">
              {input.label}
            </label>
            <InputField
              className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
              defaultValue=""
              placeholder={input.label}
              type={input.type}
              id="name"
              name="name"
            />
            <span className="block pb-2 -mt-3 text-danger"></span>
          </div>
        ))}
        {/* Group button */}
        <div className="flex gap-5 p-6">
          <Button variant="outline" customClasses="rounded-xl w-1/2 justify-center font-semibold">
            Create
          </Button>
          <Button
            onClick={onClosePokemonForm}
            variant="text"
            customClasses="rounded-2xl w-1/2 justify-center font-semibold bg-gray-200"
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PokemonForm;

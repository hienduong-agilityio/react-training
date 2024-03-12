// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

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
      {/* Form input*/}
      <form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
        {/* Input for name */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonName">
            Pokemon Name
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Pokemon Name"
            name="pokemonName"
            id="pokemonName"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for number */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonNumber">
            Pokemon Number
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Pokemon Number"
            name="pokemonNumber"
            id="pokemonNumber"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for picture */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonPicture">
            Picture
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Picture"
            name="pokemonPicture"
            id="pokemonPicture"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for type1 */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonType1">
            Type1
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Type1"
            name="pokemonType1"
            id="pokemonType1"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for type2 */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonType2">
            Type2
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Type2"
            name="pokemonType2"
            id="pokemonType2"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for description*/}
        <div>
          <label className="text-sm text-primary" htmlFor="description">
            Description
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px] "
            placeholder="Description"
            name="description"
            id="description"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

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

// Library
import { ChangeEvent, FormEvent } from 'react';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Hooks
import { usePokemonContext } from '@stores/PokemonProvider';

// Service
import { postData } from '@services/api';

// Constants
import { POKEMON_URL } from '@constants/api';
import { POKEMON_CHECKBOX_TYPES } from '@constants/pokemonTypes';

interface IPokemonForm {
  onClosePokemonForm?: () => void;
}

interface IFormElement extends HTMLFormControlsCollection {
  pokemonName: HTMLInputElement;
  pokemonNumber: HTMLInputElement;
  pokemonPicture: HTMLInputElement;
  pokemonDescription: HTMLInputElement;
}

interface IFormData extends HTMLFormElement {
  readonly elements: IFormElement;
}

const PokemonForm = ({ onClosePokemonForm = () => {} }: IPokemonForm): JSX.Element => {
  const { dispatch } = usePokemonContext();

  let selectedTypes: string[] = [];

  // TODO: Update comment for function handle value check box
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    if (event.target.checked) {
      // Add type to the array
      selectedTypes = [...selectedTypes, type];
    } else {
      // Remove type from the array
      selectedTypes = selectedTypes.filter((selectedType) => selectedType !== type);
    }
  };

  // TODO: UPdate comments for function handle submit form
  const handleSubmitForm = async (event: FormEvent<IFormData>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    //  Transforms a list of key-value pairs into an object
    const formPokemonObject = Object.fromEntries(formData);

    const { pokemonName, pokemonNumber, pokemonPicture, pokemonDescription } = formPokemonObject;

    const pokemonTypes = selectedTypes;

    // Get form value
    const formPokemonData = {
      name: pokemonName,
      number: pokemonNumber,
      picture: pokemonPicture,
      types: pokemonTypes,
      description: pokemonDescription
    };

    const pokemonData = {
      name: formPokemonData.name,
      type: formPokemonData.types
    };

    // Add new Pokemon data
    dispatch({
      type: 'ADD_POKEMON_REQUEST'
    });

    try {
      const res = await postData(POKEMON_URL, pokemonData);

      dispatch({
        type: 'ADD_POKEMON_SUCCESS',
        payload: res
      });
    } catch (error) {
      dispatch({
        type: 'ADD_POKEMON_ERROR',
        payload: (error as Error).message
      });
    }

    onClosePokemonForm();
  };

  return (
    <section className="bg-white rounded-lg p-5 w-[500px] flex flex-col">
      <span className="mb-4 text-3xl font-bold">Create pokemon</span>
      {/* Form input*/}
      <form className="mt-5 flex flex-col" onSubmit={handleSubmitForm}>
        {/* Input for name */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonName">
            Pokemon Name
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
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
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
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
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
            placeholder="Picture"
            name="pokemonPicture"
            id="pokemonPicture"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Select for types*/}
        <div className="py-3">
          <label className="text-sm text-primary" htmlFor="pokemonTypes">
            Types
          </label>
          <ul className="py-4 overflow-auto max-h-24">
            {POKEMON_CHECKBOX_TYPES.map((pokemonType) => (
              <li className="flex gap-4" key={pokemonType.type}>
                <InputField
                  type="checkbox"
                  id={pokemonType.type}
                  onChange={(event) => handleCheckboxChange(event, pokemonType.type)}
                />
                <label className="capitalize" htmlFor={pokemonType.type}>
                  {pokemonType.type}
                </label>
              </li>
            ))}
          </ul>
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Input for description*/}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonDescription">
            Description
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
            placeholder="Description"
            name="pokemonDescription"
            id="pokemonDescription"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Group button */}
        <div className="flex gap-5 p-6 font-bold">
          <Button variant="outline" customClasses="w-1/2">
            Create
          </Button>
          <Button type="button" onClick={onClosePokemonForm} variant="text" customClasses="w-1/2 bg-gray-200">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PokemonForm;

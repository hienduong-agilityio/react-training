// Library
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';

// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Hooks
import { usePokemonContext } from '@stores/PokemonProvider';

// Service
import { postData, putData } from '@services/api';

// Constants
import { POKEMON_URL } from '@constants/api';
import { POKEMON_CHECKBOX_TYPES } from '@constants/pokemonTypes';
import { FORM_TITLE } from '@constants/formTitle';

interface IPokemonForm {
  onClosePokemonForm?: () => void;
  isFormTitle: string;
  updateFormTitle: (value: string) => void;
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

const PokemonForm = ({ isFormTitle, onClosePokemonForm = () => {}, updateFormTitle }: IPokemonForm): JSX.Element => {
  const { state, dispatch } = usePokemonContext();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const formEditValue = useMemo(
    () => (state.pokemonID ? [state.data[Number(state.pokemonID) - 1] || null] : []),
    [state.data, state.pokemonID]
  );

  useEffect(() => {
    // Set selected types based on form edit value when title is 'Edit'
    if (isFormTitle === 'Edit') {
      setSelectedTypes(formEditValue[0].type);
    } else {
      setSelectedTypes([]);
    }
  }, [formEditValue, isFormTitle]);

  /**
   * Function to handle checkbox change
   * @param event - ChangeEvent
   * @param type - string
   */
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const isChecked = event.target.checked;
    // Update selected types based on checkbox change
    if (isChecked) {
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
    } else {
      setSelectedTypes((prevSelectedTypes) => prevSelectedTypes.filter((selectedType) => selectedType !== type));
    }
  };

  /**
   * Function to handle form submission
   * @param event - FormEvent
   */
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

    if (isFormTitle === 'Create') {
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
    }

    if (isFormTitle === 'Edit') {
      dispatch({
        type: 'EDIT_POKEMON_REQUEST'
      });

      try {
        const res = await putData(`${POKEMON_URL}${state.pokemonID}`, pokemonData);

        dispatch({ type: 'EDIT_POKEMON_SUCCESS', payload: res });
      } catch (error) {
        dispatch({
          type: 'EDIT_POKEMON_ERROR',
          payload: (error as Error).message
        });
      }
    }
    updateFormTitle(FORM_TITLE.CREATE);

    onClosePokemonForm();
  };

  return (
    <section className="bg-white rounded-lg p-5 w-[500px] flex flex-col">
      <span className="mb-4 text-3xl font-bold">{`${isFormTitle} Pokemon`}</span>
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
            defaultValue={isFormTitle === 'Edit' ? formEditValue[0].name : ''}
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
            defaultValue={isFormTitle === 'Edit' ? formEditValue[0].id : ''}
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
            defaultValue={isFormTitle === 'Edit' ? formEditValue[0].image : ''}
            name="pokemonPicture"
            id="pokemonPicture"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger"></span>
        </div>

        {/* Select for types */}
        <div className="py-3">
          <label className="text-sm text-primary" htmlFor="pokemonTypes">
            Types
          </label>
          <ul className="py-4 overflow-auto max-h-24">
            {POKEMON_CHECKBOX_TYPES.map((pokemonType) => {
              const isChecked = selectedTypes.includes(pokemonType.type);

              return (
                <li className="flex gap-4" key={pokemonType.type}>
                  <InputField
                    type="checkbox"
                    id={pokemonType.type}
                    onChange={(event) => handleCheckboxChange(event, pokemonType.type)}
                    checked={isChecked}
                  />
                  <label className="capitalize" htmlFor={pokemonType.type}>
                    {pokemonType.type}
                  </label>
                </li>
              );
            })}
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
          <Button onClick={onClosePokemonForm} type="button" variant="text" customClasses="w-1/2 bg-gray-200">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export { PokemonForm };

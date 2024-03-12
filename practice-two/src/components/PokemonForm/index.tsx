// Components
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';

// Hooks
import { usePokemonContext } from '@stores/PokemonProvider';
import useFormValidation from '@hooks/useFormValidation';
import { useEffect, useState } from 'react';

interface IPokemonForm {
  onClosePokemonForm?: () => void;
}

interface IFormElement extends HTMLFormControlsCollection {
  pokemonName: HTMLInputElement;
  pokemonNumber: HTMLInputElement;
  pokemonPicture: HTMLInputElement;
  pokemonType1: HTMLInputElement;
  pokemonType2: HTMLInputElement;
  pokemonDescription: HTMLInputElement;
}

export interface IFormValue {
  name: string;
  number: string;
  picture: string;
  type1: string;
  type2: string;
  description: string;
}

interface IFormData extends HTMLFormElement {
  readonly elements: IFormElement;
}

const PokemonForm = ({ onClosePokemonForm = () => {} }: IPokemonForm): JSX.Element => {
  const { state, dispatch } = usePokemonContext();
  const [formValue, setFormValue] = useState<IFormValue>({
    name: '',
    number: '',
    picture: '',
    type1: '',
    type2: '',
    description: ''
  });

  const { validationMessages } = useFormValidation(formValue);

  const handleSubmitForm = (event: React.FormEvent<IFormData>) => {
    event.preventDefault();

    const formEvent = event.currentTarget.elements;

    const formData: IFormValue = {
      name: formEvent.pokemonName.value,
      number: formEvent.pokemonNumber.value,
      picture: formEvent.pokemonPicture.value,
      type1: formEvent.pokemonType1.value,
      type2: formEvent.pokemonType2.value,
      description: formEvent.pokemonDescription.value
    };

    setFormValue(formData);
  };

  useEffect(() => {
    dispatch({ type: 'FORM_SUBMIT_ERROR_MESSAGES', submitFormError: validationMessages });
  }, [dispatch, validationMessages]);

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
          <span className="block pb-2 -mt-3 text-danger">{state.formSubmitErrorMessages?.name}</span>
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
          <span className="block pb-2 -mt-3 text-danger">{state.formSubmitErrorMessages?.number}</span>
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

        {/* Input for type1 */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonType1">
            Type1
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
            placeholder="Type1"
            name="pokemonType1"
            id="pokemonType1"
            type="text"
          />
          <span className="block pb-2 -mt-3 text-danger">{state.formSubmitErrorMessages?.type1}</span>
        </div>

        {/* Input for type2 */}
        <div>
          <label className="text-sm text-primary" htmlFor="pokemonType2">
            Type2
          </label>
          <InputField
            className="p-[10px] rounded-[5px] border-[1px] border-[rgba(0,0,0,0.2)] mb-[20px] outline-[0] w-[93%] bg-transparent focus:border-primary font-semibold text-[14px]"
            placeholder="Type2"
            name="pokemonType2"
            id="pokemonType2"
            type="text"
          />
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
          <span className="block pb-2 -mt-3 text-danger">{state.formSubmitErrorMessages?.description}</span>
        </div>

        {/* Group button */}
        <div className="flex gap-5 p-6 font-bold">
          <Button variant="outline" customClasses="w-1/2">
            Create
          </Button>
          <Button onClick={onClosePokemonForm} variant="text" customClasses="w-1/2 bg-gray-200">
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PokemonForm;

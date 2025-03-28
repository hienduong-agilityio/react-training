// Component
import PokemonCard from '@components/common/PokmonCard';
import Popup from '@components/common/Popup';
import { PokemonForm, PokemonSubmitForm } from '@components/PokemonModalForm';
import PokemonDetails from '@components/PokemonDetails';
import Button from '@components/common/Button';

// Type
import { CHIP_COLOR } from '@components/common/Chip';

// Stores
import { usePokemonContext } from '@stores/PokemonProvider';

// Hook
import { useState } from 'react';

// Constant
import { FORM_TITLE } from '@constants/formTitle';

export interface IPokemonData {
  id: string;
  name: string;
  image: string;
  type: CHIP_COLOR[];
}

/**
 * Component to display a Pokedex containing Pokemon cards
 * @param pokedexData - Array containing data for Pokémon to be displayed
 * @param pokedexLoading - Loading indicator displayed when data is being fetched
 * @param pokedexError - Error message to be displayed if there is an issue fetching data
 *
 * @returns {JSX.Element} - Returns the JSX element representing the Pokedex
 */

const Pokedex = (): JSX.Element => {
  const [isPokemonDetailsPopupOpen, setIsPokemonDetailsPopupOpen] = useState<boolean>(false);
  const [isPokemonFormPopupOpen, setIsPokemonFormPopupOpen] = useState<boolean>(false);
  const [isPokemonSubmitPopupOpen, setIsPokemonSubmitPopupOpen] = useState<boolean>(false);

  const [formTitle, setFormTitle] = useState(FORM_TITLE.CREATE);

  const { state } = usePokemonContext();

  // Display loading indicator if data is still being fetched
  if (state.loading) {
    return <span>Loading...</span>;
  }

  // Display error message if there was an issue fetching data
  if (state.error) {
    return <span>Error: {state.error}</span>;
  }

  const handleClickPokemonPopup = () => {
    setIsPokemonDetailsPopupOpen(!isPokemonDetailsPopupOpen);
  };

  const handleClickPokemonForm = () => {
    setIsPokemonFormPopupOpen(!isPokemonFormPopupOpen);

    if (isPokemonFormPopupOpen === false) {
      setFormTitle(FORM_TITLE.CREATE);
    }
  };

  const handleClickPokemonSubmitForm = () => {
    setIsPokemonSubmitPopupOpen(!isPokemonSubmitPopupOpen);

    setFormTitle(FORM_TITLE.NONE);
  };

  return (
    <section className="pt-5">
      <Button
        onClick={handleClickPokemonForm}
        customClasses="border-4 border-gray-300 w-25"
        rounded="medium"
        variant="outline"
      >
        Create Pokemon
      </Button>

      <div className="grid justify-items-center sm:items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20 pt-24">
        {state.data?.map((pokemon: IPokemonData) => (
          <PokemonCard
            key={pokemon.id}
            pokemonID={pokemon.id}
            onTogglePokemonDetail={handleClickPokemonPopup}
            pokemonName={pokemon.name}
            pokemonImg={pokemon.image}
            pokemonType={pokemon.type}
          />
        ))}
      </div>

      <div>
        {/* PokemonDetails Popup */}
        <Popup isOpen={isPokemonDetailsPopupOpen} onClosePopup={handleClickPokemonPopup}>
          <PokemonDetails
            isOpenForm={isPokemonFormPopupOpen}
            isOpenSubmitForm={isPokemonSubmitPopupOpen}
            openFormPokemon={setIsPokemonFormPopupOpen}
            openSubmitFormPokemon={setIsPokemonSubmitPopupOpen}
            updateFormTitle={setFormTitle}
            pokemonData={state.data[Number(state.pokemonID) - 1]}
          />
        </Popup>
        {/* PokemonForm Popup*/}
        <Popup isOpen={isPokemonFormPopupOpen} onClosePopup={handleClickPokemonForm}>
          <PokemonForm
            isFormTitle={formTitle}
            updateFormTitle={setFormTitle}
            onClosePokemonForm={handleClickPokemonForm}
          />
        </Popup>
        {/* PokemonSubmitForm Popup*/}
        <Popup isOpen={isPokemonSubmitPopupOpen} onClosePopup={handleClickPokemonSubmitForm}>
          <PokemonSubmitForm onClosePokemonSubmitForm={handleClickPokemonSubmitForm}></PokemonSubmitForm>
        </Popup>
      </div>
    </section>
  );
};

export default Pokedex;

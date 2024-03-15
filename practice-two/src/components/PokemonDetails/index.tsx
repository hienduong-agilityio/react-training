// Components && Types
import Chip, { CHIP_COLOR } from '@components/common/Chip';

// Components
import { cardBackground } from '@components/common/PokmonCard';
import { IPokemonData } from '@components/layouts/Pokedex';
import Typography from '@components/common/Typography';

// Library
import classNames from 'classnames';
import Button from '@components/common/Button';
import { Dispatch, SetStateAction } from 'react';
import { usePokemonContext } from '@stores/PokemonProvider';

export interface IPokemonDetailsProps {
  pokemonData: IPokemonData;
  updateFormTitle: (value: string) => void;
  openFormPokemon: Dispatch<SetStateAction<boolean>>;
  isOpenForm: boolean;
}

const pokemonCardClasses: string = 'w-[725px] h-[698px] flex flex-col items-center';

const overlayClasses: string = 'w-full h-[278px] flex bg-no-repeat rounded-3xl bg-right-top bg-pokemon-card';

/**
 * @param pokemonID - ID of the Pokemon
 * @param pokemonName - Name of the Pokemon
 * @param pokemonType - Array of types of the Pokemon
 * @param pokemonImg - URL of the Pokemon image
 *
 * @returns {JSX.Element} - The PokemonDetails element.
 */

const PokemonDetails = ({
  pokemonData,
  isOpenForm,
  updateFormTitle,
  openFormPokemon = () => {}
}: IPokemonDetailsProps): JSX.Element => {
  const { dispatch } = usePokemonContext();

  if (!pokemonData || !pokemonData.image || !pokemonData.type || !pokemonData.name || !pokemonData.id) {
    return <div>Error: Pokemon data is missing or incomplete.</div>;
  }

  const type = pokemonData.type.length > 0 ? pokemonData.type[0] : undefined;

  // Default background if type is undefined
  const defaultBackground = CHIP_COLOR.NORMAL;
  const cardClasses: string = classNames([overlayClasses, cardBackground[type || defaultBackground]]);

  const handleButtonEditPokemon = () => {
    openFormPokemon(!isOpenForm);

    updateFormTitle('Edit');

    dispatch({
      type: 'POKEMON_FORM_EDIT'
    });
  };

  return (
    <div className={pokemonCardClasses}>
      <div className="w-full h-full">
        {/* Pokemon Details */}
        <div className={cardClasses}>
          <div className="pl-20">
            <img src={pokemonData.image} alt={pokemonData.name} className="w-[215px] h-[215px]" />
          </div>
          <div className="z-10 w-full p-5 pr-16">
            <Typography color="white">{`#${pokemonData.id}`}</Typography>
            <span className="text-4xl text-white font-bold capitalize block my-2">{pokemonData.name}</span>
            {pokemonData.type.map((type) => {
              return <Chip customClasses="mr-2" key={type} label={type} color={type} />;
            })}
            <Typography>Description</Typography>
          </div>
          <div className="absolute top-8 right-16 z-[100]">
            <Button
              onClick={handleButtonEditPokemon}
              customClasses="border-4 border-gray-400 w-25"
              rounded="medium"
              variant="outline"
            >
              Edit Pokemon
            </Button>
          </div>
        </div>
        {/* Location */}
        <div>
          <Typography customClasses="text-3xl p-6">Spotted Locations</Typography>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;

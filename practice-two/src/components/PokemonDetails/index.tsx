// Components && Types
import Chip, { CHIP_COLOR } from '@components/common/Chip';

// Components
import { cardBackground } from '@components/common/PokmonCard';
import { IPokemonData } from '@components/layouts/Pokedex';
import Typography from '@components/common/Typography';
import Button from '@components/common/Button';

// Library
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';

// Constant
import { FORM_TITLE } from '@constants/formTitle';

export interface IPokemonDetailsProps {
  pokemonData: IPokemonData;
  openFormPokemon: Dispatch<SetStateAction<boolean>>;
  openSubmitFormPokemon: Dispatch<SetStateAction<boolean>>;
  updateFormTitle: (value: string) => void;
  isOpenForm: boolean;
  isOpenSubmitForm: boolean;
}

const pokemonCardClasses: string = 'w-[725px] h-[698px] flex flex-col items-center';

const overlayClasses: string = 'w-full h-[278px] flex bg-no-repeat rounded-3xl bg-right-top bg-pokemon-card';

// TODO: Update comments
const PokemonDetails = ({
  pokemonData,
  isOpenForm,
  isOpenSubmitForm,
  updateFormTitle,
  openFormPokemon = () => {},
  openSubmitFormPokemon = () => {}
}: IPokemonDetailsProps): JSX.Element => {
  if (!pokemonData || !pokemonData.image || !pokemonData.type || !pokemonData.name || !pokemonData.id) {
    return <div>Error: Pokemon data is missing or incomplete.</div>;
  }

  const type = pokemonData.type.length > 0 ? pokemonData.type[0] : undefined;

  // Default background if type is undefined
  const defaultBackground = CHIP_COLOR.NORMAL;
  const cardClasses: string = classNames([overlayClasses, cardBackground[type || defaultBackground]]);

  const handleButtonEditPokemon = () => {
    openFormPokemon(!isOpenForm);

    updateFormTitle(FORM_TITLE.EDIT);
  };

  const handleButtonDeletePokemon = () => {
    openSubmitFormPokemon(!isOpenSubmitForm);
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
            <Button
              onClick={handleButtonDeletePokemon}
              customClasses="border-4 mt-5 w-25"
              color="danger"
              rounded="medium"
              variant="outline"
            >
              Delete Pokemon
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

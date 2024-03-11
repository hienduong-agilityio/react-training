// Types
import Chip, { CHIP_COLOR } from '@components/common/Chip';
import { cardBackground } from '@components/common/PokmonCard';
import Typography from '@components/common/Typography';
import { IPokemonData } from '@components/layouts/Pokedex';

// Components

// Library
import classNames from 'classnames';

export interface IPokemonDetailsProps {
  pokemonData: IPokemonData;
}

const pokemonCardClasses: string = 'w-[725px] h-[698px] flex flex-col items-center rounded-3xl';

const overlayClasses: string = 'w-full h-[278px] flex bg-no-repeat bg-right-top bg-pokemon-card';

/**
 * @param pokemonID - ID of the Pokemon
 * @param pokemonName - Name of the Pokemon
 * @param pokemonType - Array of types of the Pokemon
 * @param pokemonImg - URL of the Pokemon image
 *
 * @returns {JSX.Element} - The PokemonDetails element.
 */

const PokemonDetails = ({ pokemonData }: IPokemonDetailsProps): JSX.Element => {
  if (!pokemonData || !pokemonData.image || !pokemonData.type || !pokemonData.name || !pokemonData.id) {
    return <div>Error: Pokemon data is missing or incomplete.</div>;
  }

  const type = pokemonData.type.length > 0 ? pokemonData.type[0] : undefined;

  // Default background if type is undefined
  const defaultBackground = CHIP_COLOR.NORMAL;
  const cardClasses: string = classNames([overlayClasses, cardBackground[type || defaultBackground]]);

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

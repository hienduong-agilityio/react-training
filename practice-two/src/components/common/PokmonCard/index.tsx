// Types
import { CHIP_COLOR } from '../Chip/index';

// Components
import Chip from '../Chip';
import Typography from '../Typography';

// Library
import classNames from 'classnames';

export interface IPokemonCardProps {
  pokemonID: string;
  pokemonName: string;
  pokemonType: CHIP_COLOR[];
  pokemonImg: string;
}

const pokemonCardClasses: string = 'w-80 h-56 flex flex-col items-center rounded-lg pt-24 relative';

const overlayClasses: string =
  'w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 transition duration-500';

const cardBackground: { [key in CHIP_COLOR]: string } = {
  fire: 'bg-fire-400',
  bug: 'bg-bug-400',
  water: 'bg-water-400',
  flying: 'bg-flying-400',
  poison: 'bg-poison-400',
  normal: 'bg-normal-400',
  rock: 'bg-rock-400',
  ground: 'bg-ground-400',
  fighting: 'bg-fighting-400',
  ghost: 'bg-ghost-400',
  psychic: 'bg-psychic-400',
  ice: 'bg-ice-400',
  dragon: 'bg-dragon-400',
  dark: 'bg-dark-400',
  fairy: 'bg-fairy-400',
  electric: 'bg-electric-400',
  steel: 'bg-steel-400',
  grass: 'bg-grass-400'
};

/**
 * @param {IPokemonCardProps} pokemonID - ID of the Pokemon
 * @param {IPokemonCardProps} pokemonName - Name of the Pokemon
 * @param {IPokemonCardProps} pokemonType - Array of types of the Pokemon
 * @param {IPokemonCardProps} pokemonImg - URL of the Pokemon image
 *
 * @returns {JSX.Element} - The PokemonCard element.
 */

const PokemonCard = ({
  pokemonID = '',
  pokemonName = '',
  pokemonType = [CHIP_COLOR.NORMAL],
  pokemonImg
}: IPokemonCardProps): JSX.Element => {
  const type = pokemonType.length > 0 ? pokemonType[0] : undefined;
  // Default background if type is undefined
  const defaultBackground = CHIP_COLOR.NORMAL;
  const cardClasses: string = classNames([overlayClasses, cardBackground[type || defaultBackground]]);

  return (
    <div className={pokemonCardClasses}>
      <div className="w-full h-full rounded-xl absolute top-0 left-0 overflow-hidden z-0 backface-visibility-hidden">
        <div className={cardClasses}></div>
      </div>

      <div className="absolute -top-12 transform -translate-y-10">
        <img src={pokemonImg} alt={pokemonImg} className="w-40 h-40" />
      </div>

      <div className="z-10 w-full px-5">
        <span className="text-2xl font-bold capitalize block my-2">{pokemonName}</span>

        <Typography>{`#${pokemonID}`}</Typography>
        {pokemonType.map((type, index) => {
          return <Chip customClasses="mr-2" key={index} label={type} color={type} />;
        })}
      </div>
    </div>
  );
};

export default PokemonCard;

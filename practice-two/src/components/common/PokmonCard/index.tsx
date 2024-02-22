// Types
import { CHIP_COLOR } from '../Chip/index';

// Components
import Chip from '../Chip';
import Typography from '../Typography';

export interface IPokemonCardProps {
  pokemonID: string;
  pokemonName: string;
  pokemonType: CHIP_COLOR[];
  pokemonImg: string;
}

const pokemonCardClasses: string = 'w-80 h-56 flex flex-col items-center rounded-lg pt-24 relative';

const overlayClasses: string =
  'w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 transition duration-500';

/**
 * @param {IPokemonCardProps} pokemonID - ID of the Pokemon
 * @param {IPokemonCardProps} pokemonName - Name of the Pokemon
 * @param {IPokemonCardProps} pokemonType - Array of types of the Pokemon
 * @param {IPokemonCardProps} pokemonImg - URL of the Pokemon image
 *
 * @returns {JSX.Element} - The PokemonCard element.
 */

const PokemonCard = ({ pokemonID = '', pokemonName = '', pokemonType, pokemonImg }: IPokemonCardProps): JSX.Element => {
  return (
    <div className={pokemonCardClasses}>
      <div className="w-full h-full rounded-xl absolute top-0 left-0 overflow-hidden z-0 backface-visibility-hidden">
        <div className={`${overlayClasses} bg-${pokemonType[0]}-400`}></div>
      </div>
      <div className="absolute -top-12 transform -translate-y-10">
        <img src={pokemonImg} alt="The pokemon images" className="w-40 h-40" />
      </div>
      <div className="z-10 w-full px-5">
        <span className="text-2xl font-bold capitalize block my-2">{pokemonName}</span>
        <Typography>{`# ${pokemonID}`}</Typography>
        {pokemonType.map((type, index) => {
          return <Chip customClasses="mr-2" key={index} label={type} color={type} />;
        })}
      </div>
    </div>
  );
};

export default PokemonCard;

// Types
import Chip, { CHIP_COLOR } from '@components/common/Chip';
import { cardBackground } from '@components/common/PokmonCard';
import Typography from '@components/common/Typography';

// Components

// Library
import classNames from 'classnames';

export interface IPokemonCardProps {
  pokemonID: string;
  pokemonName: string;
  pokemonImg: string;
  pokemonType?: CHIP_COLOR[];
  onPokemonDetails: () => void;
}

const pokemonCardClasses: string = 'w-full h-full flex flex-col items-center rounded-lg pt-16 relative';

const overlayClasses: string =
  'w-full h-full absolute top-0 left-1/2 transform -translate-x-1/2 transition duration-500 bg-no-repeat bg-right-top	bg-pokemon-card';

/**
 * @param pokemonID - ID of the Pokemon
 * @param pokemonName - Name of the Pokemon
 * @param pokemonType - Array of types of the Pokemon
 * @param pokemonImg - URL of the Pokemon image
 *
 * @returns {JSX.Element} - The PokemonCard element.
 */

const PokemonDetails = ({
  pokemonID = '',
  pokemonName = '',
  pokemonType = [CHIP_COLOR.NORMAL],
  pokemonImg,
  onPokemonDetails = () => {}
}: IPokemonCardProps): JSX.Element => {
  const type = pokemonType.length > 0 ? pokemonType[0] : undefined;
  // Default background if type is undefined
  const defaultBackground = CHIP_COLOR.NORMAL;
  const cardClasses: string = classNames([overlayClasses, cardBackground[type || defaultBackground]]);

  return (
    <div className={pokemonCardClasses} onClick={onPokemonDetails}>
      <div className="w-full h-full rounded-xl absolute top-0 left-0 overflow-hidden z-0 backface-visibility-hidden">
        <div className={cardClasses}></div>
      </div>

      <div className="absolute -top-12 transform -translate-y-10">
        <img src={pokemonImg} alt={pokemonName} className="w-40 h-40" />
      </div>

      <div className="z-10 w-full p-5 px-5">
        <span className="text-2xl font-bold capitalize block my-2">{pokemonName}</span>

        <Typography>{`#${pokemonID}`}</Typography>
        {pokemonType.map((type) => {
          return <Chip customClasses="mr-2" key={type} label={type} color={type} />;
        })}
      </div>
    </div>
  );
};

export default PokemonDetails;

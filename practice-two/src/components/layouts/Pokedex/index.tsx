// Component
import PokemonCard from '@components/common/PokmonCard';

// Type
import { CHIP_COLOR } from '@components/common/Chip';
import { usePokemonContext } from '@stores/PokemonProvider';

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
  const { filteredData, loading, error } = usePokemonContext();

  // Display loading indicator if data is still being fetched
  if (loading) {
    return <span>Loading...</span>;
  }

  // Display error message if there was an issue fetching data
  if (error) {
    return <span>Error: {error}</span>;
  }

  return (
    <section className="pt-24">
      <div className="grid justify-items-center sm:items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
        {filteredData.map((pokemon: IPokemonData) => (
          <PokemonCard
            key={pokemon.id}
            pokemonID={pokemon.id}
            pokemonName={pokemon.name}
            pokemonImg={pokemon.image}
            pokemonType={pokemon.type}
          />
        ))}
      </div>
    </section>
  );
};

export default Pokedex;

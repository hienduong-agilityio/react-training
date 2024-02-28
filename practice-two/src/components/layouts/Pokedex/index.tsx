// Type
import { CHIP_COLOR } from '@components/common/Chip';

// Component
import PokemonCard from '@components/common/PokmonCard';

// Library
import { ReactNode } from 'react';

export interface IPokemonData {
  id: string;
  name: string;
  image: string;
  type: CHIP_COLOR[];
}

interface PokedexProps {
  pokedexData: IPokemonData[];
  pokedexLoading: ReactNode;
  pokedexError: ReactNode;
}

// TODO: Update comments for component lates
const Pokedex = ({ pokedexData, pokedexLoading, pokedexError }: PokedexProps) => {
  if (pokedexLoading) return <span>Loading...</span>;
  if (pokedexError) return <span>Error: {pokedexError}</span>;

  return (
    <section className="pt-24">
      <div className="grid justify-items-center sm:items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
        {pokedexData.map((pokemon: IPokemonData) => (
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

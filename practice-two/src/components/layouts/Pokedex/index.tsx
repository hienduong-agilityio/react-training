import { CHIP_COLOR } from '@components/common/Chip';
import PokemonCard from '@components/common/PokmonCard';
import usePokemonData from '../../../hook/usePokemonData/useReducerPokemonData';

export interface IPokemonData {
  id: string;
  name: string;
  image: string;
  type: CHIP_COLOR[];
}

const Pokedex = () => {
  const URL = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
  const { data, loading, error } = usePokemonData(URL);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error: {error}</span>;

  return (
    <section className="pt-24">
      <div className="grid justify-items-center sm:items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20 ">
        {data.map((pokemon: IPokemonData) => (
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

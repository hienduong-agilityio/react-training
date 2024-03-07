// Component
import { IPokemonData } from '@components/layouts/Pokedex';
import { usePokemonContext } from '@stores/PokemonProvider';
import { useEffect, useMemo, useState } from 'react';

const usePokemonData = () => {
  const { state } = usePokemonContext();

  const [data, setData] = useState<IPokemonData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    // Append search term to the URL
    if (state.searchTerm) {
      url.searchParams.append('name', state.searchTerm);
    }

    return url.toString();
  }, [state.searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlWithSearchParams);
        if (!response.ok) {
          throw new Error('Error encountered while fetching');
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, [state.searchTerm, urlWithSearchParams]);

  return { data, error };
};

export default usePokemonData;

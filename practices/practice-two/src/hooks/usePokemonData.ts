// Component
import { IPokemonData } from '@components/layouts/Pokedex';

// Store
import { usePokemonContext } from '@stores/PokemonProvider';

// Hooks
import { useEffect, useMemo, useState } from 'react';

// URL
import { POKEMON_URL } from '@constants/api';

const usePokemonData = () => {
  const { state } = usePokemonContext();

  const [data, setData] = useState<IPokemonData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseURL: string = POKEMON_URL;

  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    // Append search term to the URL
    if (state.searchTerm) {
      url.searchParams.append('name', state.searchTerm);
    }

    // Append filter terms to the URL
    if (state.filterTerm) {
      state.filterTerm.forEach((term: string) => {
        url.searchParams.append('type', term);
      });
    }

    return url.toString();
  }, [baseURL, state.searchTerm, state.filterTerm]);

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

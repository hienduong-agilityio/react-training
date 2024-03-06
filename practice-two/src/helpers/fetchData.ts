// helpers/fetchData.ts

// Component
import { usePokemonContext } from '@stores/PokemonProvider';

// Hook
import { useEffect } from 'react';

const usePokemonData = () => {
  const { searchTerm, dispatch } = usePokemonContext();

  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  const url = new URL(baseURL);

  // Append search term to the URL
  if (searchTerm) {
    url.searchParams.append('name', searchTerm);
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_POKEMON_REQUEST' });

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error encountered while fetching');
        } else {
          const data = await response.json();
          dispatch({ type: 'FETCH_POKEMON_SUCCESS', payload: data });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_POKEMON_ERROR', payload: (error as Error).message });
      }
    };

    fetchData();
  }, [searchTerm]);
};

export default usePokemonData;

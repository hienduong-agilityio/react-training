// Component
import { usePokemonContext } from '@stores/PokemonProvider';

// Hook
import { useEffect, useMemo } from 'react';

const usePokemonData = () => {
  const { state, dispatch } = usePokemonContext();

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
      dispatch({ type: 'FETCH_POKEMON_REQUEST' });

      try {
        const response = await fetch(urlWithSearchParams);
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
  }, [dispatch, state.searchTerm, urlWithSearchParams]);
};

export default usePokemonData;

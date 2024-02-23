import { IPokemonData } from '@components/layouts/Pokedex';
import { useEffect, useReducer } from 'react';

interface IPokemonDataState {
  data: IPokemonData[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_API_REQUEST' }
  | { type: 'FETCH_API_SUCCESS'; payload: IPokemonData[] }
  | { type: 'FETCH_API_ERROR'; payload: string };

const usePokemonData = (URL: string): IPokemonDataState => {
  const initialState: IPokemonDataState = {
    data: [],
    loading: false,
    error: null
  };

  const reducer = (state: IPokemonDataState, action: Action): IPokemonDataState => {
    switch (action.type) {
      case 'FETCH_API_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_API_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_API_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_API_REQUEST' });

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Error encountered while fetching');
        } else {
          const data = await response.json();
          dispatch({ type: 'FETCH_API_SUCCESS', payload: data });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_API_ERROR', payload: (error as Error).message });
      }
    };

    fetchData();
  }, [URL]);

  return state;
};

export default usePokemonData;

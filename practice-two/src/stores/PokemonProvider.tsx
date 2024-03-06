// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, useEffect } from 'react';

// Types
import { IPokemonDataState } from '@hooks/usePokemonData';
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps extends IPokemonDataState {
  searchTerm: string;
  url: string;
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'search'; inputValue: string }
  | { type: 'FETCH_API_REQUEST'; url: string }
  | { type: 'FETCH_API_SUCCESS'; payload: IPokemonData[] }
  | { type: 'FETCH_API_ERROR'; payload: string };

const initialState: IPokemonContextProps = {
  searchTerm: '',
  url: '',
  data: [],
  loading: false,
  error: null,
  dispatch: () => {}
};

/**
 * Reducer function to update Pokemon context state with types
 * @param state - Current state of the Pokemon context
 * @param action - Action dispatched to update state
 *
 * @returns Updated state based on the dispatched action
 */

const pokemonReducer = (state: IPokemonContextProps, action: Action): IPokemonContextProps => {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        searchTerm: action.inputValue
      };
    case 'FETCH_API_REQUEST':
      return { ...state, loading: true, error: null, url: action.url };
    case 'FETCH_API_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_API_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create context
export const PokemonContext = createContext<IPokemonContextProps>(initialState);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }

  return context;
};

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const { url, searchTerm, data, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (url) {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error('Error encountered while fetching');
          } else {
            const data = await response.json();
            dispatch({ type: 'FETCH_API_SUCCESS', payload: data });
          }
        }
      } catch (error) {
        dispatch({ type: 'FETCH_API_ERROR', payload: (error as Error).message });
      }
    };

    fetchData();
  }, [dispatch, url]);

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      url,
      data,
      loading,
      error,
      dispatch
    }),
    [url, error, data, loading, searchTerm, dispatch]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

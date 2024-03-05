// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, useEffect } from 'react';

// Types
import { IPokemonDataState } from '@hooks/usePokemonData';
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps extends IPokemonDataState {
  searchTerm: string;
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'search'; inputValue: string }
  | { type: 'GET'; data: IPokemonData[]; loading: boolean; error: string | null };

const initialState: IPokemonContextProps = {
  searchTerm: '',
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
    case 'GET':
      return {
        ...state,
        data: action.data,
        loading: action.loading,
        error: action.error
      };
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

/**
 * Function to filter on API
 * @param searchTerm Search key value
 *
 * @returns
 */
const generateUrl = (searchTerm: string): string => {
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
  const url = new URL(baseURL);

  if (searchTerm) {
    url.searchParams.append('name', searchTerm);
  }

  return url.toString();
};

// Get Data by fetch API
const fetchData = (url: string, dispatch: Dispatch<Action>) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: 'GET', data, loading: false, error: null });
    })
    .catch((error) => {
      dispatch({ type: 'GET', data: [], loading: false, error: error.message });
    });
};

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    const urlWithSearchParams = generateUrl(state.searchTerm);
    fetchData(urlWithSearchParams, dispatch);
  }, [state.searchTerm]);

  const { searchTerm, data, loading, error } = state;

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      data,
      loading,
      error,
      dispatch
    }),
    [error, data, loading, searchTerm, dispatch]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

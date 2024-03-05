// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch } from 'react';

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
  | { type: 'FETCH_API_REQUEST' }
  | { type: 'FETCH_API_SUCCESS'; payload: IPokemonData[] }
  | { type: 'FETCH_API_ERROR'; payload: string };

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

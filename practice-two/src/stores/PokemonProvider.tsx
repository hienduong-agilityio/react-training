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

type Action = { type: 'search'; inputValue: string } | { type: 'FETCH_POKEMON_SUCCESS'; payload: IPokemonData[] };

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
    case 'FETCH_POKEMON_SUCCESS':
      return { ...state, data: action.payload };

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

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm: state.searchTerm,
      data: state.data,
      loading: state.loading,
      error: state.error,
      dispatch: dispatch
    }),
    [state, dispatch]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

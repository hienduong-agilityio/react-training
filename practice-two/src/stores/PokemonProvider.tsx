// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch } from 'react';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps {
  state: {
    searchTerm?: string;
    filterTerm?: string[];
    pokemonID?: string;
    data?: IPokemonData[];
    pokemonData?: [];
    loading?: boolean;
    error?: string | null;
  };
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'SEARCH_INPUT'; inputValue: string }
  | { type: 'FILTER_TYPE'; checkedValue: string[] }
  | { type: 'POKEMON_DETAILS'; getPokemonID: string }
  | { type: 'ADD_POKEMON'; payload: [] }
  | { type: 'FETCH_POKEMON_REQUEST' }
  | { type: 'FETCH_POKEMON_SUCCESS'; payload: IPokemonData[] }
  | { type: 'FETCH_POKEMON_ERROR'; payload: string };

const initialState: IPokemonContextProps = {
  state: {
    searchTerm: '',
    filterTerm: [],
    pokemonID: '',
    pokemonData: [],
    data: [],
    loading: false,
    error: null
  },
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
    case 'SEARCH_INPUT':
      return {
        ...state,
        state: { searchTerm: action.inputValue }
      };
    case 'FILTER_TYPE':
      return {
        ...state,
        state: { filterTerm: action.checkedValue }
      };
    case 'POKEMON_DETAILS':
      return {
        ...state,
        state: { pokemonID: action.getPokemonID }
      };
    case 'ADD_POKEMON':
      return {
        ...state,
        state: { pokemonData: action.payload }
      };
    case 'FETCH_POKEMON_REQUEST':
      return { ...state, state: { loading: true, error: null } };
    case 'FETCH_POKEMON_SUCCESS':
      return { ...state, state: { loading: false, data: action.payload } };
    case 'FETCH_POKEMON_ERROR':
      return { ...state, state: { loading: false, error: action.payload } };

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
      ...state,
      dispatch
    }),
    [state, dispatch]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

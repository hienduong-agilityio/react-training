// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch } from 'react';
import { IPokemonDataState } from '@hooks/usePokemonData';
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps extends IPokemonDataState {
  searchTerm: string;
  filterTerm: string[];
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

interface Action {
  checkedValue: string[];
  type: string;
  inputValue: string;
  data: IPokemonData[];
  loading: boolean;
  error: string | null;
}

const initialState: IPokemonContextProps = {
  filterTerm: [],
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
    case 'filter':
      return {
        ...state,
        filterTerm: action.checkedValue
      };
    case 'getData':
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
 * Provider component to wrap the application and provide Pokemon context
 * @param children - The children components to be wrapped by the provider
 *
 * @returns JSX element containing the provided context
 */

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  // Use reducer to manage state and dispatch actions
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const { filterTerm, searchTerm, data, loading, error } = state;

  // Create context value with memoization
  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      filterTerm,
      searchTerm,
      data,
      loading,
      error,
      dispatch
    }),
    [filterTerm, error, data, loading, searchTerm, dispatch]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

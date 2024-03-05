// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch } from 'react';
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps extends IPokemonDataState {
  searchTerm: string;
  filterTerm: string[];
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'search'; inputValue: string }
  | { type: 'GET'; data: IPokemonData[]; loading: boolean; error: string | null }
  | { type: 'filter'; checkedValue: string[] };

const initialState: IPokemonContextProps = {
  searchTerm: '',
  filterTerm: [],
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
 * Provider component to wrap the application and provide Pokemon context
 * @param children - The children components to be wrapped by the provider
 *
 * @returns JSX element containing the provided context
 */

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  // Use reducer to manage state and dispatch actions
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const { searchTerm, filterTerm } = state;

  // Base url API
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  // Construct URL with search parameters
  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    // Append search term to the URL
    if (searchTerm) {
      url.searchParams.append('name', searchTerm);
    }

    // Append filter terms to the URL
    if (filterTerm.length > 0) {
      filterTerm.forEach((term: string) => {
        url.searchParams.append('type', term);
      });
    }

    return url.toString();
  }, [searchTerm, filterTerm]);

  // Fetch Pokemon data using custom hook
  const { data, loading, error } = usePokemonData(urlWithSearchParams);

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

// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch } from 'react';
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';

interface IPokemonContextProps extends IPokemonDataState {
  searchTerm: string;
}

interface ContextProviderProps {
  children: ReactNode;
}

interface Action {
  type: string;
  inputValue: string;
}

const initialState: IPokemonContextProps = {
  searchTerm: '',
  data: [],
  loading: false,
  error: null
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
    default:
      return state;
  }
};

// Create context
export const PokemonContext = createContext<IPokemonContextProps | undefined>(undefined);
export const PokemonDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }

  return context;
};

export const usePokemonDispatch = () => {
  const dispatch = useContext(PokemonDispatchContext);

  if (!dispatch) {
    throw new Error('usePokemonDispatch must be used within a PokemonProvider');
  }

  return dispatch;
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

  const { searchTerm } = state;

  // Base url API
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  // Construct URL with search parameters
  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    // Append search term to the URL
    url.searchParams.append('search', searchTerm);

    return url.toString();
  }, [baseURL, searchTerm]);

  // Fetch Pokemon data using custom hook
  const { data, loading, error }: IPokemonDataState = usePokemonData(urlWithSearchParams);

  // Create context value with memoization
  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      data,
      loading,
      error
    }),
    [error, data, loading, searchTerm]
  );

  return (
    <PokemonContext.Provider value={contextValue}>
      <PokemonDispatchContext.Provider value={dispatch}>{children}</PokemonDispatchContext.Provider>
    </PokemonContext.Provider>
  );
};

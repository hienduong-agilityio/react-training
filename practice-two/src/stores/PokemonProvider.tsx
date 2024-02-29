// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer } from 'react';
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps {
  searchTerm: string;
  data: IPokemonData[];
  loading: boolean;
  error: string | null;
}

interface IPokemonDispatchContextProps {
  handleSearch: (value: string) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

enum ActionType {
  SET_SEARCH_TERM = 'SET_SEARCH_TERM'
}

interface Action {
  type: ActionType;
  payload: string;
}

const initialState: IPokemonContextProps = {
  searchTerm: '',
  data: [],
  loading: false,
  error: null
};

const reducer = (state: IPokemonContextProps, action: Action): IPokemonContextProps => {
  switch (action.type) {
    case ActionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};

export const PokemonContext = createContext<IPokemonContextProps | undefined>(undefined);
export const PokemonDispatchContext = createContext<IPokemonDispatchContextProps | undefined>(undefined);

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

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { searchTerm } = state;

  // API
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';

  // Filter API
  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    url.searchParams.append('search', searchTerm);

    return url.toString();
  }, [baseURL, searchTerm]);

  const { data, loading, error }: IPokemonDataState = usePokemonData(urlWithSearchParams);

  /**
   * Function handle get value to  search
   * @param value - Value string from input search
   */
  const handleSearch = (value: string): void => {
    dispatch({ type: ActionType.SET_SEARCH_TERM, payload: value });
  };

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      data,
      loading,
      error
    }),
    [error, data, loading, searchTerm]
  );

  const dispatchValue: IPokemonDispatchContextProps = { handleSearch };

  return (
    <PokemonContext.Provider value={contextValue}>
      <PokemonDispatchContext.Provider value={dispatchValue}>{children}</PokemonDispatchContext.Provider>
    </PokemonContext.Provider>
  );
};

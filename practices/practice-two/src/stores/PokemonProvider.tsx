// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, Reducer } from 'react';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

export type PokemonType = {
  searchTerm?: string;
  filterTerm?: string[];
  pokemonID?: string;
  data: IPokemonData[];
  loading?: boolean;
  error?: string | null;
};

interface IPokemonContextProps {
  state: PokemonType;
  dispatch: Dispatch<Action>;
}

interface ContextProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'SEARCH_INPUT'; inputValue: string }
  | { type: 'FILTER_TYPE'; checkedValue: string[] }
  | { type: 'POKEMON_DETAILS'; getPokemonID: string }
  // Action to Fetch pokemon Data
  | { type: 'FETCH_POKEMON_REQUEST' }
  | { type: 'FETCH_POKEMON_SUCCESS'; payload: IPokemonData[] }
  | { type: 'FETCH_POKEMON_ERROR'; payload: string }

  // Action to Add pokemon
  | { type: 'ADD_POKEMON_REQUEST' }
  | { type: 'ADD_POKEMON_SUCCESS'; payload: IPokemonData }
  | { type: 'ADD_POKEMON_ERROR'; payload: string }

  // Action to Edit Pokemon
  | { type: 'EDIT_POKEMON_REQUEST' }
  | { type: 'EDIT_POKEMON_SUCCESS'; payload: IPokemonData }
  | { type: 'EDIT_POKEMON_ERROR'; payload: string }

  // Action to Delete Pokemon
  | { type: 'DELETE_POKEMON_REQUEST' }
  | { type: 'DELETE_POKEMON_SUCCESS' }
  | { type: 'DELETE_POKEMON_ERROR'; payload: string };

const initialState: PokemonType = {
  searchTerm: '',
  filterTerm: [],
  pokemonID: '',
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

const pokemonReducer = (state: PokemonType, action: Action) => {
  switch (action.type) {
    case 'SEARCH_INPUT':
      return {
        ...state,
        searchTerm: action.inputValue
      };
    case 'FILTER_TYPE':
      return {
        ...state,
        filterTerm: action.checkedValue
      };
    case 'POKEMON_DETAILS':
      return {
        ...state,
        pokemonID: action.getPokemonID
      };
    // REQUEST
    case 'FETCH_POKEMON_REQUEST':
    case 'ADD_POKEMON_REQUEST':
    case 'EDIT_POKEMON_REQUEST':
    case 'DELETE_POKEMON_REQUEST':
      return { ...state, loading: true, error: null };

    // SUCCESS
    case 'FETCH_POKEMON_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'ADD_POKEMON_SUCCESS':
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload]
      };
    case 'EDIT_POKEMON_SUCCESS': {
      const newData = [...state.data];

      newData[Number(state.pokemonID) - 1] = action.payload;

      return {
        ...state,
        loading: false,
        data: state.pokemonID ? newData : state.data
      };
    }
    case 'DELETE_POKEMON_SUCCESS': {
      const newData = state.data.filter((pokemon) => pokemon.id !== state.pokemonID);

      return {
        ...state,
        loading: false,
        data: newData
      };
    }

    // ERROR
    case 'FETCH_POKEMON_ERROR':
    case 'ADD_POKEMON_ERROR':
    case 'EDIT_POKEMON_ERROR':
    case 'DELETE_POKEMON_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// Create context
export const PokemonContext = createContext<IPokemonContextProps>({ state: initialState, dispatch: () => {} });

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }

  return context;
};

export const PokemonProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<PokemonType, Action>>(pokemonReducer, initialState);

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

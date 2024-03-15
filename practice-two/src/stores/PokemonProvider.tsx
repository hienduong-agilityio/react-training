// Hook
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, Reducer } from 'react';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

export type PokemonType = {
  searchTerm?: string;
  filterTerm?: string[];
  pokemonID?: string;
  data: IPokemonData[];
  formTitle?: string;
  formEditValue: IPokemonData[];
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
  | { type: 'ADD_POKEMON_SUCCESS'; payload: IPokemonData }
  | { type: 'EDIT_POKEMON_SUCCESS'; payload: IPokemonData }
  | { type: 'UPDATE_POKEMON_FORM_TITLE'; payload: string }
  | { type: 'POKEMON_FORM_EDIT' }
  | { type: 'EDIT_POKEMON_REQUEST' }
  | { type: 'FETCH_POKEMON_REQUEST' }
  | { type: 'ADD_POKEMON_REQUEST' }
  | { type: 'FETCH_POKEMON_SUCCESS'; payload: IPokemonData[] }
  | { type: 'EDIT_POKEMON_ERROR'; payload: string }
  | { type: 'ADD_POKEMON_ERROR'; payload: string }
  | { type: 'FETCH_POKEMON_ERROR'; payload: string };

const initialState: PokemonType = {
  searchTerm: '',
  filterTerm: [],
  pokemonID: '',
  formEditValue: [],
  formTitle: 'Create',
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
    case 'UPDATE_POKEMON_FORM_TITLE':
      return {
        ...state,
        formTitle: action.payload
      };
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
    case 'POKEMON_FORM_EDIT': {
      return {
        ...state,
        loading: false,
        formEditValue: state.pokemonID ? [state.data[Number(state.pokemonID) - 1] || null] : []
      };
    }
    case 'EDIT_POKEMON_REQUEST':
    case 'ADD_POKEMON_REQUEST':
    case 'FETCH_POKEMON_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_POKEMON_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'EDIT_POKEMON_ERROR':
    case 'ADD_POKEMON_ERROR':
    case 'FETCH_POKEMON_ERROR':
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

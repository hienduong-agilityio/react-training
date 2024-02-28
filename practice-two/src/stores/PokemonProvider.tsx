// Hook
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps {
  searchTerm: string;
  filteredData: IPokemonData[];
  loading: boolean;
  error: string | null;
  handleSearch: (value: string) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

export const PokemonContext = createContext<IPokemonContextProps | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('usePokemonContext must be used within an AppProvider');
  }

  return context;
};

export const AppProvider = ({ children }: ContextProviderProps) => {
  // Management input value state to search
  const [searchTerm, setSearchTerm] = useState<string>('');

  // FetchAPI
  const baseURL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
  const urlWithSearchParams = useMemo(() => {
    const url = new URL(baseURL);

    url.searchParams.append('search', searchTerm);

    return url.toString();
  }, [baseURL, searchTerm]);

  const { data, loading, error }: IPokemonDataState = usePokemonData(urlWithSearchParams);

  // Filter data based on search term
  const filteredData: IPokemonData[] = useMemo(() => {
    if (!data) return [];

    return data.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  /**
   * Function handle get value to  search
   * @param value - Value string from input search
   */
  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      filteredData,
      loading,
      error,
      handleSearch
    }),
    [error, filteredData, loading, searchTerm]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

// Hook
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import usePokemonData, { IPokemonDataState } from '@hooks/usePokemonData';

// Types
import { IPokemonData } from '@components/layouts/Pokedex';

interface IPokemonContextProps {
  searchTerm: string;
  data: IPokemonData[];
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
    setSearchTerm(value);
  };

  const contextValue: IPokemonContextProps = useMemo(
    () => ({
      searchTerm,
      data,
      loading,
      error,
      handleSearch
    }),
    [error, data, loading, searchTerm]
  );

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
};

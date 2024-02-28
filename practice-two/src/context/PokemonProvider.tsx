// Hook
import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
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

  // Management list value to filter search
  const [filteredData, setFilteredData] = useState<IPokemonData[]>([]);

  // FetchAPI
  const URL: string = 'https://6540762545bedb25bfc1f578.mockapi.io/api/v1/pokemon';
  const { data, loading, error }: IPokemonDataState = usePokemonData(URL);

  // Update Pokemon filter results by search value or data
  useEffect(() => {
    if (data) {
      const filtered = data.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  /**
   * Function handle get value to  search
   * @param value - Value string from input search
   */
  const handleSearch = (value: string) => {
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

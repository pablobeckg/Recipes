import { createContext, useContext } from "react";

interface SearchTermContext {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchTermContext = createContext<SearchTermContext>(null!);
export const useSearchTermContext = () => useContext(SearchTermContext);
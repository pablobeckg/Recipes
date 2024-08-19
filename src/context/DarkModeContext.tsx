import { createContext, useContext } from "react";

interface DarkModeContext {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContext>(null!);
export const useDarkModeContext = () => useContext(DarkModeContext);

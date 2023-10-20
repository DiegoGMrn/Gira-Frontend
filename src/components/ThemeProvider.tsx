
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { lightColors, darkColors } from "../constants/Colors";

import { Appearance, ColorSchemeName } from "react-native";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  dark: boolean;
  colors: any; 
  setScheme: (scheme: "light" | "dark") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const deviceColorScheme: ColorSchemeName = Appearance.getColorScheme();
  console.log(deviceColorScheme);
  const [isDark, setIsDark] = useState(deviceColorScheme === "dark");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const defaultTheme = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: "light" | "dark") => setIsDark(scheme === "dark"),
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);

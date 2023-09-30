/*import { createContext } from "react";
import { FC, useState } from "react";
import { TColors } from "../constants/Colors";
import Colors from "../constants/Colors";

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: FC<Props> = ({ children }) => {
  const [colors, setColors] = useState(Colors.light);

  const applyColors = (colorTheme: TColors) => {
    setColors(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{ applyColors, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };*/

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
  colors: any; // Cambia esto al tipo correcto de tus colores (lightColors/darkColors).
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

// creating a custom hook for accesing all the value
export const useTheme = () => useContext(ThemeContext);

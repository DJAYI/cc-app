import { COLORS } from "@/constants/colors";
import { createContext, useState } from "react";

export type Theme = "dark" | "light";

interface ThemeContextProps {
  theme: Theme;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: COLORS.light,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const colors = theme === "light" ? COLORS.light : COLORS.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

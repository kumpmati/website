import { createContext } from "react";

export const ThemeContext = createContext<{
  theme: any;
  current: "dark" | "light" | "auto";
  setColorScheme: (value: "dark" | "light" | "auto") => any;
} | null>(null);

export const DARK_THEME = {
  "--txt-col": "white",
  "--txt-col-subtle": "gray",
  "--bg-col": "black",
};

export const LIGHT_THEME = {
  "--txt-col": "black",
  "--txt-col-subtle": "gray",
  "--bg-col": "white",
};

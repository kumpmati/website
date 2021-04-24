import { createContext } from "react";

export const ThemeContext = createContext<{
  theme: any;
  current: "dark" | "light" | "auto";
  dark: boolean;
  setColorScheme: (value: "dark" | "light" | "auto") => any;
} | null>(null);

export const DARK_THEME = {
  "--txt-col": "white",
  "--txt-col-subtle": "rgb(160,160,160)",
  "--link-col": "white",
  "--bg-col": "black",
  "--overlay": "rgba(255,255,255,0.05)",
  "--code-txt-col": "rgb(170,170,170)",
  "--code-bg-col": "rgba(255,255,255,0.1)",
};

export const LIGHT_THEME = {
  "--txt-col": "black",
  "--txt-col-subtle": "rgb(110,110,110)",
  "--link-col": "black",
  "--bg-col": "white",
  "--overlay": "rgba(0,0,0,0.05)",
  "--code-txt-col": "rgb(70,70,70)",
  "--code-bg-col": "rgba(0,0,0,0.1)",
};

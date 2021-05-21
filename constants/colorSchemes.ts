import { createContext } from "react";

export const ThemeContext =
  createContext<{
    theme: any;
    current: "dark" | "light" | "auto";
    dark: boolean;
    setColorScheme: (value: "dark" | "light" | "auto") => any;
  } | null>(null);

export const DARK_THEME = {
  "--txt-col": "#fff",
  "--txt-col-subtle": "#808080",
  "--txt-col-subtler": "#646464",
  "--link-col": "white",
  "--blogtext-col": "#a3a3a3",
  "--bg-col": "#000",
  "--bg-col-transparent": "rgba(0,0,0,0)",
  "--overlay": "rgba(255,255,255,0.08)",
  "--code-txt-col": "rgb(170,170,170)",
  "--code-bg-col": "rgba(255,255,255,0.1)",
};

export const LIGHT_THEME = {
  "--txt-col": "black",
  "--txt-col-subtle": "rgb(120,120,120)",
  "--txt-col-subtler": "rgb(150,150,150)",
  "--link-col": "black",
  "--bg-col": "#fff",
  "--bg-col-transparent": "rgba(255,255,255,0)",
  "--overlay": "rgba(0,0,0,0.05)",
  "--code-txt-col": "rgb(70,70,70)",
  "--code-bg-col": "rgba(0,0,0,0.1)",
};

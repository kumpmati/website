import { DARK_THEME, LIGHT_THEME } from "@constants/colorSchemes";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

/**
 * Helper to use useLayoutEffect without console warnings.
 * (it runs as useEffect on the server side and useLayoutEffect on the client side)
 * @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hook to use when providing value to ThemeContext.Provider
 */
export const useColorScheme = () => {
  const query = "(prefers-color-scheme: dark)";

  const [current, setCurrent] = useState<"dark" | "light" | "auto">("auto");
  const [dark, setDark] = useState(false);

  const theme = dark ? DARK_THEME : LIGHT_THEME;

  useIsomorphicLayoutEffect(() => {
    const userChoice = localStorage.getItem("color-scheme") as "dark" | "light";

    if (userChoice) {
      setCurrent(userChoice);
      setDark(userChoice === "dark");
      return;
    }

    setCurrent("auto");
    setDark(window.matchMedia(query).matches);
  }, []);

  const setColorScheme = (value: "dark" | "light" | "auto") => {
    if (value === "auto") {
      localStorage.removeItem("color-scheme");

      setCurrent("auto");
      setDark(window.matchMedia(query).matches);
      return;
    }

    setCurrent(value);
    setDark(value === "dark");
    localStorage.setItem("color-scheme", value);
  };

  return { theme, setColorScheme, current, dark };
};

export const useLoadingState = () => {
  const [loading, setLoading] = useState(true);
  const { events } = useRouter();

  useIsomorphicLayoutEffect(() => setLoading(false), []);

  events?.on("routeChangeStart", () => setLoading(true));
  events?.on("routeChangeComplete", () => setLoading(false));
  events?.on("routeChangeError", () => setLoading(false));

  return { loading };
};

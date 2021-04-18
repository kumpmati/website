import { ThemeContext } from "@constants/colorSchemes";
import { useContext } from "react";

import css from "./ColorSchemeToggle.module.css";

const ColorSchemeToggle = () => {
  const { theme, current, setColorScheme } = useContext(ThemeContext);
  const nextMode = current === "auto" || current === "light" ? "dark" : "light";

  return (
    <div style={theme} className={css.container}>
      {current !== "auto" && (
        <button className={css.reset} onClick={() => setColorScheme("auto")}>
          auto
        </button>
      )}

      <button className={css.toggle} onClick={() => setColorScheme(nextMode)}>
        {current}
      </button>
    </div>
  );
};

export default ColorSchemeToggle;

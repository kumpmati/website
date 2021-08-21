import { ThemeContext } from "@constants/colorSchemes"
import { domAnimation, LazyMotion, m } from "framer-motion"
import { useContext, useState } from "react"

import css from "./ColorSchemeToggle.module.css"

const options: ("dark" | "light" | "auto")[] = ["auto", "light", "dark"]

const emojis = {
  dark: `🌚`,
  light: `🌝`,
  auto: `🌗`,
}

const ColorSchemeToggle = () => {
  const { theme, current, setColorScheme } = useContext(ThemeContext)
  const nextMode = options[(options.indexOf(current) + 1) % options.length]

  return (
    <div style={theme}>
      <button
        className={css.toggle}
        onClick={() => setColorScheme(nextMode)}
        title={`switch to ${nextMode} mode`}
      >
        {emojis[nextMode]}
      </button>
    </div>
  )
}

export default ColorSchemeToggle

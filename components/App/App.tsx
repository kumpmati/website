import Navigation from "@components/Navigation";
import { ThemeContext } from "@constants/colorSchemes";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useContext } from "react";

import css from "./App.module.css";

const App = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <AnimateSharedLayout>
      <div style={theme} className={css.app}>
        <Navigation />

        <motion.div style={{ position: "relative" }}>{children}</motion.div>
      </div>
    </AnimateSharedLayout>
  );
};

export default App;

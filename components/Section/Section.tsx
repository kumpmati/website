import { FC } from "react";
import { animated, useSpring } from "react-spring";

import css from "./Section.module.css";

const Section: FC<HeaderProps> = ({ children, delay }) => {
  const props = useSpring({
    config: { mass: 1, friction: 10, tension: 100 },
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
  });

  return (
    <animated.header style={props} className={css.header}>
      {children}
    </animated.header>
  );
};

export default Section;

export interface HeaderProps {
  children?: any;
  delay?: number;
}

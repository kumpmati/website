import { FC } from "react";
import { animated, useSpring } from "react-spring";

import css from "./Section.module.css";

const Section: FC<SectionProps> = (props) => {
  const { children, delay, sticky, columns, className } = props;

  const springProps = useSpring({
    config: { mass: 1, friction: 10, tension: 100 },
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
  });

  const classNames = `${className}  ${css.section} ${
    sticky ? css["section--sticky"] : ""
  } ${columns > 0 ? css["section--grid"] : ""}`;

  const style = {
    ...springProps,
    gridTemplateColumns: `repeat(${columns ?? 0}, 1fr)`,
  };

  return (
    <animated.header style={style} className={classNames}>
      {children}
    </animated.header>
  );
};

export default Section;

export interface SectionProps {
  children?: any;
  delay?: number;
  sticky?: boolean;
  columns?: number;
  className?: string;
}

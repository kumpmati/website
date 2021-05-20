import { CSSProperties, FC } from "react";
import { animated, useSpring } from "react-spring";

import css from "./Section.module.css";

const Section: FC<PropsI> = (props) => {
  const { children, delay, sticky, columns, className, style: customStyle } = props;

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
    ...customStyle,
  };

  return (
    <animated.section style={style} className={classNames}>
      {children}
    </animated.section>
  );
};

export default Section;

interface PropsI {
  children?: any;
  delay?: number;
  sticky?: boolean;
  columns?: number;
  className?: string;
  style?: CSSProperties;
}

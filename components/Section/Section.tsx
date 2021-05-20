import { motion } from "framer-motion";
import { CSSProperties, FC } from "react";
import css from "./Section.module.css";

const Section: FC<PropsI> = (props) => {
  const { children, delay, sticky, columns, className, style: customStyle } = props;

  const classNames = `${className}  ${css.section} ${
    sticky ? css["section--sticky"] : ""
  } ${columns > 0 ? css["section--grid"] : ""}`;

  const style = {
    gridTemplateColumns: `repeat(${columns ?? 0}, 1fr)`,
    ...customStyle,
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      style={style}
      className={classNames}>
      {children}
    </motion.section>
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

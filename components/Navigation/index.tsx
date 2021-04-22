import css from "./Navigation.module.css";
import NavigationLink from "../NavigationLink";
import { useRouter } from "next/router";
import Link from "next/link";

import { animated, useSpring } from "react-spring";
import Logo from "@components/Logo";
import { motion } from "framer-motion";

const links = [
  { text: "About", url: "/about" },
  { text: "Projects", url: "/projects" },
  { text: "Blog", url: "/blog" },
  { text: "Contact", url: "/contact" },
];

const Navigation = () => {
  const { asPath } = useRouter();

  const dividerProps = useSpring(dividerAnimation);
  const titleProps = useSpring(titleAnimation);
  const linksProps = useSpring(linksAnimation);

  return (
    <motion.nav
      transition={{ delay: 0.05, type: "tween", duration: 0.5 }}
      className={css.nav}
      layoutId="nav">
      <Link href="/">
        <animated.div style={titleProps} className={css.nav__title}>
          <Logo />
        </animated.div>
      </Link>

      <animated.div
        style={dividerProps}
        className={css.nav__divider}></animated.div>

      <animated.ul style={linksProps} className={css.nav__links}>
        {links.map((link) => (
          <NavigationLink
            key={link.url}
            active={asPath === link.url}
            text={link.text}
            url={link.url}
          />
        ))}
      </animated.ul>
    </motion.nav>
  );
};

export default Navigation;

const dividerAnimation = {
  config: { mass: 1, friction: 15, tension: 100 },
  from: { width: "0ch" },
  to: { width: "28ch" },
  delay: 250,
};

const titleAnimation = {
  config: { mass: 1, friction: 15, tension: 75 },
  from: {
    transform: "translateY(100%)",
    clipPath: "inset(0% -50% 100% -50%)",
  },
  to: {
    transform: "translateY(0%)",
    clipPath: "inset(0% -50% 0% -50%)",
  },
  delay: 500,
};

const linksAnimation = {
  config: { mass: 1, friction: 15, tension: 75 },
  from: {
    transform: "translateY(-100%)",
    clipPath: "inset(100% -50% 0% -50%)",
  },
  to: {
    transform: "translateY(0%)",
    clipPath: "inset(0% -50% 0% -50%)",
  },
  delay: 1000,
};

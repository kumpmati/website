import css from "./Navigation.module.css";
import NavigationLink from "../NavigationLink";
import { useRouter } from "next/router";
import Link from "next/link";

import { animated, useSpring } from "react-spring";
import Logo from "@components/Logo";
import { motion } from "framer-motion";
import { useLoadingState } from "util/hooks";

const links = [
  { text: "About", url: "/about" },
  { text: "Projects", url: "/projects" },
  { text: "Blog", url: "/blog" },
  { text: "Contact", url: "/contact" },
];

const Navigation = () => {
  const { asPath } = useRouter();
  const { loading } = useLoadingState();

  const titleProps = useSpring(titleAnimation);
  const dividerProps = useSpring(dividerAnimation);
  const linksProps = useSpring(linksAnimation);

  return (
    <motion.nav
      transition={{ type: "spring", duration: 1, delay: 0.25 }}
      className={css.nav}
      layoutId="nav">
      <Link href="/">
        <animated.div style={titleProps} className={css.nav__title}>
          <Logo />
        </animated.div>
      </Link>

      <animated.div
        style={dividerProps}
        className={`${css.nav__divider} ${loading ? css["nav__divider--loading"] : ""}`}
      />

      <animated.ul style={linksProps} className={css.nav__links}>
        {links.map((link) => (
          <NavigationLink
            key={link.url}
            active={asPath.startsWith(link.url)}
            text={link.text}
            url={link.url}
          />
        ))}
      </animated.ul>
    </motion.nav>
  );
};

export default Navigation;

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
  delay: 250,
};

const dividerAnimation = {
  config: { mass: 1, friction: 15, tension: 100 },
  from: { width: "0%" },
  to: { width: "100%" },
  delay: 0,
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

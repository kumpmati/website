import css from "./Navigation.module.css";
import NavigationLink from "../NavigationLink";
import { useRouter } from "next/router";
import Link from "next/link";

import { animated, useSpring, config } from "react-spring";

const links = [
  { text: "About", url: "/about" },
  { text: "Blog", url: "/blog" },
  { text: "Projects", url: "/projects" },
  { text: "Contact", url: "/contact" },
];

const Navigation = () => {
  const { asPath } = useRouter();

  const dividerProps = useSpring(dividerAnimation);
  const titleProps = useSpring(titleAnimation);
  const linksProps = useSpring(linksAnimation);

  return (
    <nav className={css.nav}>
      <Link href="/">
        <animated.h1 style={titleProps} className={css.nav__title}>
          MK
        </animated.h1>
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
    </nav>
  );
};

export default Navigation;

const dividerAnimation = {
  config: { mass: 1, friction: 15, tension: 100 },
  from: { width: "0%" },
  to: { width: "100%" },
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

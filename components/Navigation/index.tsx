import css from "./Navigation.module.css";
import NavigationLink from "../NavigationLink";
import { useRouter } from "next/router";

const links = [
  { text: "Home", url: "/" },
  { text: "Blog", url: "/blog" },
  { text: "Projects", url: "/projects" },
  { text: "Contact", url: "/contact" },
];

const Navigation = () => {
  const { asPath } = useRouter();

  return (
    <nav className={css.nav}>
      <h1 className={css.nav__title}>MK</h1>

      <div className={css.nav__divider}></div>

      <ul className={css.nav__links}>
        {links.map((link) => (
          <NavigationLink
            active={asPath === link.url}
            text={link.text}
            url={link.url}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

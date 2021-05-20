import NavigationLink from "../NavigationLink";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@components/Logo";
import { motion, Variants } from "framer-motion";
import { useLoadingState } from "@util/hooks";
import css from "./Navigation.module.css";

const links = [
  { text: "About", url: "/about" },
  { text: "Projects", url: "/projects" },
  { text: "Blog", url: "/blog" },
  { text: "Contact", url: "/contact" },
];

const Navigation = () => {
  const { asPath } = useRouter();
  const { loading } = useLoadingState();

  return (
    <motion.nav
      transition={{ type: "spring", duration: 1, delay: 0.25 }}
      className={css.nav}
      layoutId="nav">
      <Link href="/">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className={css.nav__title}>
          <Logo />
        </motion.div>
      </Link>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={dividerVariants}
        className={`${css.nav__divider} ${loading ? css["nav__divider--loading"] : ""}`}
      />

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className={css.nav__links}>
        {links.map((link) => (
          <NavigationLink
            key={link.url}
            active={asPath.startsWith(link.url)}
            text={link.text}
            url={link.url}
          />
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Navigation;

const titleVariants: Variants = {
  hidden: {
    transform: "translateY(100%)",
    clipPath: "inset(0% -50% 100% -50%)",
  },
  visible: {
    transform: "translateY(0%)",
    clipPath: "inset(0% -50% 0% -50%)",
    transition: { delay: 0.5, type: "tween" },
  },
};

const dividerVariants: Variants = {
  hidden: {
    width: "0ch",
  },
  visible: {
    width: "35.5ch",
    transition: { delay: 0, type: "spring", bounce: 0.3 },
  },
};

const listVariants: Variants = {
  hidden: {
    transform: "translateY(-100%)",
    clipPath: "inset(100% -50% 0% -50%)",
  },
  visible: {
    transform: "translateY(0%)",
    clipPath: "inset(0% -50% 0% -50%)",
    transition: { delay: 1, type: "spring", bounce: 0.6, stiffness: 100 },
  },
};

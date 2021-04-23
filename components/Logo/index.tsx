import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import css from "./Logo.module.css";

const Logo: FC = () => {
  const { asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const atHomePage = asPath === "/";

  // close when navigating to other pages than home page
  useEffect(() => !atHomePage && setIsOpen(false), [asPath]);

  return (
    <Link href="/">
      <a
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen((o) => atHomePage && !o)}
        className={`${css.logo} ${isOpen ? css["logo--open"] : ""} ${
          atHomePage ? css["logo--openable"] : ""
        }`}>
        <div className={css.logo__left}>
          <h1>M</h1>
          <h1 className={css.text__hidden}>Matias</h1>
        </div>
        <div className={css.logo__right}>
          <h1>K</h1>
          <h1 className={css.text__hidden}>Kumpulainen</h1>
        </div>
      </a>
    </Link>
  );
};

export default Logo;

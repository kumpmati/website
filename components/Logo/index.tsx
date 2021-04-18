import Link from "next/link";

import css from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <a className={css.logo}>
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

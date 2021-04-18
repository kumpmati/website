import { FC, useContext } from "react";
import Head from "next/head";
import Navigation from "@components/Navigation";
import ColorSchemeToggle from "@components/ColorSchemeToggle";

import css from "./Page.module.css";
import { ThemeContext } from "@constants/colorSchemes";

const Page: FC<PageProps> = ({ title, children, noNav }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ColorSchemeToggle />

      <div style={theme} className={css.main}>
        {!noNav && <Navigation />}
        <div className={css.main__content}>{children}</div>
      </div>
    </>
  );
};

export default Page;

export interface PageProps {
  title?: string;
  children?: any;
  noNav?: boolean;
}

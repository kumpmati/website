import { FC } from "react";
import Head from "next/head";
import ColorSchemeToggle from "@components/ColorSchemeToggle";

import css from "./Page.module.css";

const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ColorSchemeToggle />
      {children && <div className={css.main}>{children}</div>}
    </>
  );
};

export default Page;

export interface PageProps {
  title?: string;
  children?: any;
  noNav?: boolean;
}

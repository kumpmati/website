import { FC } from "react";
import Head from "next/head";

import css from "./Page.module.css";
import Navigation from "@components/Navigation";

const Page: FC<PageProps> = ({ title, children, noNav }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className={css.main}>
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

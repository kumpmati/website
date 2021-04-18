import { FC } from "react";
import Head from "next/head";

import css from "./Page.module.css";
import Navigation from "@components/Navigation";

const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={css.main}>
        <Navigation />
        {children}
      </main>
    </>
  );
};

export default Page;

export interface PageProps {
  title?: string;
  children?: any;
  navAtTop?: boolean;
}

import { FC } from "react";
import Head from "next/head";

const Page: FC<PropsI> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
};

export default Page;

interface PropsI {
  title?: string;
  children?: any;
}

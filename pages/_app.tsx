import { Fragment } from "react";

import Head from "next/head";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Personal website for Matias Kumpulainen"
        />
        <meta name="keywords" content="Next.js, Contentful, Blog, Website" />
        <meta name="author" content="Matias Kumpulainen" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

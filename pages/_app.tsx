import { ThemeContext } from "@constants/colorSchemes";
import Head from "next/head";
import { useColorScheme } from "util/hooks";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const colorScheme = useColorScheme();
  const { dark } = colorScheme;

  return (
    <ThemeContext.Provider value={colorScheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Personal website for Matias Kumpulainen"
        />
        <meta name="keywords" content="Next.js, Contentful, Blog, Website" />
        <meta name="author" content="Matias Kumpulainen" />
        <link
          rel="icon"
          href={dark ? "/favicon-dark.png" : "/favicon-light.png"}
        />
      </Head>

      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
};

export default MyApp;

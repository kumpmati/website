import { Fragment } from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const Header = Component.Header ? Component.Header : Fragment;
  const Layout = Component.Layout ? Component.Layout : Fragment;

  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;

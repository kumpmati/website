import Head from "next/head";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Matias Kumpulainen | 404</title>
      </Head>
      <h1 className="page-title reveal">404 😵</h1>
      <div className="fade-in delay-500ms">
        <p className="subtle-text">page not found</p>
        <Link href="/">Back to safety</Link>
      </div>
    </>
  );
};

export default PageNotFound;

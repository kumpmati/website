import { useRouter } from "next/router";
import { renderRichText } from "./render";

import Head from "next/head";
import LoadingFallbackTemplate from "../LoadingFallbackTemplate";

const SingleBlogPostTemplate = ({ content }) => {
  const { isFallback } = useRouter();
  if (isFallback) return <LoadingFallbackTemplate />;

  const { title, description, published } = content;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <article>
        <section>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{new Date(published).toDateString()}</p>
        </section>
        <section>{renderRichText(content.content)}</section>
      </article>
    </>
  );
};

export default SingleBlogPostTemplate;

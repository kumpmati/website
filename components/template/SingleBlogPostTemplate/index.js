import { useRouter } from "next/router";
import { renderRichText } from "./render";

import Head from "next/head";
import LoadingFallbackTemplate from "../LoadingFallbackTemplate";

import styles from "../../../styles/SingleBlogPost.module.css";
import { PAGE_TITLE } from "../../../constants";

const SingleBlogPostTemplate = ({ content }) => {
  const { isFallback } = useRouter();
  if (isFallback) return <LoadingFallbackTemplate />;

  const { title, published } = content;

  return (
    <>
      <Head>
        <title>
          {PAGE_TITLE} | {title}
        </title>
      </Head>
      <article>
        <h1 className="page-title">{title}</h1>
        <section id={styles.details}>
          <p>{new Date(published).toDateString()}</p>
        </section>
        <section id={styles.content}>{renderRichText(content.content)}</section>
      </article>
    </>
  );
};

export default SingleBlogPostTemplate;

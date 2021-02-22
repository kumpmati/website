import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

import Head from "next/head";
import LoadingFallbackTemplate from "../LoadingFallbackTemplate";

import styles from "../../../styles/SingleProject.module.css";
import { PAGE_TITLE } from "../../../constants";

const SingleProjectTemplate = ({ project }) => {
  const { isFallback } = useRouter();
  if (isFallback) return <LoadingFallbackTemplate />;

  const { title, description, gitHub, url } = project;

  return (
    <>
      <Head>
        <title>
          {PAGE_TITLE} | {title}
        </title>
      </Head>
      <article>
        <h1 className="page-title">{title}</h1>
        <div id={styles.description}>
          {documentToReactComponents(description)}
        </div>
        <div id={styles.links}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer">
            Demo
          </a>
          <a
            href={gitHub}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer">
            GitHub
          </a>
        </div>
      </article>
    </>
  );
};

export default SingleProjectTemplate;

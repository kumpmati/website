import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

import Head from "next/head";
import LoadingFallbackTemplate from "../LoadingFallbackTemplate";

const SingleProjectTemplate = ({ project }) => {
  const { isFallback } = useRouter();
  if (isFallback) return <LoadingFallbackTemplate />;

  const { title, description, gitHub } = project;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <article>
        <h1>{title}</h1>
        <div>{documentToReactComponents(description)}</div>
        <a href={gitHub} target="_blank" referrerPolicy="no-referrer">
          GitHub
        </a>
      </article>
    </>
  );
};

export default SingleProjectTemplate;

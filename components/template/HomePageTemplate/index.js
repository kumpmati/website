import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "../../elements/Image";
import Head from "next/head";

import styles from "../../../styles/Home.module.css";

const HomePageTemplate = ({ content }) => {
  const { title, coverImage } = content;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <h1 className="page-title reveal">{title}</h1>
      <Image data={coverImage} />
      <div className="subtle-text fade-in delay-500ms">
        {documentToReactComponents(content.content)}
      </div>
      <div id={styles.spacer}></div>
    </>
  );
};

export default HomePageTemplate;

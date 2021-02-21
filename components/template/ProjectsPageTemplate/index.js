import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { v4 } from "uuid";

import Head from "next/head";
import ProjectSummary from "../../elements/ProjectSummary";
import styles from "../../../styles/Projects.module.css";

const ProductsPageTemplate = ({ content, projects }) => {
  const { title, content: body } = content;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <section>
        <h1 className="page-title">{title}</h1>
        <div id={styles.content}>{documentToReactComponents(body)}</div>
      </section>
      <section>
        <ul id={styles.projects}>
          {projects &&
            projects.map(project => (
              <ProjectSummary key={v4()} project={project} />
            ))}
        </ul>
      </section>
    </>
  );
};

export default ProductsPageTemplate;

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

import styles from "../../../styles/ProjectSummary.module.css";

const ProjectSummary = ({ project }) => {
  const { title, slug, description } = project.fields;

  return (
    <li className={styles.container}>
      <Link href={"/projects/" + slug}>
        <a className={styles.title}>
          <h2>{title}</h2>
        </a>
      </Link>
      <div className={styles.description}>
        {documentToReactComponents(description)}
      </div>
    </li>
  );
};

export default ProjectSummary;

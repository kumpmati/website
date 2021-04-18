import { FC } from "react";
import { CTProject } from "@type/content";
import { Entry } from "contentful";
import Link from "next/link";

import css from "./ProjectListItem.module.css";

const ProjectListItem: FC<ProjectListItemProps> = ({ entry }) => {
  const { title, slug, url, gitHub } = entry.fields;

  return (
    <div className={css.project}>
      <Link href={`/projects/${slug}`}>
        <a className={css.project__title}>{title}</a>
      </Link>
      <div className={css.project__links}>
        <a href={url} target="noreferrer" className={css.link}>
          Demo
        </a>
        <a href={gitHub} target="noreferrer" className={css.link}>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectListItem;

export interface ProjectListItemProps {
  entry: Entry<CTProject>;
}

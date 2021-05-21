import { FC } from "react";
import { CTProject } from "@type/content";
import { Entry } from "contentful";
import Link from "next/link";

import css from "./ProjectListItem.module.css";

const ProjectListItem: FC<PropsI> = ({ entry }) => {
  const { title, slug, technologies } = entry.fields;

  return (
    <Link href={`/projects/${slug}`}>
      <a className={css.project}>
        <p className={css.project__title}>{title}</p>
        <p className={css.project__technologies}>{technologies.join(", ")}</p>
      </a>
    </Link>
  );
};

export default ProjectListItem;

interface PropsI {
  entry: Entry<CTProject>;
}

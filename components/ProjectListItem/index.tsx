import { FC } from "react";
import { CTProject } from "@type/content";
import { Entry } from "contentful";
import Link from "next/link";

const ProjectListItem: FC<ProjectListItemProps> = ({ entry }) => {
  const { title, slug } = entry.fields;

  return (
    <Link href={`/projects/${slug}`}>
      <li>
        <h3>{title}</h3>
      </li>
    </Link>
  );
};

export default ProjectListItem;

export interface ProjectListItemProps {
  entry: Entry<CTProject>;
}

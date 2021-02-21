import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const ProjectSummary = ({ project }) => {
  const { title, slug, description } = project.fields;

  return (
    <li className="project-summary">
      <Link href={"/projects/" + slug}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <div className="project-description">
        {documentToReactComponents(description)}
      </div>
    </li>
  );
};

export default ProjectSummary;

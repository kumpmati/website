import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const ProjectSummary = ({ project }) => {
  const { title, slug, description } = project.fields;

  console.log(project.fields);
  return (
    <li className="project-summary">
      <Link href={"/projects/" + slug}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <p className="project-description">
        {documentToReactComponents(description)}
      </p>
    </li>
  );
};

export default ProjectSummary;

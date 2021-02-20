import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { v4 } from "uuid";
import ProjectSummary from "../../elements/ProjectSummary";

const ProductsPageTemplate = ({ content, projects }) => {
  const { title, content: body } = content;

  return (
    <>
      <h1>{title}</h1>
      <div>{documentToReactComponents(body)}</div>
      <section>
        <ul>
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

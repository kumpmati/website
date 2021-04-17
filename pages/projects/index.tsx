import ProjectsPage, {
  ProjectsPageProps,
} from "../../components/ProjectsPage/ProjectsPage";
import { ENTRIES } from "../../constants/entries";
import { getEntry } from "../../services/contentful/util";

export default ProjectsPage;

export async function getStaticProps() {
  const markdown = await getEntry(ENTRIES.PROJECTS_PAGE);

  const props: ProjectsPageProps = {
    markdown,
    projects: [],
  };

  return {
    props,
  };
}

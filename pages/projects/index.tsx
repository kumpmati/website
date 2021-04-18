import ProjectsPage, {
  ProjectsPageProps,
} from "@components/ProjectsPage/ProjectsPage";
import { ENTRIES } from "@constants/entries";
import { getEntriesOfType, getEntry } from "@services/contentful/util";

export default ProjectsPage;

export async function getStaticProps() {
  const props: ProjectsPageProps = {
    markdown: await getEntry(ENTRIES.PROJECTS_PAGE),
    projects: await getEntriesOfType("project"),
  };

  return {
    props,
  };
}

import ProjectsPageTemplate from "../../components/template/ProjectsPageTemplate";
import DefaultHeader from "../../components/module/Header";
import DefaultLayout from "../../components/module/Body/Default";
import { getEntriesOfType, getEntry } from "../../services/contentful/util";
import { entries } from "../../services/contentful/entries";
import { transformProjectsPageData } from "../../services/transform";

export default ProjectsPageTemplate;
ProjectsPageTemplate.Header = DefaultHeader;
ProjectsPageTemplate.Layout = DefaultLayout;

export async function getServerSideProps(ctx) {
  const content = await getEntry(entries.projectsPage);
  const projects = await getEntriesOfType("project");
  return transformProjectsPageData({ content, projects });
}

import { getEntriesOfType, getEntry } from "../../services/contentful/util";
import { ENTRIES } from "../../services/contentful/entries";

import ProjectsPageTemplate from "../../components/template/ProjectsPageTemplate";
import { transformProjectsPageData } from "../../components/template/ProjectsPageTemplate/transform";

import DefaultHeader from "../../components/module/Header";
import DefaultLayout from "../../components/module/Body/Default";

export default ProjectsPageTemplate;
ProjectsPageTemplate.Header = DefaultHeader;
ProjectsPageTemplate.Layout = DefaultLayout;

export async function getServerSideProps(ctx) {
  const content = await getEntry(ENTRIES.PROJECTS_PAGE);
  const projects = await getEntriesOfType("project");
  return transformProjectsPageData({ content, projects });
}

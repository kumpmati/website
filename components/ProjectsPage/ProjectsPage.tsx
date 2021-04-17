import { FC } from "react";
import { MarkdownPage } from "../../types/contentful";
import Header from "../Header/Header";
import MarkdownContent from "../MarkdownContent/MarkdownContent";
import Page from "../Page/Page";

const ProjectsPage: FC<ProjectsPageProps> = ({ markdown, projects }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Header>
        <h1>Projects</h1>
      </Header>
      <MarkdownContent content={markdownContent} />
    </Page>
  );
};

export default ProjectsPage;

export interface ProjectsPageProps {
  markdown: MarkdownPage;
  projects: any[];
}

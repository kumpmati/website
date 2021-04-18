import { FC } from "react";
import { CTMarkdownContent } from "@type/content";
import Header from "@components/Header/Header";
import MarkdownContent from "@components/MarkdownContent";
import Page from "../Page/Page";
import { Entry, EntryCollection } from "contentful";
import List from "@components/List";

const ProjectsPage: FC<ProjectsPageProps> = ({ markdown, projects }) => {
  const { title, markdownContent } = markdown.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Header>
        <h3>Projects</h3>
        <MarkdownContent content={markdownContent} />
      </Header>

      <List collection={projects} />
    </Page>
  );
};

export default ProjectsPage;

export interface ProjectsPageProps {
  markdown: Entry<CTMarkdownContent>;
  projects: EntryCollection<any>;
}

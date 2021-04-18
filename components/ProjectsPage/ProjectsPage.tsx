import { FC } from "react";
import { CTMarkdownContent } from "@type/content";
import Header from "@components/Header/Header";
import MarkdownContent from "@components/MarkdownContent";
import Page from "../Page/Page";
import { Entry, EntryCollection } from "contentful";

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
  markdown: Entry<CTMarkdownContent>;
  projects: EntryCollection<any>;
}

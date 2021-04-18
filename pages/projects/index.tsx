import { FC } from "react";
import { CTMarkdownContent } from "@type/content";
import Header from "@components/Header/Header";
import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import { Entry, EntryCollection } from "contentful";
import List from "@components/List";
import { getEntriesOfType, getEntry } from "@services/contentful/util";
import { ENTRIES } from "@constants/entries";

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

export async function getStaticProps() {
  const props: ProjectsPageProps = {
    markdown: await getEntry(ENTRIES.PROJECTS_PAGE),
    projects: await getEntriesOfType("project"),
  };

  return {
    props,
  };
}

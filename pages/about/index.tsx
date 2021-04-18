import Section from "@components/Section/Section";
import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import { ENTRIES } from "@constants/entries";
import { getEntry } from "@services/contentful/util";
import { CTMarkdownContent } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";

const AboutPage: FC<AboutPageProps> = ({ markdown }) => {
  return (
    <Page title="MK | About">
      <Section>
        <h1>About me</h1>
        <MarkdownContent content={markdown.fields.markdownContent} />
      </Section>
    </Page>
  );
};

export default AboutPage;

interface AboutPageProps {
  markdown: Entry<CTMarkdownContent>;
}

export async function getStaticProps() {
  const props: AboutPageProps = {
    markdown: await getEntry(ENTRIES.ABOUT_PAGE),
  };

  return {
    props,
  };
}

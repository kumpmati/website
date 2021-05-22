import List from "@components/List";
import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { ENTRIES } from "@constants/entries";
import { getEntriesOfType, getEntry } from "@util/contentful";
import { CTAlbum, CTMarkdownContent } from "@type/content";
import { Entry, EntryCollection } from "contentful";
import { FC } from "react";
import { compareDateStrings } from "@util/index";

const MusicPage: FC<PropsI> = ({ markdown, albums }) => {
  const { title, markdownContent } = markdown.fields;

  const orderedAlbums = albums.items.sort((a, b) =>
    compareDateStrings(b.fields.releaseDate, a.fields.releaseDate)
  );

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={0.5}>
        <h1>{title}</h1>
        <MarkdownContent content={markdownContent} />
      </Section>

      <Section delay={0.75}>
        <List grid collection={orderedAlbums} />
      </Section>
    </Page>
  );
};

export default MusicPage;

interface PropsI {
  markdown: Entry<CTMarkdownContent>;
  albums: EntryCollection<CTAlbum>;
}

export async function getStaticProps() {
  const props: PropsI = {
    markdown: await getEntry(ENTRIES.MUSIC_PAGE),
    albums: await getEntriesOfType<CTAlbum>("album"),
  };

  return {
    props,
    // don't revalidate
  };
}

import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleAlbum, getSongsInAlbum } from "@util/contentful";
import { CTAlbum, CTSong } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";
import List from "@components/List";

const SingleAlbumPage: FC<PropsI> = ({ album, songs }) => {
  const { title } = album.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={0.5} style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h1>{title}</h1>
        </div>
      </Section>

      <List collection={songs} />
    </Page>
  );
};

export default SingleAlbumPage;

interface PropsI {
  album: Entry<CTAlbum>;
  songs: Entry<CTSong>[];
}

export async function getStaticProps({ params }) {
  const album = await getSingleAlbum(params.slug);

  if (!album) {
    return {
      notFound: true,
    };
  }

  const songs = await getSongsInAlbum(album.fields.slug);

  return {
    props: {
      album,
      songs,
    },
    // don't revalidate
  };
}

export async function getStaticPaths() {
  const albums = (await getEntriesOfType<CTAlbum>("album")).items;
  const paths = albums.map((album) => ({ params: { slug: album.fields.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}

import type { CTAlbum, CTSong } from "@type/content";
import type { Entry } from "contentful";
import type { FC } from "react";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import List from "@components/List";
import AudioPlayer, { AudioPlayerContext } from "@components/AudioPlayer";
import {
  getEntriesOfType,
  getSingleAlbum,
  getSongsInAlbum,
} from "@util/contentful";
import Image from "next/image";
import css from "./[slug].module.css";
import { useAudioPlayer } from "@util/hooks";
import { blurDataURL } from "@util/placeholderBlur";

const SingleAlbumPage: FC<PropsI> = ({ album, songs }) => {
  const { title, coverImage, url } = album.fields;
  const coverImageURL = "https:" + coverImage.fields.file.url;

  const orderedSongs = songs.sort(
    (a, b) => a.fields.songNumber - b.fields.songNumber
  );

  const audioContext = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={audioContext}>
      <Page title={`MK | ${title}`}>
        <Section className={css.container}>
          <Section inline delay={0.5} className={css.image}>
            <Image
              placeholder="blur"
              blurDataURL={blurDataURL(10, 10)}
              src={coverImageURL}
              layout="intrinsic"
              width="400"
              height="400"
            />
          </Section>
          <Section inline delay={0.75} className={css.details}>
            <Section inline style={{ display: "flex", alignItems: "center" }}>
              <h1>{title}</h1>
              <a
                className={css.details__link}
                title={`View ${title} in streaming services`}
                href={url}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {"->"}
              </a>
            </Section>

            <div className={css.songs}>
              <List collection={orderedSongs} />
            </div>
          </Section>
        </Section>

        <Section delay={1}>
          <AudioPlayer />
        </Section>
      </Page>
    </AudioPlayerContext.Provider>
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
  const paths = albums.map(album => ({ params: { slug: album.fields.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}

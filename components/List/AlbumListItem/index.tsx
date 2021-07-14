import { FC, useState } from "react";
import { CTAlbum } from "@type/content";
import { Entry } from "contentful";
import Link from "next/link";
import Image from "next/image";

import css from "./AlbumListItem.module.css";
import Section from "@components/Section/Section";
import { blurDataURL } from "@util/placeholderBlur";

const AlbumListItem: FC<PropsI> = ({ entry }) => {
  const { title, slug, releaseDate, coverImage, songs } = entry.fields;

  const releaseDateStr = new Date(releaseDate).toLocaleDateString();
  const coverImageURL = "https:" + coverImage.fields.file.url;

  return (
    <Link href={`/music/${slug}`}>
      <a className={css.album}>
        <div className={css.info}>
          <Image
            placeholder="blur"
            blurDataURL={blurDataURL(10, 10)}
            className={css.info__coverImage}
            src={coverImageURL}
            layout="responsive"
            width={1}
            height={1}
          />

          <Section inline columns={2} style={{ background: 0 }}>
            <div>
              <p className={css.info__title}>{title}</p>
              <p className={css.info__releaseDate}>{releaseDateStr}</p>
            </div>

            <p className={css.info__numSongs}>{`${songs} ${
              songs > 1 ? "songs" : "song"
            }`}</p>
          </Section>
        </div>
      </a>
    </Link>
  );
};

export default AlbumListItem;

interface PropsI {
  entry: Entry<CTAlbum>;
}

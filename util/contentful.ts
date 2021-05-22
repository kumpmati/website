import { CONTENTFUL_QUERY_DEPTH } from "@constants/contentful";
import { client } from "@services/contentful";
import { CTAlbum, CTBlogPost, CTProject, CTSong } from "@type/content";
import { Entry, EntryCollection } from "contentful";

export const getEntry = async <T>(id: string): Promise<Entry<T>> => {
  try {
    return await client.getEntry(id);
  } catch (error) {
    return null;
  }
};

export const getEntries = async <T>(query: any): Promise<EntryCollection<T>> => {
  try {
    return await client.getEntries({
      ...query,
      include: CONTENTFUL_QUERY_DEPTH,
    });
  } catch (error) {
    return null;
  }
};

export const getEntriesOfType = async <T>(content_type: string) => {
  return await getEntries<T>({ content_type });
};

export const getSingleBlogPost = async (slug: string) => {
  return (
    await getEntries<CTBlogPost>({
      content_type: "blogPost",
      "fields.slug[in]": slug,
    })
  )?.items?.[0];
};

export const getSingleProject = async (slug: string) => {
  return (
    await getEntries<CTProject>({
      content_type: "project",
      "fields.slug[in]": slug,
    })
  )?.items?.[0];
};

export const getSingleAlbum = async (slug: string) => {
  return (
    await getEntries<CTAlbum>({
      content_type: "album",
      "fields.slug[in]": slug,
    })
  )?.items?.[0];
};

export const getSongsInAlbum = async (albumSlug: string) => {
  const album = await getSingleAlbum(albumSlug);
  if (!album) throw new Error("Album not found");

  return (
    await getEntries<CTSong>({
      content_type: "song",
      links_to_entry: album.sys.id,
    })
  )?.items?.[0];
};

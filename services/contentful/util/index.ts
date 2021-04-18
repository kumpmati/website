import { client } from "@services/contentful";
import { Entry, EntryCollection } from "contentful";

export const getEntry = async <T>(id: string): Promise<Entry<T>> => {
  try {
    return await client.getEntry(id);
  } catch (error) {
    return null;
  }
};

export const getEntries = async <T>(
  query: any
): Promise<EntryCollection<T>> => {
  try {
    return await client.getEntries(query);
  } catch (error) {
    return null;
  }
};

export const getEntriesOfType = async <T>(content_type: string) => {
  return await getEntries<T>({ content_type });
};

export const getSingleBlogPost = async (slug: string) => {
  return await getEntries({
    content_type: "blogPost",
    "fields.slug[in]": slug,
  });
};

export const getSingleProject = async (slug: string) => {
  return await getEntries({
    content_type: "project",
    "fields.slug[in]": slug,
  });
};

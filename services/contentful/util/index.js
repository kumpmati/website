import { client } from "../index";
import { ENTRIES } from "../entries";

export const getEntry = async id => {
  try {
    return await client.getEntry(id);
  } catch (error) {
    return null;
  }
};

export const getEntries = async query => {
  try {
    return await client.getEntries(query);
  } catch (error) {
    return null;
  }
};

export const getEntriesOfType = async content_type => {
  return await getEntries({ content_type });
};

export const getBlogPostBySlug = async slug => {
  return await client.getEntries({
    content_type: "blogPost",
    "fields.slug[in]": slug,
  });
};

export const getProjectBySlug = async slug => {
  return await client.getEntries({
    content_type: "project",
    "fields.slug[in]": slug,
  });
};

export const getNavigation = async () => {
  return await client.getEntry(ENTRIES.NAVIGATION);
};

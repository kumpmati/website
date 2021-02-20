import { client } from "../index";
import { entries } from "../entries";

const queryEntry = async (id, query) => {
  try {
    return await client.getEntry(id, query);
  } catch (error) {
    return null;
  }
};

export const getEntry = async id => {
  return await queryEntry(id);
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

export const getNavigation = async () => {
  return await client.getEntry(entries.navigation);
};

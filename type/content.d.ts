import { Asset, Entry, EntryCollection } from "contentful";

/**
 * Contentful content types
 */

export type CTMarkdownContent = { title: string; markdownContent: string };

export type CTBlogPost = {
  title: string;
  slug: string;
  summary?: string;
  content: string;
};

export type CTProject = {
  title: string;
  slug: string;
  url?: string;
  gitHub?: string;
  content?: Entry<CTMarkdownContent>;
  technologies?: string[];
};

export type CTAlbum = {
  title: string;
  slug: string;
  url: string;
  releaseDate: string;
  songs: number;
  coverImage: Asset;
};

export type CTSong = {
  title: string;
  slug: string;
  coverImage?: Asset;
  audioFile?: Asset;
  url?: string;
  album: Entry<CTAlbum>;
};

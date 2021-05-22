import { Entry } from "contentful";
import { CTAlbum, CTBlogPost, CTMarkdownContent, CTProject, CTSong } from "./content";

export const isProject = (entry: Entry<any>): entry is Entry<CTProject> =>
  isType(entry, "project");

export const isBlogPost = (entry: Entry<any>): entry is Entry<CTBlogPost> =>
  isType(entry, "blogPost");

export const isMarkdownContent = (entry: Entry<any>): entry is Entry<CTMarkdownContent> =>
  isType(entry, "markdownPage");

export const isAlbum = (entry: Entry<any>): entry is Entry<CTAlbum> =>
  isType(entry, "album");

export const isSong = (entry: Entry<any>): entry is Entry<CTSong> =>
  isType(entry, "song");

const isType = (entry: Entry<any>, contentType: string) =>
  entry?.sys.contentType?.sys.id === contentType;

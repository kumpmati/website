import { Entry } from "contentful";
import { CTBlogPost, CTMarkdownContent, CTProject } from "./content";

export const isProject = (entry: Entry<any>): entry is Entry<CTProject> =>
  isType(entry, "project");

export const isBlogPost = (entry: Entry<any>): entry is Entry<CTBlogPost> =>
  isType(entry, "blogPost");

export const isMarkdownContent = (entry: Entry<any>): entry is Entry<CTMarkdownContent> =>
  isType(entry, "markdownPage");

const isType = (entry: Entry<any>, contentType: string) =>
  entry?.sys.contentType?.sys.id === contentType;

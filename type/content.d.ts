import { Entry } from "contentful";

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

import { Entry } from "contentful";

export type MarkdownPage = Entry<{ title: string; markdownContent: string }>;

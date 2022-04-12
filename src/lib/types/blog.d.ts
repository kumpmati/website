import type { Entry } from 'contentful';

export type BlogPost = Entry<{
	title: string;
	slug: string;
	summary?: string;
	content: string; // markdown
}>;

import type { Entry } from 'contentful';

export type BlogPost = Entry<{
	title: string;
	slug: string;
	summary?: string;
	tags: string[];
	published: Date; // date
	content: string; // markdown
}>;

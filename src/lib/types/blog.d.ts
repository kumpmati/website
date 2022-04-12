import type { Asset, Entry } from 'contentful';

export type BlogPost = Entry<{
	title: string;
	slug: string;
	summary?: string;
	tags: string[];
	published: string; // date
	coverImage?: Asset;
	content: string; // markdown
}>;

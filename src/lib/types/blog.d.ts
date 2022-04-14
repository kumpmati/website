import type { Asset, Entry } from 'contentful';

export type BlogPost = Entry<{
	title: string;
	slug: string;
	summary?: string;
	coverImage?: Asset;
	tags: string[];
	published: Date; // date
	content: string; // markdown
}>;

import type { Asset, Entry } from 'contentful';

export type BlogPost = Entry<{
	title: string;
	slug: string;
	summary?: string;
	coverImage?: Asset;
	tags: string[];
	published: string; // date
	coverImage?: Asset;
	content: string; // markdown
}>;

export type BlogPostFeedback = {
	slug: string;
	positive: number;
};

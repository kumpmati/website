import type { Asset, Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-html-renderer';

export type Navigation = Entry<{
	name: string;
	links: Link[];
}>;

export type Link = Entry<{
	text: string;
	url: string;
	openInNewTab: boolean;
}>;

export type Homepage = Entry<{
	entryTitle: string;
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
	picture: Asset;
	content: string;
	pictureHoverText?: string;
	links: Link[];
}>;

export type Page = Entry<{
	title: string;
	url: string;
	timeline: boolean;
	blocks: PageBlock[];
}>;

export type TextBlock = Entry<{
	entryTitle: boolean;
	content: Document;
}>;

export type HeroBlock = Entry<{
	entryTitle: string;
	content: string; // markdown
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
}>;

export type SkillsBlock = Entry<{
	entryTitle: string;
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
	topContent: string; // markdown
	leftColumnTitle?: string;
	rightColumnTitle?: string;
	bottomTitle?: string;
}>;

export type GridBlock = Entry<{
	entryTitle: string;
	content?: string; // markdown
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
	items: GridItem[];
}>;

export type GridItem = Entry<{
	title: string;
	description?: string; // markdown
	link?: string;
	theme: 'Accent' | 'Light' | 'Dark';
}>;

export type AccordionBlock = Entry<{
	entryTitle: string;
	content?: string; // markdown
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
	items: GridItem[];
}>;

export type PageBlock = HeroBlock | TextBlock | SkillsBlock | GridBlock | AccordionBlock;

import type { Entry, Asset } from 'contentful';
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

export type Page = Entry<{
	title: string;
	url: string;
	blocks: PageBlocks[];
}>;

export type PageBlocks = IntroBlock | FullPageBlock | GridBlock;

export type IntroBlock = Entry<{
	subheading?: string;
	content: Document;
	profilePicture?: Asset;
}>;

export type FullPageBlock = Entry<{
	subheading?: string;
	content: Document;
	backgroundImage?: Asset;
	textColor?: string;
	subheadingColor?: string;
	style: 'Normal' | 'Difference';
	divider: boolean;
}>;

export type GridBlockLayout = 'Normal' | 'Mason';

export type GridBlock = Entry<{
	subheading?: string;
	content?: Document;
	layout: GridBlockLayout;
	columns: number;
	items: GridImage[];
}>;

export type GridImage = Entry<{
	title: string;
	content?: Document;
	image: Asset;
	link?: string;
	textColor?: string;
	color?: string;
}>;

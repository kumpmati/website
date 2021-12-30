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

export type PageBlocks = IntroBlock | HeroBlock | GridBlock;

export type IntroBlock = Entry<{
	subheading?: string;
	content: Document;
	profilePicture?: Asset;
	divider: boolean;
}>;

export type HeroBlock = Entry<{
	subheading?: string;
	content: Document;
	backgroundImage?: Asset;
	textColor?: string;
	subheadingColor?: string;
	style: 'Normal' | 'Difference';
	divider: boolean;
	size: 'Full Page' | 'Normal';
}>;

export type GridBlockLayout = 'Normal' | 'Mason';

export type GridBlockItem = GridColorTile | GridImage;

export type GridBlock = Entry<{
	subheading?: string;
	content?: Document;
	layout: GridBlockLayout;
	columns: number;
	divider: boolean;
	items: GridBlockItem[];
}>;

export type GridColorTile = Entry<{
	title: string;
	content?: Document;
	image: Asset;
	link?: string;
	textColor?: string;
	color?: string;
}>;

export type GridImage = Entry<{
	image: Asset;
}>;

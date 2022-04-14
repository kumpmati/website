import type { BlogPost } from '$lib/types/blog';
import type { Homepage, Navigation, Page } from '$lib/types/page';
import contentful from 'contentful';

const MAX_FETCH_DEPTH = 5;

export const client = contentful.createClient({
	space: import.meta.env.VITE_PUBLIC_SPACE_ID as string,
	accessToken: import.meta.env.VITE_PUBLIC_ACCESS_TOKEN as string,
	environment: (import.meta.env.VITE_PUBLIC_ENVIRONMENT as string) ?? 'master'
});

export const getPageByURL = async (url: string): Promise<Page | null> => {
	const pages = await client.getEntries({
		content_type: 'page',
		[`fields.url[in]`]: url,
		include: MAX_FETCH_DEPTH
	});

	return (pages?.items?.[0] as Page) ?? null;
};

export const getHomePage = async (): Promise<Homepage | null> => {
	const homepage = await client.getEntries({ content_type: 'homepage' });

	return (homepage?.items?.[0] as Homepage) ?? null;
};

export const getNavigation = async (): Promise<Navigation | null> => {
	const nav = await client.getEntries({ content_type: 'navigation' });

	return (nav?.items?.[0] as Navigation) ?? null;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
	const posts = await client.getEntries({
		content_type: 'blogPost',
		[`fields.slug[in]`]: slug,
		include: MAX_FETCH_DEPTH
	});

	return (posts?.items?.[0] as BlogPost) ?? null;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
	const posts = await client.getEntries({
		content_type: 'blogPost',
		include: MAX_FETCH_DEPTH
	});

	return (posts?.items ?? []) as BlogPost[];
};

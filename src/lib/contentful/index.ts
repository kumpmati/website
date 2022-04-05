import type { Homepage, Navigation, Page } from '$lib/types/contentful';
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

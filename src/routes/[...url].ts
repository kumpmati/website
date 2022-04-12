import { getPageByURL } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ url: string }, { page: any }> = async ({ params }) => {
	const url = '/' + params.url;
	const page = await getPageByURL(url);

	if (!page) {
		return {
			status: 404,
			error: new Error('page not found')
		};
	}

	return {
		status: 200,
		body: { page }
	};
};

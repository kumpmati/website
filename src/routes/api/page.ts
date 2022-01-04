import { getPageByURL } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

const get: RequestHandler<unknown, unknown, any> = async ({ url }) => {
	const pageUrl = '/' + url.searchParams.get('url');

	const page = await getPageByURL(pageUrl);
	if (!page) {
		return {
			status: 404,
			body: null
		};
	}

	return {
		status: 200,
		body: page
	};
};

export { get };

import { getPageByURL } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

const get: RequestHandler<unknown, unknown, any> = async ({ query }) => {
	const url = '/' + query.get('url');

	const page = await getPageByURL(url);

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

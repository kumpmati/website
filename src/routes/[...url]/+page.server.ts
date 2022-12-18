throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import { getPageByURL } from '$lib/services/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ url: string }, { page: any }> = async ({ params }) => {
	const url = '/' + params.url;
	const page = await getPageByURL(url).catch(() => null);

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

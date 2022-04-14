import { getHomePage } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<Record<string, never>, any> = async () => {
	const page = await getHomePage();

	if (!page) {
		return {
			status: 404,
			error: new Error('Page not found')
		};
	}

	return {
		status: 200,
		body: { page }
	};
};

import { getNavigation } from '$lib/contentful';
import type { RequestHandler } from '@sveltejs/kit';

const get: RequestHandler<unknown, unknown, any> = async () => {
	const nav = await getNavigation();

	return {
		status: 200,
		body: nav
	};
};

export { get };

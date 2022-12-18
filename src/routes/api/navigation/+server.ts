throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

import { getNavigation } from '$lib/services/contentful';
import type { RequestHandler } from '@sveltejs/kit';

const get: RequestHandler<Record<string, never>, any> = async () => {
	const nav = await getNavigation();

	return {
		status: 200,
		body: nav
	};
};

export { get };

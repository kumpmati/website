throw new Error("@migration task: Update +page.server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");

import { getBlogPosts } from '$lib/services/contentful';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<Record<string, never>, { posts: any }> = async () => {
	const posts = await getBlogPosts();

	return {
		status: 200,
		body: { posts: posts }
	};
};
